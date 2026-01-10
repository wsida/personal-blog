---
permalink: /icalendar.ics
layout: null
---
{% capture ics %}{% include_relative event.ics %}{% endcapture %}
{{ ics | xml_escape }}