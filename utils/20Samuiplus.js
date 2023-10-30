const moment = require('moment-timezone');

const events = [];

// Common start date
let startDate = moment.tz('2023-10-31 21:00', 'Asia/Bangkok');

for (let i = 0; i < 3; i++) {
  // Phetchbuncha stadium Muay Thai Match (Wed and Sat)
  if (startDate.day() === 3 || startDate.day() === 6) {
    const eventPhetchbuncha = {
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
      "eventGift": "g01",
      "eventGroup": "a001",
      "eventDescription": "Location: Phetchbuncha stadium \nCall: +66 84 772 6739\nMap: https://goo.gl/maps/6WWnUymaPv2x2kYj7"
    };

    events.push(eventPhetchbuncha);
  }

  // Samui International Muay Thai Stadium (Tue and Fri)
  if (startDate.day() === 2 || startDate.day() === 5) {
    const eventSamui = {
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
      "eventGroup": "a001",
      "eventDescription": "Location: Samui International Muay Thai Stadium \nCall: +66 90-2932445\nMap: https://maps.app.goo.gl/pobfuGfQbPbT8E9y9"
    };

    events.push(eventSamui);
  }

  // Update startDate for next iteration
  startDate.add(1, 'days');  // Move to the next day
}

console.log(JSON.stringify(events, null, 2));
