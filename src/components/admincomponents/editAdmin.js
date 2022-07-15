import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   admin_id: "",
   username: "",
   email: "",
   password: "",
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://g10sms.herokuapp.com/admin/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const admin = await response.json();
     if (!admin) {
       window.alert(`Admin with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm({ admin_id: admin.admin_id, username: admin.login.username, email: admin.login.email, password: admin.login.password});
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
   const editedAdmin = {
     admin_id: form.admin_id,
     username: form.username,
     email: form.email,
     password: form.password
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`https://g10sms.herokuapp.com/admin/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedAdmin),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/admincomponents/adminList");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Admin</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="admin_id">Admin ID: </label>
         <input
           type="text"
           className="form-control"
           id="admin_id"
           value={form.admin_id}
           onChange={(e) => updateForm({ admin_id: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="username">Username: </label>
         <input
           type="text"
           className="form-control"
           id="username"
           value={form.username}
           onChange={(e) => updateForm({ username: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="email">Email: </label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password: </label>
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
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
       <br />
       <form action="/admincomponents/adminList" >
          <input type="submit" value="Cancel" className="btn btn-primary"/>
        </form>
     </form>
   </div>
 );
}