// import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

import { Card, Col, Container, Row } from "react-bootstrap";
import LoginButton from "../components/LoginButton";
import SeoReactHelmet from "../components/SeoReactHelmet";
import "../styles/views/LoginScreen.scss";

import Image_responsive from "../components/Image_responsive";
import buglogo1199 from "../public/images/Bug-Tracker-1199.jpg";
import buglogo1399 from "../public/images/Bug-Tracker-1399.jpg";
import buglogo575 from "../public/images/Bug-Tracker-575.jpg";
import buglogo767 from "../public/images/Bug-Tracker-767.jpg";
import buglogo991 from "../public/images/Bug-Tracker-991.jpg";
import CopyToClipboard_button from "../components/CopyToClipboard_button";

type Props = {};

// * this page will be display when user is not logged in
// * This page is only called from the AuthenticateRoute.tsx
export default function LoginScreen({}: Props) {
  return (
    <Container fluid={true} id="LoginScreen-view" className="mx-auto">
      <SeoReactHelmet
        pageTitle="Login screen / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaDescriptionContent="Login screen / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaKeywordsContent="Login screen Bug Tracker RechadSalma ilshaad Kheerdali"
      />

      {/* image of bug logo */}
      <Row id="LoginScreen-view-imageHeaderContainer" className="w-100 mx-auto">
        <Col xs={6} sm={4} md={3} lg={2} className="mx-auto h-100">
          {/* <div id="LoginScreen-views-bugLogoImageContainerFallback"> */}
          <Image_responsive
            imageSrc={buglogo575}
            img767={buglogo767}
            img991={buglogo991}
            img1199={buglogo1199}
            img1399={buglogo1399}
            altString="bug tracker logo"
            // style={{ width: "60px" }}
          />
          {/* </div> */}
        </Col>
      </Row>

      {/* header title */}
      {/* <Row className="mx-auto text-center">
        <h1>Bug Tracker</h1>
      </Row> */}

      {/* Login button to auth0 */}
      {/* <Row className="mx-auto">
        <Col className="justify-content-center">
          <button>dummy login button</button>
        </Col>
      </Row> */}

      {/* card telling user how to login with guest account for demo */}
      <Row className="mx-auto">
        <Col xs={12} sm={10} md={8} lg={6} xl={4} className="mx-auto">
          <Card border="dark" className="text-center border border-3">
            <Card.Body id="LoginScreen-view-cardHeader">
              <Card.Title as="h2" className="text-secondary mt-0">
                Login to your dashboard
              </Card.Title>

              <div
                id="LoginScreen-view-loginButton"
                className="d-grid mx-auto mb-1"
              >
                <LoginButton classStyle="bg-secondary text-bold mx-auto w-100" />
              </div>

              <Card.Link href="https://auth0.com/" target="blank">
                <small className="d-block">
                  Authentication powered by Auth0
                </small>
              </Card.Link>
            </Card.Body>

            <Card.Footer>
              <Card.Title>
                <h3 id="LoginScreen-view-dontSignup" className="text-danger">
                  Don't want to signup!
                </h3>
                <h4>You can use the 'guest' account as demo user:</h4>
              </Card.Title>
              <Card.Text className="mx-auto">
                <div className="userPasswordTextBox">
                  <div>
                    <span>Username:</span>
                    &nbsp;
                    <p className="d-inline fw-bold">guest</p>
                  </div>
                  <div>
                    <span>Password:</span>
                    &nbsp;
                    <p className="d-inline fw-bold">Guest@12</p>
                    <CopyToClipboard_button />
                  </div>
                </div>
              </Card.Text>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
