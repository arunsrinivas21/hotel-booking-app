import React from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react';
import NavigationMenu from './NavigationMenu';
import BookingDetails from './RoomOptions';
import Filters from './Filters';
import HotelList from './HotelsList';

const Home: React.FC = () => {
  return (
    <Container style={{ marginTop: '2em' }}>
      <NavigationMenu />
      <BookingDetails />
      <Filters />
      <HotelList />
    </Container>
  );
};

export default Home;
