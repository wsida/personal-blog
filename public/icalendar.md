---
permalink: /icalendar.ics
layout: null
---
{% capture ics %}{% include_relative icalendar.ics %}{% endcapture %}
{{ ics | xml_escape }}