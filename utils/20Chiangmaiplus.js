const moment = require('moment-timezone');

let startDate = moment.tz('2023-11-20 21:00', 'Asia/Bangkok');
const events = [];

const numberOfDays = 3;

for (let i = 0; i < numberOfDays; i++) {
  let eventCreated = false;

  // Chiangmai Boxing stadium
  if (startDate.day() === 1 || startDate.day() === 2 || startDate.day() === 3 || startDate.day() === 4) {
    events.push({
      "eventType": "boxing",
      "eventName": "Chiangmai Boxing stadium",
      "eventDate": {
        "$date": {
          "$numberLong": startDate.valueOf().toString()
        }
      },
      "organizerId": "653f2d54a02c73d66e1eec99",
      "tickets": [
        {
          "type": "VIP unlimitdrink",
          "price": 1500,
          "available": 96,
          "sold": 0
        },
        {
          "type": "Ringside free a drink",
          "price": 1000,
          "available": 97,
          "sold": 0
        },
        {
          "type": "Standard",
          "price": 600,
          "available": 494,
          "sold": 0
        }
      ],
      "eventGroup": "cm001",
      "eventDescription": "Location: Chiangmai stadium \nCall: +66 81 594 4151\nMap: https://maps.app.goo.gl/Cj2WQpybtL6NP3Xv9"
    });
    eventCreated = true;
  }

  // Thaphae boxing chiangmai (Mon, Tue, Wed, Thu)
  if (startDate.day() === 1 || startDate.day() === 2 || startDate.day() === 3 || startDate.day() === 4) {
    events.push({
      "eventType": "boxing",
      "eventName": "Thaphae boxing chiangmai stadium",
      "eventDate": {
        "$date": {
          "$numberLong": startDate.valueOf().toString()
        }
      },
      "organizerId": "654259a66b10ef2b9cd32814",
      "tickets": [
        {"type": "VIP A/C", "price": 1500, "myprice": 1000, "available": 100, "sold": 0},
        {"type": "Ringside", "price": 1000, "myprice": 700, "available": 97, "sold": 0},
        {"type": "Standard", "price": 600, "myprice": 400, "available": 499, "sold": 0}
      ],
      "eventGroup": "cm001",
      "eventDescription": "https://maps.app.goo.gl/aqv9RtUdexVuQm7u6"
    });
    eventCreated = true;
  }

  // Move to the next day if an event was created
  if (eventCreated) {
    startDate.add(1, 'days');
  }
}

console.log(JSON.stringify(events, null, 2));
