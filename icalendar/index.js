const fs = require('node:fs');
const path = require('node:path');
const CalendarJson = require('./calendar.json');
const { Lunar } = require('lunar-javascript');
const Dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') // 依赖 utc 插件

Dayjs.extend(utc);
Dayjs.extend(timezone);

const localTimezone = Dayjs.tz.guess();
// Dayjs.tz.setDefault('Asia/Shanghai');

console.log('🛠️  icalendar/index.js 脚本开始执行...');

const DirName = '../public/';
const FileName = 'icalendar.ics';

const ICS_Template = `BEGIN:VCALENDAR
PRODID:{{prodId}}
VERSION:{{version}}
CALSCALE:{{calScale}}
METHOD:PUBLISH
X-WR-CALNAME:我们的纪念日
X-WR-TIMEZONE:{{tzone}}
X-WR-CALDESC:我们的纪念日 更新时间{{updateTime}}
BEGIN:VTIMEZONE
TZID:{{tzone}}
X-LIC-LOCATION:{{tzone}}
BEGIN:STANDARD
TZOFFSETFROM:{{timezone}}
TZOFFSETTO:{{timezone}}
TZNAME:CST
DTSTART:19700101T000000
END:STANDARD
END:VTIMEZONE
{{events}}END:VCALENDAR

`;

const ICS_Event_Template = `BEGIN:VEVENT
UID:{{uid}}
DTSTAMP:{{timestamp}}
DTSTART;VALUE=DATE:{{startDate}}
DTEND;VALUE=DATE:{{endDate}}
CREATED:{{ctimestamp}}
SUMMARY:{{summary}}
DESCRIPTION:{{description}}
SEQUENCE:0
TRANSP:TENTATIVE
STATUS:CONFIRMED
END:VEVENT\n`;

function generateContent() {
  let wrapper = ICS_Template.replace('{{version}}', CalendarJson.version)
    .replace('{{prodId}}', CalendarJson.prodId)
    .replace('{{calScale}}', CalendarJson.calScale)
    .replace('{{updateTime}}', new Dayjs().format('YYYY-MM-DD HH:mm:ss'))
    .replaceAll('{{tzone}}', localTimezone)
    .replaceAll('{{timezone}}', Dayjs().tz(localTimezone).format('ZZ'));

  let eventsStr = '';

  for (const event of CalendarJson.events) {
    const year = new Date().getFullYear();
    if (!!event.lunar) {
      const lunarDate1 = Lunar.fromYmd(year, event.month, event.day);
      const lunarDate2 = Lunar.fromYmd(year - 1, event.month, event.day);
      const solarDate1 = lunarDate1.getSolar();
      const solarDate2 = lunarDate2.getSolar();
      eventsStr += generateEvent(event, new Dayjs(
        new Date(
          solarDate1.getYear(),
          solarDate1.getMonth() - 1,
          solarDate1.getDay()
        ).toISOString()
      ));

      eventsStr += generateEvent(event, new Dayjs(
        new Date(
          solarDate2.getYear(),
          solarDate2.getMonth() - 1,
          solarDate2.getDay()
        ).toISOString()
      ), '_prev');
    } else {
      eventsStr += generateEvent(event, new Dayjs(
        new Date(year, event.month - 1, event.day).toISOString()
      ));
    }
  }

  return wrapper.replace('{{events}}', eventsStr);
}

function generateEvent(event, currentDate, suffix = '') {
  const cdateIOS = new Dayjs().tz(localTimezone).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  const dateIOS = currentDate.tz(localTimezone).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  return ICS_Event_Template.replace(
    '{{uid}}',
    event.uid + suffix + '@wangsd.com'
  )
    .replace(
      '{{timestamp}}',
      `${dateIOS
        .replace(/[-:\.]/g, '')
        .slice(0, 15)}Z`
    )
    .replace('{{ctimestamp}}',
      `${cdateIOS
        .replace(/[-:\.]/g, '')
        .slice(0, 15)}Z`)
    .replace(
      '{{startDate}}',
      dateIOS.slice(0, 10).replace(/-/g, '')
    )
    .replace(
      '{{endDate}}',
      dateIOS.slice(0, 10).replace(/-/g, '')
    )
    .replace('{{summary}}', event.summary)
    .replace('{{description}}', event.description || '这是描述信息')
}

function writeICS() {
  try {
    // 1. 拼接完整的文件保存路径
    const dirPath = path.join(__dirname, DirName);
    const fullFilePath = path.join(dirPath, FileName);

    // 2. 检查并创建目标目录（如果目录不存在）
    // recursive: true 表示递归创建多级目录（比如父目录不存在也会自动创建）
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ 目录不存在，已自动创建：${dirPath}`);
    }

    // 3. 写入ICS文件（UTF-8编码确保中文不乱码）
    // flag: 'w' 表示覆盖已有文件，若想追加内容可改为 'a'
    fs.writeFileSync(fullFilePath, generateContent(), { encoding: 'utf8' });

    console.log(`✅ ICS文件创建成功！文件路径：${fullFilePath}`);
  } catch (error) {
    console.error(`❌ 创建ICS文件失败：${error.message}`);
    throw error; // 抛出错误供上层处理
  }
}

writeICS();
