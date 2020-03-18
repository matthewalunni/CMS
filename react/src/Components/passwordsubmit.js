import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { FooterSection, Footer, FooterLinkList } from "react-mdl";
import "./css.css";

class passwordsubmit extends Component {
  render() {
    return (
      <div>
        <Container maxWidth="sm">
          <Card>
            <div>
              <div class="submitformdiv">
                <h2>Step 3</h2>
                <p>
                  Please enter a new password that is secure that you will
                  remember.
                </p>
                <form className="centerBoxItems">
                  <label for="password">Password</label>
                  <br></br>
                  <input
                    type="text"
                    id="password"
                    code="password"
                    class="emailaddressbar"
                  />
                  <br></br>
                  <br></br>
                  <input
                    type="submit"
                    value="Next"
                    className="submitnextbutton"
                  />
                </form>
              </div>
            </div>
          </Card>
        </Container>
      </div>
    );
  }
}

export default passwordsubmit;