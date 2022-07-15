import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 let [form, setForm] = useState({
   staff_id: "",
   sex: "",
   age: "",
   first_name: "",
   last_name: ""
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`https://group10smsbackend.vercel.app/information/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const information = await response.json();
     if (!information) {
       window.alert(`Information with id ${id} not found`);
       navigate("/");
       return;
     }     
     setForm({
      staff_id: information.staff_id,
      sex: information.sex,
      age: information.age,
      first_name: information.name.first_name,
      last_name: information.name.last_name
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


   const editedInformation = {
     staff_id: Number(form.staff_id),
     sex: form.sex,
     age: Number(form.age),
     name: {
       first_name: form.first_name,
       last_name: form.last_name
     }
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`https://group10smsbackend.vercel.app/information/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedInformation),
     headers: {
       'Content-Type': 'application/json'
     },
   });

   const id = params.id.toString();
   const response = await fetch(`https://group10smsbackend.vercel.app/information/${params.id.toString()}`);

   if (!response.ok) {
    const message = `An error has occured1: ${response.statusText}`;
    window.alert(message);
    return;
   }
   const information = await response.json();
   if (!information) {
    window.alert(`Information with id ${id} not found`);
    navigate("/");
    return;
   }

   const sid = information.staff_id;
   const sresponse = await fetch(`https://group10smsbackend.vercel.app/staff/staff_id/${sid}`);
   if (!sresponse.ok) {
    const message = `An error has occured69: ${sresponse.statusText}`;
    window.alert(message);
    return;
   }

   const staff = await sresponse.json();
   if (!staff) {
    window.alert(`Staff with staff id ${information.staff_id} not found`);
    navigate("/");
    return;
   }

   navigate(`/informationcomponents/viewInformation/${staff._id}`);
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
  <div>
    <h3>Update Information</h3>
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="first_name">First Name: </label>
        <input
          type="text"
          className="form-control"
          id="first_name"
          value={form.first_name}
          onChange={(e) => updateForm({ first_name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Last Name: </label>
        <input
          type="text"
          className="form-control"
          id="last_name"
          value={form.last_name}
          onChange={(e) => updateForm({ last_name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="sex">Sex: </label>
        <input
          type="text"
          className="form-control"
          id="sex"
          value={form.sex}
          onChange={(e) => updateForm({ sex: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age: </label>
        <input
          type="text"
          className="form-control"
          id="age"
          value={form.age}
          onChange={(e) => updateForm({ age: e.target.value })}
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