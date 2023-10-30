const moment = require('moment-timezone');

// Start date (Sat 13th)
let startDate = moment.tz('2023-10-01 08:30', 'Asia/Bangkok');

const events = [];
for (let i = 0; i < 20; i++) {
  const event = {
    "eventType": "Fullday trip",
    "eventName": "Koh Tao-Nagyuan fullday trip by speed boat",
    "eventDate": {
      "$date": {
        "$numberLong": startDate.valueOf().toString()  // Convert to Unix timestamp
      }
    },
    "organizerId": "64a656a1d69cad6a83b943e1",
    "tickets": [
      {
        "type": "Koh Tao-NagyuanSpeed boat",
        "price": 2100,
        "available": 100,
        "sold": 0
      },
      {
        "type": "Koh Tao-NagyuanSpeed boat (children 3-10 Years)",
        "price": 1800,
        "available": 100,
        "sold": 0
      }
      
    ],
    "eventDescription": "Location: Grand Sea Pier\nCall: +66 61 247 4409 +66 88 753 6286\nMap: https://maps.app.goo.gl/jjhKZXe5E81krh8o9"

  };

  events.push(event);

 // Add 1 day to the start date for each event
  startDate.add(1, 'day');
}

console.log(JSON.stringify(events, null, 2));

