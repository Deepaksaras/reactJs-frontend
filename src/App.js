import "./App.css";
import {
BrowserRouter as Router,

Route
} from "react-router-dom";

import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import AddEmployee from "./Components/AddEmployee";
import ViewEmployee from "./Components/ViewEmployee";
import EmployeeAlocation from "./Components/EmployeeAlocation";
import EditEmployee from "./Components/EditEmployee";



function App() {
return (
	<>

	<Router>
	  <Route path="/login" component={Login} />
      <Route  path="/dashboard" component={Dashboard} />
      <Route path="/addemployee" component={AddEmployee} />
	  <Route path="/viewemplyee" component={ViewEmployee} />
	  <Route path="/employeeAlocation" component={EmployeeAlocation} />
	  <Route path="/editEmployee/:id" component={EditEmployee} />
	  
	</Router>
	</>
);
}

export default App;
