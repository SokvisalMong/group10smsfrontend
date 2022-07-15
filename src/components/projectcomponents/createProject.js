import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
  project_id: "",
  project_name: "",
  start: "",
  end: "",
  duration: ""
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newProject = { ...form };
 
   await fetch("http://localhost:5000/project/create", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newProject),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ project_id: "", project_name: "", start: "" });
   navigate("/projectcomponents/projectList");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Add New Project</h3>
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
         <label htmlFor="start">Starting Date: </label>
         <input
           type="text"
           className="form-control"
           id="start"
           value={form.start}
           onChange={(e) => updateForm({ start: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="end">End Date: </label>
         <input
           type="text"
           className="form-control"
           id="end"
           value={form.end}
           onChange={(e) => updateForm({ end: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="duration">Duration: </label>
         <input
           type="text"
           className="form-control"
           id="duration"
           value={form.duration}
           onChange={(e) => updateForm({ duration: e.target.value })}
         />
       </div>
       <br />
       <div className="form-group">
         <input
           type="submit"
           value="Create Project"
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