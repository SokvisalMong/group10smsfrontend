import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   project_id: "",
   project_name: "",
   start: "",
   end: "",
   duration: ""
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/project/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const project = await response.json();
     if (!project) {
       window.alert(`Project with id ${id} not found`);
       navigate("/");
       return;
     }
     
     setForm({
      project_id: project.project_id,
      project_name: project.project_name,
      start: project.timetable.start,
      end: project.timetable.end,
      duration: project.timetable.duration
     });
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedProject = {
     project_id: Number(form.project_id),
     project_name: (form.project_name),
     timetable: {
       start: new Date(form.start),
       end: new Date(form.end)
     }
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/project/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedProject),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/projectcomponents/projectList");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Project</h3>
     <form onSubmit={onSubmit}>
     <div className="form-group">
         <label htmlFor="project_id">Project ID: </label>
         <input
           type="text"
           className="form-control"
           id="project_id"
           value={form.project_id}
           onChange={(e) => updateForm({ project_id: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="project_name">Project Name: </label>
         <input
           type="text"
           className="form-control"
           id="project_name"
           value={form.project_name}
           onChange={(e) => updateForm({ project_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="start">Starting Date: (Please write in date format: mm/dd/yyyy)</label>
          <input
           type="text"
           className="form-control"
           id="start"
           value={form.start.substring(0,10)}
           onChange={(e) => updateForm({ start: e.target.value })}
          />
          
       </div>
       <div className="form-group">
         <label htmlFor="end">End Date: (Please write in date format: mm/dd/yyyy)</label>
         <input
           type="text"
           className="form-control"
           id="end"
           value={form.end.substring(0,10)}
           onChange={(e) => updateForm({ end: e.target.value })}
         />
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Staff"
           className="btn btn-primary"
         />
       </div>
       <br />
       <form action="/projectcomponents/projectList" >
          <input type="submit" value="Cancel" className="btn btn-primary"/>
        </form>
     </form>
   </div>
 );
}