import React from 'react';
import { Container, Grid, Header, Image } from 'semantic-ui-react';
import NavigationMenu from './NavigationMenu';
import BookingDetails from './RoomOptions';
import Filters from './Filters';
import HotelList from './HotelsList';
import Footer from './Footer';

const Home: React.FC = () => {
  return (
    <Container style={{ marginTop: '1em' }}>
      <NavigationMenu />
      <BookingDetails />
      <Filters />
      <HotelList />
      <Footer />
    </Container>
  );
};

export default Home;
