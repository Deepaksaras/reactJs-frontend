import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from './../img/logo.svg'
import avatar from './../img/avatar-male.png'
const Sidebar = () => {
  
 
  return (
    <div>
      <div className="newsidebar">
        <ul className="mt-2">
          <li><NavLink to="/dashboard"><img src={logo} className="avatar" alt="avatar" /></NavLink></li>
          
          <li>
            <NavLink to="/addemployee" className="tooltip-right" data-tooltip="Employee Management"  >
              <i className="lnil lnil-network" />
            </NavLink>
          </li>
          <li><NavLink to="/viewemplyee" className="tooltip-right" data-tooltip="Downloads"><i className="lnil lnil-download" /></NavLink></li>
          <li><NavLink to="/employeeAlocation" className="tooltip-right" data-tooltip="Settings"><i className="lnil lnil-cog" /></NavLink></li>
          <li><NavLink to="/addAttendance" className="tooltip-right" data-tooltip="Logs"><i className="lnil lnil-laptop-alt-switch" /></NavLink></li>
        </ul>
        <ul className="bottom-menu">
          <li>
            <div className="dropdown">
              <NavLink className="dropdown-toggle" to="#" role="button" id="profileLinks" data-toggle="dropdown"><img src={avatar} alt="" className="avatar rounded-circle" /></NavLink>
              <div className="dropdown-menu" aria-labelledby="profileLinks">
                <NavLink className="dropdown-item" to="#"><i className="lnil lnil-user-alt-2 icon" />Profile</NavLink>
                <NavLink className="dropdown-item" to="#"><i className="lnil lnil-lock icon" />Change Password</NavLink>
                <div className="dropdown-divider" />
                <button type="button" className="btn btn-primary btn-block"><i className="lnil lnil-exit icon" />Logout</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;
