import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";

import React from "react";
import routes from "../routes.js";

function Header(props) {
  /**
   * Constant needed for location info.
   */
  const location = useLocation();
  /**
   * Constant needed for navigation.
   */
  const navigate = useNavigate();

  const showCompareSelect = location.pathname == '/admin/schwundberechnung';
  const showBaseSelect = location.pathname !='/admin/glossar';

  /**
   * Function to get name (= name in sidebar) from current route.
   * @returns String with name
   */
  const getBrandText = () => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name + (showBaseSelect ? " für:" : "");
      }
    }
    return "Brand";
  };

  /**
   * Handles logout. 
   * For the prototype only redirecting back to login.
   */
  const handleLogout = () => {
    navigate('/login');
  };


  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <div className="d-flex justify-content-center align-items-center ml-2 ml-lg-0">
          <Navbar.Brand className="ps-3 mr-2 pe-3" >
            {getBrandText()}
          </Navbar.Brand>
        </div>
          {showBaseSelect &&
          (<Select
                isClearable={false}
                isSearchable={true}
                options={props.baseCourseOptions}
                onChange={props.handleBaseCourseChange}
                defaultValue={props.baseCourseOptions[6]}
            />)}
          {showCompareSelect &&
          (<React.Fragment>
          <Navbar.Brand className="mr-2 ps-3" >
            {"Vergleich mit:"}
          </Navbar.Brand>
          <Select
              className="ps-3 pe-3"
              isClearable={true}
              isSearchable={true}
              isMulti={true}
              options={props.coursesOptions}
              onChange={props.handleCoursesChange}
              placeholder={"Studiengänge wählen..."}
              hideSelectedOptions={true}
              // isDisabled={!showCompareSelect}
          />
          </React.Fragment>)
          }
          <Nav className="ms-auto" navbar>
            <Nav.Item>
              <Nav.Link
                className="m-0"
                href="#pablo"
                onClick={handleLogout}
              >
                <span className="no-icon">Abmelden</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;