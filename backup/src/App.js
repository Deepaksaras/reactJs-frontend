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
function App() {
return (
	<>

	<Router>
	
   
      <Route  path="/dashboard" component={Dashboard} />
      <Route path="/addemployee" component={AddEmployee} />
	  <Route path="/viewemplyee" component={ViewEmployee} />
      <Route path="/login" component={Login} />
	  <Route path="/employeeAlocation" component={EmployeeAlocation} />
	  
		
		
	</Router>
	</>
);
}

export default App;
