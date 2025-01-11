import React, { useEffect, useState } from 'react';
import { Card, Icon, Image, Label, Button, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { HotelsListApiResponse, Hotel } from '../types';
import { useAppContext } from '../AppContext';
import './HotelsList.css';

const HotelList: React.FC = () => {
  const [hotelsData, setHotelsData] = useState<Array<Hotel> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { selectedFilterLocation } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<HotelsListApiResponse> = await axios.get("http://localhost:5000/hotels");
        console.log(response.data, 'arun')
        if (selectedFilterLocation !== '') {
          const filteredHotels = response.data.data.filter((hotel: Hotel) => {
            return hotel.location.toLowerCase() === selectedFilterLocation.toLowerCase();
          });
          setHotelsData(filteredHotels);
        } else {
          setHotelsData(response.data.data);
        }
      } catch (err: any) {
        setError("Failed to fetch data");
        setHotelsData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedFilterLocation]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {hotelsData ? (
        <Grid stackable columns={3} className="hotel-grid">
          {hotelsData.map((hotel: Hotel, index: number) => (
            <Grid.Column key={index}>
              <Card fluid className="hotel-card">
                <Image src={`hotel${index+1 <= 8 ? index+1 : 1}.jpg`} wrapped ui={false} alt={hotel.name} />
                <Card.Content className="card-content">
                  <Card.Header>
                    {hotel.name}
                  </Card.Header>
                  <Card.Meta>
                    {hotel.location} - &nbsp;
                    <a href={hotel.googleMapsUrl} target='_blank' style={{ color: 'green' }}>Show on map</a>
                  </Card.Meta>
                  <Card.Description>
                    <Header as='h4'>{hotel.category}</Header>
                    <p>{hotel.roomStatus}</p>
                    <p>
                      <strong>{hotel.bedType}</strong>
                    </p>
                    <p>{hotel.roomStatus}</p>
                    <div className='hotel-price'>
                      {hotel.price ? hotel.price + ' INR' : <>&nbsp;</>}
                    </div>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra className="card-extra">
                  <div className='ui two buttons'>
                  <Link to={`/room-details/${hotel.id}`} style={{ color: '#1e70bf', width: '100%' }}>
                    <Button basic color='blue' floated='right' style={{ width: '100%' }}>
                      Check this room
                    </Button>
                  </Link>
                  </div>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      ) : (!loading && <p>No Data Available</p>)}
    </div>
  );
};

export default HotelList;