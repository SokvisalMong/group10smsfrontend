import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   staff_id: "",
   staff_mobile: "",
   staff_salary: "",
   dept_id: ""
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
   const newStaff = { ...form };
 
   await fetch("https://g10sms.herokuapp.com/staff/create", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newStaff),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   await fetch("https://g10sms.herokuapp.com/information/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify(newStaff),
   })
   .catch(error => {
    window.alert(error);
    return;
   })
 
   setForm({ staff_id: "", staff_mobile: "", staff_salary: "", dept_id: "" });
   navigate("/staffcomponents/staffList");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Staff</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="staff_id">Staff ID</label>
         <input
           type="text"
           className="form-control"
           id="staff_id"
           value={form.staff_id}
           onChange={(e) => updateForm({ staff_id: e.target.value })}
         />
       </div>
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
         <label htmlFor="staff_salary">Staff Salary</label>
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
           value="Create Staff"
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