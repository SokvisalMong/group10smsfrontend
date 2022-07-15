import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Admin = (props) => (
    <tr>
      <td>{props.admin.admin_id}</td>
      <td>{props.admin.login.username}</td>
      <td>{props.admin.login.email}</td>
      <td>
        <Link className="btn btn-link" to={`/admincomponents/editAdmin/${props.admin._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deleteAdmin(props.admin._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
   );
    
   export default function AdminList() {
    const [admins, setAdmins] = useState([]);
    
    // This method fetches the admins from the database.
    useEffect(() => {
      async function getAdmins() {
        const response = await fetch(`https://group10smsbackend.vercel.app/admin/`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const admins = await response.json();
        setAdmins(admins);
      }
    
      getAdmins();
    
      return;
    }, [admins.length]);
    
    // This method will delete a admin
    async function deleteAdmin(id) {
      await fetch(`https://group10smsbackend.vercel.app/admin/delete/${id}`, {
        method: "DELETE"
      });
    
      const newAdmins = admins.filter((el) => el._id !== id);
      setAdmins(newAdmins);
    }
    
    // This method will map out the admins on the table
    function adminList() {
      return admins.map((admin) => {
        return (
          <Admin
            admin={admin}
            deleteAdmin={() => deleteAdmin(admin._id)}
            key={admin._id}
          />
        );
      });
    }
    
    // This following section will display the table with the admins of individuals.
    return (
        <div>
        <Table>
            <tr> 
                <th><h3>Admin List</h3></th>
                <th><Link to={`/admincomponents/createAdmin/`}><Button variant="outline-dark">Create Admin</Button></Link></th>
            </tr>
        </Table>
        <Table striped>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
              {adminList()}
            </tbody>
        </Table>
        </div>
      )
}