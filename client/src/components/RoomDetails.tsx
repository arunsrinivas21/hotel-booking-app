import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Image,
  Header,
  Icon,
  Segment,
  List,
  Button,
  Modal,
} from "semantic-ui-react";
import { toast } from 'react-toastify';
import ImageGallery from './ImageGallery';
import NavigationMenu from "./NavigationMenu";
import BookingDetails from './RoomOptions';
import axios, { AxiosResponse } from "axios";
import { Hotel, HotelApiResponse } from "../types";
import { useAppContext } from '../AppContext';
import styled from "styled-components";

interface HotelDetailsprops {
  
}

const WarningHelperMessage = styled.p`
  color: red;
`;

const HotelDetails: React.FC<HotelDetailsprops> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [confirmReservationFlag, setConfirmReservationFlag] = useState(false);
  const [hotelData, setHotelData] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { checkInDate, checkOutDate, numberOfPersons, numberOfRooms, setCheckInDate, setCheckOutDate, setNumberOfPersons, setNumberOfRooms } = useAppContext();

  useEffect(() => {
    if (params.roomId) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response: AxiosResponse<HotelApiResponse> = await axios.get(`http://localhost:5000/hotels/${params.roomId}`);
          console.log(response.data, 'arun')
          setHotelData(response.data.data);
        } catch (err: any) {
          setError("Failed to fetch data");
          setHotelData(null);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }
  }, [params]); 

  const confirmReservation = (): void => {
    setConfirmReservationFlag(true);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {hotelData ? (
        <Container style={{ marginTop: '2em' }}>
          <NavigationMenu />
          <BookingDetails />
          <Header as="h1" textAlign="center" style={{ marginTop: "1rem" }}>
            {hotelData.name}
          </Header>
          <Grid stackable>
            <Grid.Row>
              <ImageGallery />
            </Grid.Row>

            {/* Property Highlights */}
            <Grid.Row>
              <Grid.Column width={10}>
                <Header as="h2">Property Highlights</Header>
                {hotelData.facilities.length > 0 && (
                  <Segment>
                    <List>
                      {hotelData.facilities.map(facility => {
                        return (
                          <List.Item key={facility}>
                            {facility}
                          </List.Item>
                        )
                      })}
                    </List>
                  </Segment>
                )}
              </Grid.Column>
              <Grid.Column width={6}>
                <Header as="h2">Location</Header>
                <Segment>
                  <Icon name="map marker alternate" />
                  {hotelData.address}
                </Segment>
                <a href={hotelData.googleMapsUrl} target="_blank">
                  <Button
                    color="blue"
                    content="Show on map"
                    icon="map marker alternate"
                    fluid
                    style={{ marginTop: "1rem" }}
                  />
                </a>
              </Grid.Column>
            </Grid.Row>

            {/* Additional Details */}
            <Grid.Row>
              <Grid.Column>
                <Header as="h2">About the Property</Header>
                <Segment>
                  <p>
                    {hotelData.description}
                  </p>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            {/* Reserve Section */}
            <Grid.Row>
              <Grid.Column>
                {!checkInDate ? 
                  (<WarningHelperMessage>* Please select Check In and Check Out Dates</WarningHelperMessage>) : 
                  (!checkOutDate ? (<WarningHelperMessage>* Please select Check Out Data</WarningHelperMessage>) : null)
                }
                <Button
                  color="green"
                  content="Reserve Your Stay"
                  icon="check circle"
                  size="large"
                  fluid
                  onClick={confirmReservation}
                  disabled={!checkInDate || !checkOutDate}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Modal
            open={confirmReservationFlag}
            onClose={() => setConfirmReservationFlag(false)}
            closeIcon
          >
            <Modal.Header>One Last Click to Confirm</Modal.Header>
            <Modal.Content>
              <Segment>
                <strong>Booking Details:</strong>
                <List>
                  <List.Item>Check In Date: {checkInDate}</List.Item>
                  <List.Item>Check Out Date: {checkOutDate}</List.Item>
                  <List.Item>No of Persons: {numberOfPersons}</List.Item>
                  <List.Item>No of Rooms: {numberOfRooms}</List.Item>
                </List>
              </Segment>
            </Modal.Content>
            <Modal.Actions>
              <Button
                color="green"
                content="Confirm Room Booking"
                icon="check circle"
                size="large"
                fluid
                onClick={() => {
                  const updateHotelBooking = async () => {
                    try {
                      setLoading(true);
                      const response: AxiosResponse<HotelApiResponse> = await axios.put(`http://localhost:5000/hotels/${params.roomId}`, {
                        bookingStatus: true,
                        bookDetails: {
                          checkInDate,
                          checkOutDate,
                          numberOfPersons,
                          numberOfRooms,
                        }
                      });
                      console.log(response.data, 'arun555')
                      toast.success('Your booking was successful!', {
                        position: 'top-right'
                      });
                      setConfirmReservationFlag(false);
                      setCheckInDate('');
                      setCheckOutDate('');
                      setNumberOfPersons(1);
                      setNumberOfRooms(1);
                      navigate('/');
                      return;
                    } catch (err: any) {
                      toast.error('Room booking error, please try again', {
                        position: 'top-right'
                      });
                      setConfirmReservationFlag(false);
                    } finally {
                      console.log('Update done')
                    }
                  };
              
                  updateHotelBooking();

                  // toast.success('Your booking was successful!', {
                  //   position: 'top-right'
                  // });
                  // setConfirmReservationFlag(false);
                  // navigate('/');
                  // return;
                }}
              />
            </Modal.Actions>
          </Modal>
        </Container>) : (!loading && <p>No Data Available</p>)
        }
    </div>
  );
};

export default HotelDetails;
