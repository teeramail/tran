const moment = require('moment-timezone');

// Start date (Tue 3rd)
let startDate = moment.tz('2023-10-16 21:00', 'Asia/Bangkok');

const events = [];
for (let i = 0; i < 3; i++) {
  const event = {
    "eventType": "boxing",
    "eventName": "Samui International Muay Thai Stadium",
    "eventDate": {
      "$date": {
        "$numberLong": startDate.valueOf().toString()  // Convert to Unix timestamp
      }
    },
    "organizerId": "652dbe8733ce0fe2cf17f4d8",
    "tickets": [
      {
        "type": "VIP",
        "price": 2500,
        "available": 50,
        "sold": 0
      },
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
    "eventDescription": "Location: Samui International Muay Thai Stadium \nCall: +66 90-2932445\nMap: https://maps.app.goo.gl/pobfuGfQbPbT8E9y9"
  };

  events.push(event);

  // Add 3 days if it's Tuesday (to get to next Friday), or 4 days if it's Friday (to get to next Tuesday)
  startDate.add(startDate.day() === 2 ? 3 : 4, 'days'); // 2 is for Tuesday in moment.js
}

console.log(JSON.stringify(events, null, 2));
