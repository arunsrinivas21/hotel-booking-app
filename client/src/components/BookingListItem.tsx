import React, { useEffect, useState } from "react";
import { Card, Grid, Image, Header, Icon, List, Button, Segment } from "semantic-ui-react";
import { Hotel, HotelsListApiResponse } from "../types";
import axios, { AxiosResponse } from "axios";

interface HotelListItemProps {
  name: string;
  location: string;
  distance: string;
  amenities: string[];
  rating: number;
  reviews: number;
  originalPrice: number;
  discountedPrice: number;
  taxes: number;
  image: string;
}

const HotelListItem: React.FC<HotelListItemProps> = ({
  name,
  location,
  distance,
  amenities,
  rating,
  reviews,
  originalPrice,
  discountedPrice,
  taxes,
  image,
}) => {
  const [hotelsData, setHotelsData] = useState<Array<Hotel> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<HotelsListApiResponse> = await axios.get("http://localhost:5000/booked-hotels");
        console.log(response.data, 'booking history')
        setHotelsData(response.data.data);
      } catch (err: any) {
        setError("Failed to fetch data");
        setHotelsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Card fluid>
        {hotelsData?.map((hotel) => {
          return (
            <Grid stackable style={{ padding: '10px' }}>
              {/* Image Section */}
              <Grid.Column width={4}>
                <Image src={image} fluid style={{ maxWidth: '100%' }} />
              </Grid.Column>

              {/* Details Section */}
              <Grid.Column width={8} style={{}}>
                <Header as="h3">{hotel.name}</Header>
                <Header as="h4" color="blue">
                  {hotel.address}
                </Header>
                <p>{hotel.category}</p>
                <p>{hotel.bedType}</p>
                <List>
                  {hotel.facilities.map((facility, index) => (
                    <List.Item key={index}>
                      {facility}
                    </List.Item>
                  ))}
                </List>
                <p style={{ color: "brown", marginTop: "1rem" }}>
                  <a href={hotel.googleMapsUrl} target='_blank'>Google Maps Location</a>
                </p>
              </Grid.Column>

              {/* Pricing and Rating Section */}
              <Grid.Column width={4} textAlign="center">
                <Header as="h4" color="blue">
                  Booking Confirmed
                </Header>

                <Segment>
                  <List>
                    <List.Item>
                      Check In Date: {hotel?.bookDetails?.checkInDate}
                    </List.Item>
                    <List.Item>
                      Check Out Date: {hotel?.bookDetails?.checkOutDate}
                    </List.Item>
                    <List.Item>
                      Number of persons: {hotel?.bookDetails?.numberOfPersons}
                    </List.Item>
                    <List.Item>
                      Number of rooms: {hotel?.bookDetails?.numberOfRooms}
                    </List.Item>
                  </List>
                </Segment>
                
                <Button
                  color="red"
                  content="Cancel Booking"
                  fluid
                />
              </Grid.Column>
            </Grid>
          )
        })}
      </Card>
    </div>
  );
};

export default HotelListItem;
