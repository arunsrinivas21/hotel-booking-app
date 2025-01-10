import React from 'react';
import NavigationMenu from './NavigationMenu';
import { Container } from 'semantic-ui-react';
import HotelListItem from './BookingListItem';

const BookingHistory: React.FC = () => {
  return (
    <Container style={{ marginTop: '2em' }}>
      <NavigationMenu />
      <HotelListItem />
    </Container>
  )
}

export default BookingHistory;