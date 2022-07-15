import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Information = (props) => (
    <tr>
      <td>{props.information.staff_id}</td>
      <td>{props.information.sex}</td>
      <td>{props.information.age}</td>
      <td>{props.information.first_name}</td>
      <td>{props.information.last_name}</td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.information._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deleteInformation(props.information._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
   );
    
   export default function InformationList() {
    const [informations, setInformations] = useState([]);
    
    // This method fetches the information from the database.
    useEffect(() => {
      async function getInformations() {
        const response = await fetch(`https://group10smsbackend-jkbr8ai6g-smong-paragoniued.vercel.app/information/`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const informations = await response.json();
        setInformations(informations);
      }
    
      getInformations();
    
      return;
    }, [informations.length]);
    
    // This method will delete a information
    async function deleteInformation(id) {
      await fetch(`https://group10smsbackend-jkbr8ai6g-smong-paragoniued.vercel.app/information/delete/${id}`, {
        method: "DELETE"
      });
    
      const newInformations = informations.filter((el) => el._id !== id);
      setInformations(newInformations);
    }
    
    // This method will map out the information on the table
    function informationList() {
      return informations.map((information) => {
        return (
          <Information
            information={information}
            deleteInformation={() => deleteInformation(information._id)}
            key={information._id}
          />
        );
      });
    }
    
    // This following section will display the table with the records of individuals.
    return (
        <div>
        <Table>
            <tr> 
                <th><h3>Information List</h3></th>
                <th><Button variant="outline-dark">Create Information</Button></th>
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
            <tbody>{informationList()}</tbody>
        </Table>
        </div>
      )
}