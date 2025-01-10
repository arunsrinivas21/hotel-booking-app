import React, { useEffect, useState } from 'react';
import { Grid, Image, Header } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const BookingHistoryLink = styled(Link)<{ isBookingHistoryPage?: boolean; }>`
  text-decoration: ${props => props.isBookingHistoryPage === true ? 'underline' : 'none'};
  font-weight: ${props => props.isBookingHistoryPage === true ? 'bold' : 'normal'};

  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const NavigationMenu: React.FC = () => {
  const location = useLocation();
  const [isBookingHistoryPage, setIsBookingHistoryPage] = useState<boolean>(false);

  useEffect(() => {
    setIsBookingHistoryPage(location.pathname === '/booking-history');
  }, [location]);
  return (
    <Grid stackable columns={2}>
      <Grid.Column width={8}>
        <Link to='/'>
          <Header as='h2'>PA Hotel Booking</Header>
        </Link>
      </Grid.Column>
      <Grid.Column width={8} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <BookingHistoryLink 
          to="/booking-history" 
          isBookingHistoryPage={isBookingHistoryPage}
        >
          Booking History
        </BookingHistoryLink>
        <Image 
          src='/profile.jpg'
          size='mini'
          circular
          style={{ marginLeft: '10px', cursor: 'pointer', width: '24px', height: '25px', borderRadius: '50%' }}
        />
      </Grid.Column>
    </Grid>
    )
}
export default NavigationMenu;