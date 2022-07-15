import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   dept_id: "",
   dept_name: "",
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
   const newDepartment = { ...form };
 
   await fetch("http://localhost:5000/department/create", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newDepartment),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ dept_id: "", dept_name: "" });
   navigate("/departmentcomponents/departmentList");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
  <div>
    <h3>Create Department</h3>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="dept_id">Department ID: </label>
        <input
          type="text"
          className="form-control"
          id="dept_id"
          value={form.dept_id}
          onChange={(e) => updateForm({ dept_id: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="dept_name">Department Name: </label>
        <input
          type="text"
          className="form-control"
          id="dept_name"
          value={form.dept_name}
          onChange={(e) => updateForm({ dept_name: e.target.value })}
        />
      </div>
      <br />

      <div className="form-group">
        <input
          type="submit"
          value="Create Department"
          className="btn btn-primary"
        />
      </div>
      <br />
      <form action="/departmentcomponents/departmentList" >
          <input type="submit" value="Cancel" className="btn btn-primary"/>
        </form>
    </form>
  </div>
);
}