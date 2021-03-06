import React, { Component } from "react";
import "./HomePage.css";
import {
  Grid,
  Cell,
  List,
  ListItem,
  FooterSection,
  Footer,
  FooterLinkList
} from "react-mdl";

class tempPage extends Component {
  render() {
    return (
      <div>
        <div>
          <Grid className="temp-grid">
            <Cell col={4}>
              <List className="cat-grid">
                <ListItem>
                  <a href="/">
                    <h6>Popular</h6>
                  </a>
                </ListItem>
                <ListItem>
                  <a href="/">
                    <h6>Porfolio</h6>
                  </a>
                </ListItem>
                <ListItem>
                  <a href="/">
                    <h6>Professional Services</h6>
                  </a>
                </ListItem>
                <ListItem>
                  <a href="/">
                    <h6>Local Business</h6>
                  </a>
                </ListItem>
              </List>
            </Cell>
            <Cell col={4}>4</Cell>
            <Cell col={4}>4</Cell>
          </Grid>
        </div>
        <div style={{ paddingbottom: "60px" }}>
          <Footer size="mini">
            <FooterSection type="left" logo="NO.">
              <FooterLinkList>
              {/* commented to supress warnings */}
                {/* <a href="#">Help</a>
                <a href="#">Privacy & Terms</a> */}
              </FooterLinkList>
            </FooterSection>
          </Footer>
        </div>
      </div>
    );
  }
}

export default tempPage;
