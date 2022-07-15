import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Department = (props) => (
	<tr>
		<td>{props.department.dept_id}</td>
		<td>{props.department.dept_name}</td>
		<td>{props.department.staffs.length}</td>
		<td>
			<Link
				classname="btn btn-link"
				to={`/departmentcomponents/addDepartment/${props.department._id}`}
			>Add</Link> |
      <Link
				className="btn btn-link"
				to={`/departmentcomponents/editDepartment/${props.department._id}`}
			>Edit</Link> |
			<button
				className="btn btn-link"
				onClick={() => {
					props.deleteDepartment(props.department._id);
				}}
			>Delete
			</button>
		</td>
	</tr>
);

export default function DepartmentList() {
	const [departments, setDepartments] = useState([]);

	// This method fetches the records from the database.
	useEffect(() => {
		async function getDepartments() {
			const response = await fetch(`https://group10smsbackend.vercel.app/department/`);

			if (!response.ok) {
				const message = `An error occurred: ${response.statusText}`;
				window.alert(message);
				return;
			}

			const departments = await response.json();
			setDepartments(departments);
		}

		getDepartments();

		return;
	}, [departments.length]);

	// This method will delete a department
	async function deleteDepartment(id) {
		await fetch(`https://group10smsbackend.vercel.app/department/delete/${id}`, {
			method: "DELETE",
		});

		const newDepartments = departments.filter((el) => el._id !== id);
		setDepartments(newDepartments);
	}

	// This method will map out the departments on the table
	function departmentList() {
		return departments.map((department) => {
			return (
				<Department
					department={department}
					deleteDepartment={() => deleteDepartment(department._id)}
					key={department._id}
				/>
			);
		});
	}

	// This following section will display the table with the department of individuals.
	return (
		<div>
			<Table>
				<tr>
					<th>
						<h3>Department List</h3>
					</th>
					<th>
						<Link to={`/departmentcomponents/createDepartment/`}>
							<Button variant="outline-dark">
								Create Department
							</Button>
						</Link>
					</th>
				</tr>
			</Table>
			<Table striped>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name of Department</th>
						<th>Number of Staffs</th>
					</tr>
				</thead>
				<tbody>{departmentList()}</tbody>
			</Table>
		</div>
	);
}
