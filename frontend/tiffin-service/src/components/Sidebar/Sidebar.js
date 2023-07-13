import React from 'react';

import {  List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, ShoppingBag, DonutLarge, Logout } from '@mui/icons-material';
import { Link } from "react-router-dom";
import './Sidebar.css'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAction } from '../../redux/slice/usersSlice';


const Sidebar = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const logoutFn = async () => {
    await dispatch(logoutAction());
    history.push("/login");
  };

  return (
    <section className="sidebar">
      <Link to="/service/dashboard" className="brand">
       
        <span className="text">Service Provider</span>
      </Link>
      <List>
      <Link to="/service/dashboard" className="link_options">
      <ListItem button className="active"  >
          <ListItemIcon>
            <Dashboard className='icons_label' />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
       <Link to="/service/create-service" className="link_options">
       <ListItem button  >
          <ListItemIcon>
            <ShoppingBag className='icons_label' />
          </ListItemIcon>
          <ListItemText primary="Create Service" />
        </ListItem>
       </Link>
      <Link to="#"  className="link_options">
      <ListItem button  >
          <ListItemIcon>
            <DonutLarge className='icons_label' />
          </ListItemIcon>
          <ListItemText primary="Update Service" />
        </ListItem>
      </Link>
     
      <ListItem button  onClick={logoutFn}>
          <ListItemIcon>
            <Logout className='icons_label' />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
     
        
   
      </List>
    </section>
  );
}

export default Sidebar;
