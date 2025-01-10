import React from 'react';
import NavigationMenu from './NavigationMenu';
import { Container } from 'semantic-ui-react';
import HotelListItem from './BookingListItem';

const BookingHistory: React.FC = () => {
  const hotelData = {
    name: "Grand Oliver",
    location: "Poongavanapuram",
    distance: "8 minutes walk to Chennai Central Railway Station",
    amenities: [
      "24-hour Room Service",
      "Free Cancellation till check-in",
      "Book with ₹0 Payment",
    ],
    rating: 3.6,
    reviews: 898,
    originalPrice: 2000,
    discountedPrice: 1587,
    taxes: 360,
    image: "/hotel1.jpg", // Single image URL
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      <NavigationMenu />
      <HotelListItem {...hotelData} />
    </Container>
  )
}

export default BookingHistory;