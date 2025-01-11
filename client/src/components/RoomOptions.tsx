import React, { useRef } from 'react';
import { Grid, Input, Dropdown, Icon, Popup, Label } from 'semantic-ui-react';
import { useAppContext } from '../AppContext';
import styled from 'styled-components';

const InputLabel = styled(Label)`
  font-size: 14px !important;
  background-color: transparent !important;
  padding-left: 0px !important;
`;

const RoomOptions: React.FC = () => {
  const { 
    checkInDate, 
    checkOutDate, 
    numberOfPersons, 
    numberOfRooms, 
    setCheckInDate, 
    setCheckOutDate, 
    setNumberOfPersons, 
    setNumberOfRooms 
  } = useAppContext();

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

  const checkInInputRef = useRef<HTMLInputElement>(null!);
  const checkOutInputRef = useRef<HTMLInputElement>(null!);

  const openDatePicker = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.showPicker();
  };

  const getTodayDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

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
    setCheckInDate(date);
    setCheckOutDate('');
  };

  return (
    <Grid stackable columns={4}>
      <Grid.Row>
        <Grid.Column width={4}>
          <InputLabel>Check In Date:</InputLabel>
          <Input 
            type="date" 
            value={checkInDate} 
            onChange={handleCheckInChange} 
            placeholder="Check-in Date"
            style={{ width: '100%' }}
            min={getTodayDate()}
            icon={
              <Popup 
                trigger={<Icon name='calendar' link onClick={() => openDatePicker(checkInInputRef)} />}
                content='Select Check-in Date'
                position='bottom center'
                on='hover'
              />
            }
            inputRef={checkInInputRef}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <InputLabel>Check Out Date:</InputLabel>
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
          <InputLabel>Number of Persons:</InputLabel>
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
          <InputLabel>Number of Rooms:</InputLabel>
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