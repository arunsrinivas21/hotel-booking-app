import React from 'react';
import NavigationMenu from './NavigationMenu';
import { Container } from 'semantic-ui-react';
import HotelBookingList from './HotelBookingList';
import Footer from './Footer';

const BookingHistory: React.FC = () => {
  return (
    <Container style={{ marginTop: '1em' }}>
      <NavigationMenu />
      <HotelBookingList />
      <Footer />
    </Container>
  )
}

export default BookingHistory;