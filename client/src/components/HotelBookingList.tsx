import React, { useEffect, useState } from "react";
import { Card, Grid, Image, Header, Modal, List, Button, Segment } from "semantic-ui-react";
import { Hotel, HotelsListApiResponse, HotelApiResponse } from "../types";
import { AxiosResponse } from "axios";
import baseAxios from "../api/api";
import { toast } from 'react-toastify'
import { Link } from "react-router-dom";

const HotelBookingList: React.FC = () => {
  const [hotelsData, setHotelsData] = useState<Array<Hotel> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [cancelWarning, setCancelWarning] = useState<boolean>(false);
  const [selectedHotelName, setSelectedHotelName] = useState<string | null>(null);
  const [selectedHotelId, setSelectedHotelId] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse<HotelsListApiResponse> = await baseAxios.get("/booked-hotels");
      if (response?.data?.data?.length > 0) {
        setHotelsData(response.data.data);
      } else {
        setHotelsData(null);
      }
    } catch (err: any) {
      setError("Failed to fetch data");
      setHotelsData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      setSelectedHotelId(null);
      setSelectedHotelName(null);
    }
  }, []);

  return (
    <div style={{ marginTop: '20px' }}>
      <div className="back-to-hotels-link">
        <Link to='/'>
          <Button 
            content='&lt; Back to Hotels List'
            color='blue'
          />
        </Link>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {hotelsData ? (
        <Card fluid>
        {hotelsData?.map((hotel) => {
          return (
            <div style={{ padding: '15px 10px' }} key={hotel?.id}>
              <Grid stackable style={{ borderBottom: '1px solid #f3f3f3' }}>
                <Grid.Column width={4}>
                  <Image src={'./hotel1.jpg'} fluid style={{ maxWidth: '100%' }} />
                </Grid.Column>

                <Grid.Column width={8} style={{}}>
                  <Header as="h3" style={{ marginBottom: '0px' }}>{hotel.name}</Header>
                  <Header as="h4" color="blue" style={{ marginTop: '10px' }}>
                    {hotel.address}
                  </Header>
                  <p>{hotel.category}</p>
                  <p>{hotel.bedType}</p>
                  {/* <List>
                    {hotel.facilities.map((facility, index) => (
                      <List.Item key={index}>
                        {facility}
                      </List.Item>
                    ))}
                  </List> */}
                  <p style={{ color: "brown", marginTop: "1rem" }}>
                    <a href={hotel.googleMapsUrl} target='_blank' rel='noreferrer'>Open in Google Maps</a>
                  </p>
                </Grid.Column>

                <Grid.Column width={4} textAlign="center">
                  <Header as="h4" color="blue">
                    Booking Confirmed
                  </Header>

                  <Segment>
                    <List style={{ textAlign: 'left' }}>
                      <List.Item>
                        Check In Date: {hotel?.bookingDetails?.checkInDate}
                      </List.Item>
                      <List.Item>
                        Check Out Date: {hotel?.bookingDetails?.checkOutDate}
                      </List.Item>
                      <List.Item>
                        Number of Persons: {hotel?.bookingDetails?.numberOfPersons}
                      </List.Item>
                      <List.Item>
                        Number of Rooms: {hotel?.bookingDetails?.numberOfRooms}
                      </List.Item>
                    </List>
                  </Segment>

                  <Button
                    color="red"
                    content="Cancel Booking"
                    fluid
                    onClick={() => {
                      setSelectedHotelName(hotel.name);
                      setSelectedHotelId(hotel?.id ? hotel.id : '');
                      setCancelWarning(true);
                    }}
                  />
                </Grid.Column>
              </Grid>
            </div>
          )
        })}
        <Modal
          open={cancelWarning && !!selectedHotelName && !!selectedHotelId}
          onClose={() => {
            setCancelWarning(false)
            setSelectedHotelName(null);
            setSelectedHotelId(null);
          }}
          closeIcon
        >
          <Modal.Header>
            Confirm Cancellation
          </Modal.Header>
          <Modal.Content>
            <Header as="h3">Are you sure you want to cancel the booking in {selectedHotelName}?</Header>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Yes, Go Ahead and Cancel"
              color="red"
              onClick={() => {
                const updateHotelBooking = async () => {
                  try {
                    setLoading(true);
                    const response: AxiosResponse<HotelApiResponse> = await baseAxios.put(`/hotels/${selectedHotelId}`, {
                      bookingStatus: false,
                      bookingDetails: {}
                    });
                    fetchData();
                    toast.success('Your booking was sucessfully cancelled', {
                      position: 'top-right'
                    });
                    setCancelWarning(false);
                    setSelectedHotelId(null);
                    setSelectedHotelName(null);
                    return;
                  } catch (err: any) {
                    toast.error('Error while trying to cancel, please try again', {
                      position: 'top-right'
                    });
                    setCancelWarning(false);
                    setSelectedHotelId(null);
                    setSelectedHotelName(null);
                  } finally {
                    console.log('Update done')
                  }
                };
            
                updateHotelBooking();
              }}
            />
            <Button
              content="No, Don't Cancel"
              color="grey"
              onClick={() => {
                setCancelWarning(false)
                setSelectedHotelName(null);
                setSelectedHotelId(null);
              }}
            />
          </Modal.Actions>
        </Modal>
        </Card>
      ) : !loading && (<h3 style={{ textAlign: 'center' }}>No Bookings Available</h3>)}
    </div>
  );
};

export default HotelBookingList;
