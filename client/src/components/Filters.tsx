import React, { useState} from 'react';
import { Grid, Dropdown } from 'semantic-ui-react';

const Filters: React.FC = () => {
  const [filterLocation, setFilterLocation] = useState(''); 

  const locations = [
    { key: 'Chennai', text: 'Chennai', value: 'Chennai' },
    { key: 'Bangalore', text: 'Bangalore', value: 'Bangalore' },
    { key: 'Hyderabad', text: 'Hyderabad', value: 'Hyderabad' },
    { key: 'Mumbai', text: 'Mumbai', value: 'Mumbai' },
    { key: 'Delhi', text: 'Delhi', value: 'Delhi' },
    { key: 'Indore', text: 'Indore', value: 'Indore' },
  ];

  return (
    <Grid stackable columns={1} style={{ justifyContent: 'flex-end' }}>
      <Grid.Column width={6} style={{ display: 'flex', alignItems: 'center' }}>
        <span>Filters:</span>
        <span style={{ width: '100%', marginLeft: '10px' }}>
          <Dropdown 
            placeholder='Select a location' 
            fluid 
            selection 
            options={locations} 
            value={filterLocation} 
            onChange={(e, { value }) => setFilterLocation(value as string)}
          />
        </span>
      </Grid.Column>
    </Grid>
  )
}

export default Filters;