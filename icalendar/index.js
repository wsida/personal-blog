const fs = require('node:fs');
const path = require('node:path');
const CalendarJson = require('./calendar.json');
const { Lunar } = require('lunar-javascript');
const Dayjs = require('dayjs');

console.log('🛠️  icalendar/index.js 脚本开始执行...');

const DirName = '../public/';
const FileName = 'icalendar.ics';

const ICS_Template = `
  BEGIN:VCALENDAR
  VERSION:{{version}}
  PRODID:{{prodId}}
  CALSCALE:{{calScale}}
  X-WR-CALNAME:农历纪念日
  X-APPLE-LANGUAGE:zh
  X-APPLE-REGION:CN

  {{events}}

  END:VCALENDAR
`;

const ICS_Event_Template = `
  BEGIN:VEVENT
  UID:{{uid}}
  DTSTAMP:{{timestamp}}
  DTSTART;VALUE=DATE:{{startDate}}
  DTEND;VALUE=DATE:{{endDate}}
  SUMMARY:{{summary}}
  DESCRIPTION:{{description}}
  STATUS:{{status}}
  TRANSP:TRANSPARENT
  RRULE:FREQ=YEARLY;INTERVAL=1;
  COMMENT:{{comment}}
  END:VEVENT
`;

function generateContent() {
  let wrapper = ICS_Template.replace('{{version}}', CalendarJson.version)
    .replace('{{prodId}}', CalendarJson.prodId)
    .replace('{{calScale}}', CalendarJson.calScale);

  let eventsStr = '';

  for (const event of CalendarJson.events) {
    const year = new Date().getFullYear();
    if (!!event.lunar) {
      const lunarDate = Lunar.fromYmd(year, event.month, event.day);
      const solarDate2 = lunarDate.getSolar();
      eventsStr += generateEvent(event, new Dayjs(
        new Date(
          solarDate2.getYear(),
          solarDate2.getMonth() - 1,
          solarDate2.getDay()
        ).toISOString()
      ));

      eventsStr += generateEvent(event, new Dayjs(
        new Date(
          solarDate2.getYear() - 1,
          solarDate2.getMonth() - 1,
          solarDate2.getDay()
        ).toISOString()
      ), '//a');
    } else {
      eventsStr += generateEvent(event, new Dayjs(
        new Date(year, event.month - 1, event.day).toISOString()
      ));
    }
  }

  return wrapper.replace('{{events}}', eventsStr);
}

function generateEvent(event, currentDate, suffix = '') {
  return ICS_Event_Template.replace(
    '{{uid}}',
    CalendarJson.prodId + event.uid + suffix
  )
    .replace(
      '{{timestamp}}',
      `${currentDate
        .toISOString()
        .replace(/[-:\.]/g, '')
        .slice(0, 15)}Z`
    )
    .replace(
      '{{startDate}}',
      currentDate.toISOString().slice(0, 10).replace(/-/g, '')
    )
    .replace(
      '{{endDate}}',
      currentDate.toISOString().slice(0, 10).replace(/-/g, '')
    )
    .replace('{{summary}}', event.summary || '')
    .replace('{{description}}', event.description || '')
    .replace('{{status}}', event.status || 'CONFIRMED')
    .replace('{{comment}}', event.comment || '');
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
