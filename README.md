# PA Hotel Booking App

Simple Full-Stack application to book hotel rooms

This web application is deployed in [https://hotel-booking-9iiaxmj5z-arunsrinivas21s-projects.vercel.app/](https://hotel-booking-9iiaxmj5z-arunsrinivas21s-projects.vercel.app/)

## Technologies Used

- Frontend - React JS + Typescript
- Backend - Node JS + Typescript
- Database - Low DB

## Project Structure 

Project repo has 2 folders 

1. `client` - Represents the client-side app
2. `server` - Represents the server-side app 

Both the applications are maintained separately. 

- Use `npm install` to install the dependencies in each of the modules 
- Use `npm start` to run both client and server code separately. (By default, Client - PORT 3000, Server - PORT 5000)

## Client-Side Pages 

There are 3 main pages in the client-side 

- Hotels listing page
- Hotel details page
- Hotels booking history page

## User Actions & Validations

- Filter hotels based on location
- Select check in date, check out date, number of persons and rooms required 
- Reserve a hotel 
- Cancel a hotel booking
- Google Maps link for each hotel location
- Once the hotel is booked/cancelled, a toast message notification will be displayed to the user
- Static images in `public` folder are used to display the hotel images

- Allow reservation of a hotel room only when check in and check out dates are selected
- The minimum check in date will be today. Past dates cannot be selected
- The check out date will always be greater than the check in date 
- Once a hotel room booking is cancelled, the booking history will be updated instantly
- DB and UI are in sync based on user actions
- Client-side filtering of hotels based on location

## Server-Side Features 

API endpoints - 

- GET /hotels - returns all hotels 
- GET /hotels/:id - return a hotel object based on the `id`
- GET /hotels/booked-hotels - return all booked hotels
- POST /hotels - create a new hotel using the request body 
- PUT /hotels/:id - update the booking status and details (booking/cancelled) based on `id`
- DELETE /hotels/:id - delete a hotel based on the `id`

## API Documentation

For detailed API documentation, please see [API.md](API.md)

## UI Screenshots 

#### Hotels Losting Page Screenshot 1 
![Home Page - 1](screenshots/hotels-listing-page-1.png)

#### Hotels Losting Page Screenshot 2
![Home Page - 2](screenshots/hotels-listing-page-2.png)

#### Hotels Losting Page Screenshot 3
![Home Page - 3](screenshots/hotels-listing-page-3.png)

#### Hotel Details Page Screenshot 1
![Hotel Details Page - 1](screenshots/hotel-details-page-1.png)

#### Hotel Details Page Screenshot 2
![Hotel Details Page - 2](screenshots/hotel-details-page-2.png)

#### Hotel Details Page Screenshot 3
![Hotel Details Page - 3](screenshots/hotel-details-page-3.png)

#### Hotel Booking History Page
![Hotel Booking History Page](screenshots/booking-history-page.png)

