import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   staff_id: "",
   staff_mobile: "",
   staff_salary: "",
   dept_id: ""
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://g10sms.herokuapp.com/staff/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const staff = await response.json();
     if (!staff) {
       window.alert(`Staff with id ${id} not found`);
       navigate("/");
       return;
     }
     
     setForm(staff);
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
   const editedStaff = {
     staff_id: Number(form.staff_id),
     staff_mobile: form.staff_mobile,
     staff_salary: Number(form.staff_salary),
     dept_id: form.dept_id
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`https://g10sms.herokuapp.com/staff/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedStaff),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/staffcomponents/staffList");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Staff ID: {form.staff_id}</h3>
     <form onSubmit={onSubmit}>
     
       <div className="form-group">
         <label htmlFor="staff_mobile">Mobile: </label>
         <input
           type="text"
           className="form-control"
           id="staff_mobile"
           value={form.staff_mobile}
           onChange={(e) => updateForm({ staff_mobile: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="staff_salary">Salary: </label>
         <input
           type="text"
           className="form-control"
           id="staff_salary"
           value={form.staff_salary}
           onChange={(e) => updateForm({ staff_salary: e.target.value })}
         />
       </div>
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
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Staff"
           className="btn btn-primary"
         />
       </div>
       <br />
       <form action="/staffcomponents/staffList" >
          <input type="submit" value="Cancel" className="btn btn-primary"/>
        </form>
     </form>
   </div>
 );
}