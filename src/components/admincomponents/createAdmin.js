import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Create() {
 const [form, setForm] = useState({
   admin_id: "",
   username: "",
   email: "",
   password: ""
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
   const newAdmin = { ...form };
 
   await fetch("http://localhost:5000/admin/create", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newAdmin),
   })
   .catch(error => {
     window.alert(error);
     return;
   });


   setForm({ admin_id: "", username: "", email: "", password: "" });
   navigate("/admincomponents/adminList");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Admin</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="admin_id">ID</label>
         <input
           type="text"
           className="form-control"
           id="admin_id"
           value={form.admin_id}
           onChange={(e) => updateForm({ admin_id: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="username">Username</label>
         <input
           type="text"
           className="form-control"
           id="username"
           value={form.username}
           onChange={(e) => updateForm({ username: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="email">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="password"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <br />
       <div className="form-group">
         <input
           type="submit"
           value="Create Admin"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}