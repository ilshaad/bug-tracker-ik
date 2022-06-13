// import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "../components/LoginButton";
import { useAppDispatch } from "../models/hooks";
import { loginAction } from "../models/reducers/userProfileSlice";
import SeoReactHelmet from "../components/SeoReactHelmet";
import isAdmin_hook from "../helpers/isAdmin_hook";
import { Card, Col, Container, Row } from "react-bootstrap";

import Image_responsive from "../components/Image_responsive";
import buglogo575 from "../public/images/Bug-Tracker-575.jpg";
import buglogo767 from "../public/images/Bug-Tracker-767.jpg";
import buglogo991 from "../public/images/Bug-Tracker-991.jpg";
import buglogo1199 from "../public/images/Bug-Tracker-1199.jpg";
import buglogo1399 from "../public/images/Bug-Tracker-1399.jpg";

type Props = {};

// * this page will be display when user is not logged in
// * This page is only called from the AuthenticateRoute.tsx
export default function LoginScreen({}: Props) {
  return (
    <Container fluid={true} className="bg-primary bg-gradient h-100 my-auto">
      <SeoReactHelmet
        pageTitle="Login screen / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaDescriptionContent="Login screen / Bug Tracker - Github user: RechadSalma | Developer: ilshaad Kheerdali"
        metaKeywordsContent="Login screen Bug Tracker RechadSalma ilshaad Kheerdali"
      />
      {/* image of bug logo */}
      <Row>
        <Col xs={6} className="mx-auto">
          <Image_responsive
            imageSrc={buglogo575}
            img767={buglogo767}
            img991={buglogo991}
            img1199={buglogo1199}
            img1399={buglogo1399}
            altString="bug tracker logo"
            // style={{ width: "60px" }}
          />
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
        <Col>
          <Card className="text-center">
            <Card.Header>
              <h3>Login / Signup to your Bug tracker account</h3>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                {/* <h4>
                  Use 'guest' account for demostration if you do not wish to
                  signup
                </h4> */}
                <h3>Don't want to signup!!</h3>
                <h4>You can use the 'guest' account for demo</h4>
              </Card.Title>
              <Card.Text>
                <div>
                  <div>
                    <span>Username:</span>
                    <p className="d-inline">guest</p>
                  </div>
                  <div>
                    <span>Password:</span>
                    <p className="d-inline">Guest@12</p>
                  </div>
                </div>
              </Card.Text>
              {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
            <Card.Footer>
              <LoginButton />

              <a href="https://auth0.com/" target="blank">
                <small className="d-block">
                  Authentication powered by Auth0
                </small>
              </a>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* <LoginButton /> */}
    </Container>
  );
}
