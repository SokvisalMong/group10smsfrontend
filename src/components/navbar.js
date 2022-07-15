import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function navbar(){
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Staff Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" variant="tabs">
          <Nav className="me-auto">
            <Nav.Link href="/staffcomponents/staffList">Staff</Nav.Link>
            <Nav.Link href="/departmentcomponents/departmentList">Department</Nav.Link>
            <Nav.Link href="/projectcomponents/projectList">Project</Nav.Link>
            <Nav.Link href="/admincomponents/adminList">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default navbar