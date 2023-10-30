const moment = require('moment-timezone');

// Start date (Sat 13th)
let startDate = moment.tz('2023-09-30 21:00', 'Asia/Bangkok');

const events = [];
for (let i = 0; i < 8; i++) {
  const event = {
    "eventType": "boxing",
    "eventName": "Phetchbuncha stadium Muay Thai Match, Kohsamui",
    "eventDate": {
      "$date": {
        "$numberLong": startDate.valueOf().toString()  // Convert to Unix timestamp
      }
    },
    "organizerId": "645d64c086e4d377b0496543",
    "tickets": [
      {
        "type": "Ringside",
        "price": 2000,
        "available": 100,
        "sold": 0
      },
      {
        "type": "Normal seat",
        "price": 1500,
        "available": 500,
        "sold": 0
      }
    ],
    "eventDescription": "Location: Phetchbuncha stadium \nCall: +66 84 772 6739\nMap: https://goo.gl/maps/6WWnUymaPv2x2kYj7"
  };

  events.push(event);

  // Add 4 days if it's Saturday (to get to next Wednesday), or 3 days if it's Wednesday (to get to next Saturday)
  startDate.add(startDate.day() === 6 ? 4 : 3, 'days');
}

console.log(JSON.stringify(events, null, 2));

