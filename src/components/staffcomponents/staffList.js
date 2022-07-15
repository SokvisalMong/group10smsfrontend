import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link, Navigate } from "react-router-dom";

const Staff = (props) => (
    <tr>
      <td>{props.staff.staff_id}</td>
      <td>{props.staff.staff_mobile}</td>
      <td>{props.staff.staff_salary}</td>      
      <td>{props.staff.dept_id}</td>
      <td>
        <Link className="btn btn-link" to={`/informationcomponents/viewInformation/${props.staff._id}`}>More</Link> |
        <Link className="btn btn-link" to={`/staffcomponents/editStaff/${props.staff._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deleteStaff(props.staff._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
   );
    
   export default function StaffList() {
    const [staffs, setStaffs] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getStaffs() {
        const response = await fetch(`https://group10smsbackend-jkbr8ai6g-smong-paragoniued.vercel.app/staff/`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const staffs = await response.json();
        setStaffs(staffs);
      }
    
      getStaffs();
    
      return;
    }, [staffs.length]);
    
    // This method will delete a record
    async function deleteStaff(id) {
      const response = await fetch(`https://group10smsbackend-jkbr8ai6g-smong-paragoniued.vercel.app/staff/${id}`);

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const tempStaff = await response.json();
      if (!tempStaff) {
        window.alert(`temp failed`);
        Navigate("/");
        return;
      }

      const iid = tempStaff.staff_id;
      
      const iresponse = await fetch(`https://group10smsbackend-jkbr8ai6g-smong-paragoniued.vercel.app/information/staff_id/${iid}`);
      if (!iresponse.ok) {
        const message = `error occured can't be fucked`;
        window.alert(message);
        return;
      }
      
      const tempInfo = await iresponse.json();
      if (!tempInfo) {
        window.alert(`temp info ded`);
        Navigate("/");
        return;
      }

      await fetch(`https://group10smsbackend-jkbr8ai6g-smong-paragoniued.vercel.app/information/delete/${tempInfo._id}`, {
        method: "DELETE"
      });

      await fetch(`https://group10smsbackend-jkbr8ai6g-smong-paragoniued.vercel.app/staff/delete/${id}`, {
        method: "DELETE"
      });

      const newStaffs = staffs.filter((el) => el._id !== id);
      setStaffs(newStaffs);
    }
    
    // This method will map out the staffs on the table
    function staffList() {
      return staffs.map((staff) => {
        return (
          <Staff
            staff={staff}
            deleteStaff={() => deleteStaff(staff._id)}
            key={staff._id}
          />
        );
      });
    }
   
    // This following section will display the table with the staffs of individuals.
    return (
        <div>
        <Table>
            <tr> 
                <th><h3>Staff List</h3></th>
                <th><Link to={`/staffcomponents/createStaff/`}><Button variant="outline-dark" >Create Staff</Button></Link></th>
            </tr>
        </Table>
        <Table striped>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Modile Number</th>
                    <th>Salary</th>
                    <th>Department ID</th>
                </tr>
            </thead>
            <tbody>
                {staffList()}
            </tbody>
        </Table>
        </div>
      )
}
