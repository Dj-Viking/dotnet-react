import React, { Component, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export const NavMenu: React.FC<{}> = () => {

  const [collapsed, setCollapsed] = useState<boolean>(true);

  function toggleNavbar(state: boolean): void {
    setCollapsed(state);
  }

  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">dotnet_reactredux</NavbarBrand>
          <NavbarToggler onClick={() => {
            toggleNavbar(!collapsed);
          }} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink tag={Link} className="text-dark" to="/hybrid">this is a test</NavLink>
              </NavItem> */}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
