import React from 'react';

import {  List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, ShoppingBag,Logout } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutAction } from '../../../redux/slice/usersSlice';



const AdminSidebar = () => {
  const userAuth = useSelector((state) => state.userReducer.userAuth);
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutFn = async () => {
    await dispatch(logoutAction());
    history.push("/login");
  };

  return (
    <section className="sidebar">
      <Link to="/admin/dashboard" className="brand">
       
        <span className="text">Admin Panel</span>
      </Link>
      <List>
      <Link to="/admin/dashboard" className="link_options">
      <ListItem button className="active"  >
          <ListItemIcon>
            <Dashboard className='icons_label' />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>
       <Link to="/admin/service-list" className="link_options">
       <ListItem button  >
          <ListItemIcon>
            <ShoppingBag className='icons_label' />
          </ListItemIcon>
          <ListItemText primary="Manage Services" />
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

export default AdminSidebar;
