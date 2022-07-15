import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const Project = (props) => (
    <tr>
      <td>{props.project.project_id}</td>
      <td>{props.project.project_name}</td>
      <td>{props.project.timetable.start.substring(0,10)}</td>      
      <td>{props.project.timetable.end.substring(0,10)}</td>
      <td>{props.project.timetable.duration} Day(s)</td>
      <td>{props.project.staffs.length}</td>
      <td>
        <Link className="btn btn-link" to={`/projectcomponents/addProject/${props.project._id}`}>Add</Link> |
        <Link className="btn btn-link" to={`/projectcomponents/editProject/${props.project._id}`}>Edit</Link> |
        <button className="btn btn-link"
          onClick={() => {
            props.deleteProject(props.project._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
   );
    
   export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getProjects() {
        const response = await fetch(`http://localhost:5000/project/`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const projects = await response.json();
        setProjects(projects);
      }
    
      getProjects();
    
      return;
    }, [projects.length]);
    
    // This method will delete a record
    async function deleteProject(id) {
      await fetch(`http://localhost:5000/project/delete/${id}`, {
        method: "DELETE"
      });
    
      const newProjects = projects.filter((el) => el._id !== id);
      setProjects(newProjects);
    }
    
    // This method will map out the staffs on the table
    function projectList() {
      return projects.map((project) => {
        return (
          <Project
            project={project}
            deleteProject={() => deleteProject(project._id)}
            key={project._id}
          />
        );
      });
    }
    
    // This following section will display the table with the staffss of individuals.
    return (
        <div>
        <Table>
            <tr> 
                <th><h3>Project List</h3></th>
                <th><Link to={`/projectcomponents/createProject/`}><Button variant="outline-dark" >Create Project</Button></Link></th>
            </tr>
        </Table>
        <Table striped>
            <thead>
                <tr>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Duration</th>
                    <th>Number of Staffs</th>
                </tr>
            </thead>
            <tbody>
                {projectList()}
            </tbody>
        </Table>
        </div>
      )
}