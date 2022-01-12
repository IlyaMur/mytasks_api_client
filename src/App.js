import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useState, useEffect } from "react";
import AuthService from "./services/authService";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAuth, setIsAUth] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setIsAUth(true);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    window.location.reload();
  };

  const PrivateRoute = ({ auth: { isAuthenticated }, children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  const PrivateRouteLogin = ({ auth: { isAuthenticated }, children }) => {
    return isAuthenticated ? children : <Navigate to="/home" />;
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                myTasks
              </Link>
            </li>
          </div>

          {currentUser ? (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link" onClick={logOut}>
                  Logout
                </Link>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>

      <div className="container">
        <Container>
          <Row className='justify-content-center pt-5'>
            <Col md="8">
              <Card>
                <Routes>
                  <Route path="/" element={<PrivateRoute auth={{ isAuthenticated: isAuth }} > <Home /> </PrivateRoute>}
                  />
                  <Route path="/home" element={<PrivateRoute auth={{ isAuthenticated: isAuth }} > <Home /> </PrivateRoute>}
                  />

                  <Route path="/signup" element={<PrivateRouteLogin auth={{ isAuthenticated: !isAuth }} > <Signup setIsAUth={setIsAUth} /> </PrivateRouteLogin>}
                  />
                  <Route path="/login" element={<PrivateRouteLogin auth={{ isAuthenticated: !isAuth }} > <Login setIsAUth={setIsAUth} /> </PrivateRouteLogin>}
                  />
                </Routes>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div >

  );
}

export default App;
