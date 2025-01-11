## Hotel Booking API Documentation

Version: 1.0.0

Base URL: `http:locahost:5000`

### Endpoints 

#### 1. GET /hotels

- Returns all the hotel objects from the DB

##### Response:

- Status: 200 OK
- Content-Type: application/json
- Data:
`
  [
    {
        "id": "95db11d2-5ae9-4a25-abd8-75248c5bdeb4",
        "name": "Creative Recreation Hotel",
        "description": "Mumbai's new landmark is this hotel - The Creative Recreation Hotel. Check out the hotel for the best staying experience",
        "price": 55555,
        "location": "Mumbai",
        "address": "Dalal Street, Mumbai - 987354",
        "facilities": [
            "Free Airport pick-up and drop",
            "Family Rooms",
            "Free Wi-Fi",
            "Chef Specials"
        ],
        "roomsStatus": "Only last 5 rooms available",
        "googleMapsUrl": "https://maps.app.goo.gl/wEMmaZC61jSFugfM6",
        "category": "5 stars",
        "bedType": "2 single beds or 1 queen size bed",
        "bookingStatus": false,
        "bookingDetails": {}
    }
  ]
`
#### 2. GET hotels/:id

- Returns the hotel object based on the `id`

##### Response 

- Status: 200 OK
- Content-Type: application/json
- Data:
`
  {
    "id": "37050d53-d8a1-4b81-9d16-9a524a8251ab",
    "name": "Maha Crown Hotel",
    "description": "The Financial Captial of India has a crown in it - The Maha Crown Hotel. This hotel makes you feel alive in the heart of the city as the hotel is just 10 mins drive from the airport.",
    "price": 99999,
    "location": "Mumbai",
    "address": "Bajaj Street, AC Bhavan Opposite, Mumbai - 431022",
    "facilities": [
        "Peninsula Waterloos",
        "Water Rides",
        "Private Wi Fi",
        "Mobile Juice Centers",
        "Roman Designs"
    ],
    "roomsStatus": "Last 2 rooms available",
    "googleMapsUrl": "https://www.google.com/travel/hotels/s/hoqN9t31k5kb8Ykf7",
    "category": "5 stars",
    "bedType": "1 queen size bed + 1 single bed",
    "bookingStatus": false,
    "bookingDetails": {}
}
`

#### 3. GET /hotels/booked-hotels

- Returns all the booked hotels (bookingStatus: true)

##### Response

- Status: 200 OK
- Content-Type: application/json
- Data:

`
  [
    {
      "id": "cb3565ad-8572-4f3c-aa7d-64a8a1789424",
      "name": "Raja Annamalai Hotel",
      "description": "Located in the Holy land of Hyderabad, this hotel is a recently upgraded 5 star hotel with luxury as a way of life. Chaffers, assistants, attendants, instructors are also available during your stay. Book now for a cosy stay ",
      "price": 25000,
      "location": "Hyderabad",
      "address": "Garden Road, Hyderabad, Telangana - 561203",
      "facilities": [
          "15 different cuisines",
          "Dry Cleaning Service",
          "Wi Fi",
          "Free Breakfast",
          "Smoking Rooms"
      ],
      "roomsStatus": "5 rooms available",
      "googleMapsUrl": "https://maps.app.goo.gl/kNhtyMWWiHzNmN3n8",
      "category": "5 stars",
      "bedType": "1 queen size bed + 2 single beds",
      "bookingStatus": true,
      "bookingDetails": {
          "checkInDate": "2025-01-30",
          "checkOutDate": "2025-02-06",
          "numberOfPersons": 1,
          "numberOfRooms": 1
      }
    }
  ]
`

#### 4. PUT /hotels/:id

- To update the booking status and booking details of the hotel based on the `id`

##### Request 

- In case of hotel booking

`
  {
    bookingStatus: true,
    bookingDetails: {
      checkInDate: "12-01-2025",
      checkOutDate: "16-01-2025",
      numberOfPersons: 2,
      numberOfRooms: 1,
    }
  }
`

- In case of booking cancellation 

`
  {
    bookingStatus: false,
    bookingDetails: {}
  }
`

##### Response

`
  { 
    message: "Hotel updated successfully",
    hotel: {
      {
        "id": "cb3565ad-8572-4f3c-aa7d-64a8a1789424",
        "name": "Raja Annamalai Hotel",
        "description": "Located in the Holy land of Hyderabad, this hotel is a recently upgraded 5 star hotel with luxury as a way of life. Chaffers, assistants, attendants, instructors are also available during your stay. Book now for a cosy stay ",
        "price": 25000,
        "location": "Hyderabad",
        "address": "Garden Road, Hyderabad, Telangana - 561203",
        "facilities": [
          "15 different cuisines",
          "Dry Cleaning Service",
          "Wi Fi",
          "Free Breakfast",
          "Smoking Rooms"
        ],
        "roomsStatus": "5 rooms available",
        "googleMapsUrl": "https://maps.app.goo.gl/kNhtyMWWiHzNmN3n8",
        "category": "5 stars",
        "bedType": "1 queen size bed + 2 single beds",
        "bookingStatus": true,
        "bookingDetails": {
          "checkInDate": "2025-01-30",
          "checkOutDate": "2025-02-06",
          "numberOfPersons": 1,
          "numberOfRooms": 1
        }
      }
    }
  }
`

#### 5. POST /hotels

- To add a new hotel object in the DB

##### Request 

- New hotel's details in the request body 

`
  {
    "name": "Chennai Royal Hotels",
    "description": "Located in the heart of the Chennai city, Chennai Royal Hotels offers top-notch facilities such as an in-house lounge with a bar and pool, a 24-hour cafe and luxe rooms",
    "price": 20000,
    "location": "Chennai",
    "address": "Guindy, Chennai",
    "facilities": [
      "Swimming Pool",
      "Gym",
      "Bar",
      "Conference Rooms",
      "City-Wide View"
    ],
    "roomsStatus": "5 rooms available",
    "googleMapsUrl": "https://maps.app.goo.gl/kHat694Fxbhx7kav7",
    "category": "4 stars",
    "bedType": "1 queen size bed",
  }
`

##### Response

- Status: 201
- Content-Type: application/json
- Data: Same hotel object with `id` added to it

`
  {
    "name": "Chennai Royal Hotels",
    "description": "Located in the heart of the Chennai city, Chennai Royal Hotels offers top-notch facilities such as an in-house lounge with a bar and pool, a 24-hour cafe and luxe rooms",
    "price": 20000,
    "location": "Chennai",
    "address": "Guindy, Chennai",
    "facilities": [
      "Swimming Pool",
      "Gym",
      "Bar",
      "Conference Rooms",
      "City-Wide View"
    ],
    "roomsStatus": "5 rooms available",
    "googleMapsUrl": "https://maps.app.goo.gl/kHat694Fxbhx7kav7",
    "category": "4 stars",
    "bedType": "1 queen size bed",
    "id": "1ca0fbac-0cfd-426b-aff9-0ad80de30b82"
  }
`

#### 6. DELETE /hotels/:id

- Delete the hotel object using the `id`

##### Response 

- Status: 200 OK
- Content-Type: application/json
- Data:

`
  {
    message: "Hotel removed successfully"
  }
`
