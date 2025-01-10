import React, { useState, useEffect, useRef } from 'react';
import { Grid, Input, Dropdown, Icon, Popup, Label } from 'semantic-ui-react';
import { useAppContext } from '../AppContext';
import styled from 'styled-components';

interface RoomOptionsProps {
  // Define your props here if needed
}

const InputLabel = styled(Label)`
  background-color: transparent !important;
`;

const RoomOptions: React.FC<RoomOptionsProps> = () => {
  // const [checkInDate, setCheckInDate] = useState('');
  // const [checkOutDate, setCheckOutDate] = useState('');
  // const [numberOfPersons, setNumberOfPersons] = useState(1);
  // const [numberOfRooms, setNumberOfRooms] = useState(1);

  const { checkInDate, checkOutDate, numberOfPersons, numberOfRooms, setCheckInDate, setCheckOutDate, setNumberOfPersons, setNumberOfRooms } = useAppContext();


  

  const personOptions = [
    { key: '1', text: '1', value: 1 },
    { key: '2', text: '2', value: 2 },
    { key: '3', text: '3', value: 3 },
    { key: '4', text: '4', value: 4 },
    { key: '5', text: '5', value: 5 },
    { key: '6', text: '6', value: 6 },
  ];

  const roomOptions = [
    { key: '1', text: '1', value: 1 },
    { key: '2', text: '2', value: 2 },
  ];

  // Use non-null assertion operator or ensure the ref is checked before use
  const checkInInputRef = useRef<HTMLInputElement>(null!);
  const checkOutInputRef = useRef<HTMLInputElement>(null!);

  // Function to open the date picker
  const openDatePicker = (ref: React.RefObject<HTMLInputElement>) => {
    // Using optional chaining to safely call showPicker
    ref.current?.showPicker();
  };

  // Effect to update the min attribute of check-out date
  // useEffect(() => {
  //   if (checkOutInputRef.current && checkInDate) {
  //     const nextDay = new Date(checkInDate);
  //     nextDay.setDate(nextDay.getDate() + 1);
  //     const minDate = nextDay.toISOString().split('T')[0];
  //     checkOutInputRef.current.min = minDate;
  //   }
  // }, [checkInDate]);

  const getNextDate = (dateString: string): string => {
    if (dateString) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      const nextDate = date.toISOString().split('T')[0];
      return nextDate;
    }
    return '';
  };

  // Handle check-in date change
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    console.log(date, 'date123')
    setCheckInDate(date);
    // Clear check-out date when check-in date changes
    setCheckOutDate('');
  };

  return (
    <Grid stackable columns={4}>
      <Grid.Row>
        <Grid.Column width={4}>
          <InputLabel>Check In Data:</InputLabel>
          <Input 
            type="date" 
            value={checkInDate} 
            onChange={handleCheckInChange} 
            placeholder="Check-in Date"
            style={{ width: '100%' }}
            icon={
              <Popup 
                trigger={<Icon name='calendar' link onClick={() => openDatePicker(checkInInputRef)} />}
                content='Select Check-in Date'
                position='bottom center'
                on='hover'
              />
            }
            // inputRef={checkInInputRef}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <InputLabel>Check Out Data:</InputLabel>
          <Input 
            type="date" 
            value={checkOutDate} 
            onChange={(e) => setCheckOutDate(e.target.value)} 
            placeholder="Check-out Date"
            style={{ width: '100%' }}
            disabled={checkInDate === ''}
            icon={
              <Popup 
                trigger={<Icon name='calendar' link onClick={() => openDatePicker(checkOutInputRef)} />}
                content='Select Check-out Date'
                position='bottom center'
                on='hover'
              />
            }
            // inputRef={checkOutInputRef}
            min={getNextDate(checkInDate)}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <InputLabel>No of persons:</InputLabel>
          <Dropdown 
            placeholder='No of Persons' 
            fluid 
            selection 
            options={personOptions} 
            value={numberOfPersons} 
            onChange={(e, { value }) => setNumberOfPersons(value as number)}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <InputLabel>No of rooms:</InputLabel>
          <Dropdown 
            placeholder='No of Rooms' 
            fluid 
            selection 
            options={roomOptions} 
            value={numberOfRooms} 
            onChange={(e, { value }) => setNumberOfRooms(value as number)}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default RoomOptions;