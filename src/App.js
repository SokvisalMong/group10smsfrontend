import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes} from 'react-router-dom'
import Navbar from './components/navbar'
import StaffList from './components/staffcomponents/staffList'
import DepartmentList from './components/departmentcomponents/departmentList'
import ProjectList from './components/projectcomponents/projectList'
import InformationList from './components/informationcomponents/informationList'
import AdminList from './components/admincomponents/adminList'
import HomePage from './components/homePage'
import EditStaff from './components/staffcomponents/editStaff'
import CreateStaff from'./components/staffcomponents/createStaff'
import EditProject from './components/projectcomponents/editProject'
import CreateProject from './components/projectcomponents/createProject'
import ViewInformation from './components/informationcomponents/viewInformation'
import EditInformation from './components/informationcomponents/editInformation'
import CreateInformation from './components/informationcomponents/createInformation'
import AddDepartment from './components/departmentcomponents/addDepartment'
import EditDepartment from './components/departmentcomponents/editDepartment'
import CreateDepartment from './components/departmentcomponents/createDepartment'
import EditAdmin from './components/admincomponents/editAdmin'
import CreateAdmin from './components/admincomponents/createAdmin'
import AddProject from './components/projectcomponents/addProject'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/staffcomponents/staffList" element={<StaffList />}/>
        <Route path="/staffcomponents/editStaff/:id" element={< EditStaff />}/>
        <Route path="/staffcomponents/createStaff" element={< CreateStaff />}/>
        <Route path="/departmentcomponents/departmentList" element={<DepartmentList/>}/>
        <Route path="/departmentcomponents/createDepartment" element={< CreateDepartment />}/>
        <Route path="/departmentcomponents/addDepartment/:id" element={<AddDepartment/>}/>
        <Route path="/departmentcomponents/editDepartment/:id" element={< EditDepartment />}/>
        <Route path="/projectcomponents/projectList" element={<ProjectList />}/>
        <Route path="/projectcomponents/addProject/:id" element={<AddProject/>}/>
        <Route path="/projectcomponents/editProject/:id" element={< EditProject />}/>
        <Route path="/projectcomponents/createProject" element={< CreateProject />}/>
        <Route path="/informationcomponents/createInformation" element={< CreateInformation />}/>
        <Route path="/informationcomponents/editInformation/:id" element={< EditInformation />}/>
        <Route path="/informationcomponents/informationList" element={< InformationList />}/>
        <Route path="/informationcomponents/viewInformation/:id" element={<ViewInformation/>}/>
        <Route path="/admincomponents/adminList" element={< AdminList />}/>
        <Route path="/admincomponents/editAdmin/:id" element={< EditAdmin />}/>
        <Route path="/admincomponents/createAdmin" element={< CreateAdmin />}/>
      </Routes> 
    </div>
  );
}

export default App;
