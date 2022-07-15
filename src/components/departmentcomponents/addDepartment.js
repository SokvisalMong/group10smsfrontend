import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
	const [form, setForm] = useState({
		dept_id: "",
		dept_name: "",
		newStaff: "",
	});
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchData() {
			const id = params.id.toString();
			const response = await fetch(
				`https://group10smsbackend.vercel.app/department/${params.id.toString()}`
			);

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
		const thing = {
			staff: Number(form.newStaff),
		};
		// This will send a post request to update the data in the database.
		await fetch(`https://group10smsbackend.vercel.app/department/push/${params.id}`, {
			method: "POST",
			body: JSON.stringify(thing),
			headers: {
				"Content-Type": "application/json",
			},
		});

		navigate("/departmentcomponents/departmentList");
	}

	// This following section will display the form that takes input from the user to update the data.
	return (
		<div>
			<h3>Adding Staff to Department {form.dept_id}</h3>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="staffs">Staff ID: </label>
					<input
						type="text"
						className="form-control"
						id="staffs"
						value={form.newStaff}
						onChange={(e) => updateForm({ newStaff: e.target.value })}
					/>
				</div>
				<div className="form-group">
					<input type="submit" value="Add Staff" className="btn btn-primary" />
				</div>
			</form>
		</div>
	);
}
