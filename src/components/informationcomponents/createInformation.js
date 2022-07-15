import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   sex: "",
   age: "",
   first_name: "",
   last_name: "",
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
   const newInformation = { ...form };
 
   await fetch("https://group10smsbackend.vercel.app/information/create", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newInformation),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ sex: "", age: "", first_name: "", last_name: "", });
   navigate("/viewInformation");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="first_name">First Name</label>
         <input
           type="text"
           className="form-control"
           id="first_name"
           value={form.first_name}
           onChange={(e) => updateForm({ first_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="last_name">Last Name</label>
         <input
           type="text"
           className="form-control"
           id="last_name"
           value={form.last_name}
           onChange={(e) => updateForm({ last_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="sex">Sex</label>
         <input
           type="text"
           className="form-control"
           id="sex"
           value={form.sex}
           onChange={(e) => updateForm({ sex: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="age">Age</label>
         <input
           type="text"
           className="form-control"
           id="age"
           value={form.age}
           onChange={(e) => updateForm({ age: e.target.value })}
         />
       </div>
        <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}