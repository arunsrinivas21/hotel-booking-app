import React from "react";
import { Container, Grid, Header, Segment } from "semantic-ui-react";

const Footer: React.FC = () => {
  return (
    <Segment
      // inverted
      vertical
      style={{ padding: "2em 0em", marginTop: "2em", backgroundColor: "#f3f3f3", borderRadius: "5px" }}
    >
      <Container>
        <Grid divided stackable>
          <Grid.Row>
            <Grid.Column width={16} style={{ textAlign: 'center' }}>
              <Header as="h3">
                About this project
              </Header>
              <p>
                Full-Stack Hotel Booking App for skill assessment. Made with &#10084; in Javascript (React JS + Node JS)
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div style={{ textAlign: "center", marginTop: "1em" }}>
          <p>© 2025 PA Hotel Booking. All Rights Reserved.</p>
        </div>
      </Container>
    </Segment>
  );
};

export default Footer;
