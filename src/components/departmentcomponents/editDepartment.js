import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   dept_id: "",
   dept_name: "",
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://group10smsbackend-jkbr8ai6g-smong-paragoniued.vercel.app/department/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const department = await response.json();
     if (!department) {
       window.alert(`Department with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(department);
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
   const editedDepartment = {
     dept_id: form.dept_id,
     dept_name: form.dept_name,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`https://group10smsbackend-jkbr8ai6g-smong-paragoniued.vercel.app/department/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedDepartment),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/departmentcomponents/departmentList");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Department</h3>
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
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}