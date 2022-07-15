import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useParams, useNavigate} from "react-router";

   export default function InformationList() {
    const [info, setInfo] = useState({
      _id: "",
      staff_id: "",
      age: "",
      sex: "",
      name: {
        first_name: "",
        last_name: ""
      }
    });

    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`https://group10smsbackend.vercel.app/staff/${params.id.toString()}`);

        if (!response.ok) {
          const message = `An error has occured1: ${response.statusText}`;
          window.alert(message);
          return;
        }
        const staff = await response.json();
        if (!staff) {
          window.alert(`Staff with id ${id} not found`);
          navigate("/staffcomponents/staffList");
          return;
        }

        const iid = staff.staff_id;

        const iresponse = await fetch(`https://group10smsbackend.vercel.app/information/staff_id/${iid}`);
        if (!iresponse.ok) {
          const message = `An error has occured2: ${iresponse.statusText}`;
          window.alert(message);
          return;
        }

        const information = await iresponse.json();
        if (!information) {
          window.alert(`Information with staff id ${staff.staff_id} not found`);
          navigate("/staffcomponents/staffList");
          return;
        }

        setInfo(information);
      }
      fetchData();
      return;
    }, [params.id, navigate]);

    
    // This following section will display the table with the records of individuals.
    return (
        <div>
        <Table>
            <tr> 
                <th><h3>Information List</h3></th>
                <th><Link to={`/informationcomponents/editInformation/`}><Button variant="outline-dark" >Create Information</Button></Link></th>
            </tr>
        </Table>
        <Table striped>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>last name</th>
                    <th>Sex</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td>{info.staff_id}</td>
                <td>{info.name.first_name}</td>
                <td>{info.name.last_name}</td>
                <td>{info.sex}</td>
                <td>{info.age}</td>
                <td>
                  <Link className="btn btn-link" to={`/informationcomponents/editInformation/${info._id}`}>Edit</Link>
                </td>
              </tr>
            </tbody>
        </Table>
        </div>
      )
}