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
  const showYearSelect = location.pathname == '/admin/schwundberechnung' ||
                         location.pathname == '/admin/studienverlauf';  

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

  /**
   * Function to display longLabel in Options and label in dropdown searchbar.
   */
  const handleOptionsDisplay = ({ label, labelLong }, {context}) => {
    return context === 'menu' ? labelLong : label;
  };

  /**
   * Styles to control the width of the select components.
   */
  const selectStyles = {
    baseSelect: {
      "min-width": "8em",
      "max-width": "10%",
    },
    compareSelect: {
      "max-width": "30%",
    },
  };

  const customStyles = {
    control: (provided) => ({ //Select Input Field
      ...provided,
    }),
    menu: (provided) => ({ //Dropdown menu
      ...provided,
      width: 460,
    }),
    option: (provided) => ({ //Options in dropdown menu
      ...provided,
      whiteSpace: 'nowrap'
    })
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
          (<div style={selectStyles.baseSelect}>
            <Select
                isClearable={false}
                isSearchable={true}
                options={props.baseCourseOptions}
                onChange={props.handleBaseCourseChange}
                styles={customStyles}
                formatOptionLabel={handleOptionsDisplay}
                defaultValue={props.baseCourseOptions[6]}
            />
          </div>)}
          {showCompareSelect &&
          (<React.Fragment>
            <Navbar.Brand className="mr-2 ps-3" >
              {"Vergleich mit:"}
            </Navbar.Brand>
            <div style={selectStyles.compareSelect}>
              <Select
                  className="ps-3 pe-3"
                  isClearable={true}
                  isSearchable={true}
                  isMulti={true}
                  options={props.coursesOptions}
                  formatOptionLabel={handleOptionsDisplay}
                  onChange={props.handleCoursesChange}
                  placeholder={"Studiengänge wählen..."}
                  hideSelectedOptions={true}
                  styles={customStyles}
                  // isDisabled={!showCompareSelect}
              />
            </div>
          </React.Fragment>)
          }
          {showYearSelect &&
          (<React.Fragment>
            <Navbar.Brand className="mr-2 ps-3" >
              {"Jahr:"}
            </Navbar.Brand>
            <Select
              className="ps-3 pe-3"
              isClearable={false}
              isSearchable={true}
              options={props.yearOptions}
              placeholder={"Jahr wählen..."}
              onChange={props.handleYearChange}
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