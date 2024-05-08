
import React, { useState } from 'react';
import { Popover } from 'antd';
import "./header.css"
import { Link } from 'react-router-dom';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Headeroptions from './Headeroptions';
import UploadCertificate from '../post/postCard';
import axios from "axios";
import { LOGOUT } from '../../constants/api';
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

function Header() {
  const user = localStorage.getItem("user")
  const obj = JSON.parse(user)
  const name = obj ? (obj.firstName + " " + obj.lastName) : "Profile"
  const [opn, setOpn] = useState(false)
  console.log(name)
  const hide = () => {
    setOpn(false);
  };
  const handleOpnChange = (newOpen) => {
    setOpn(newOpen);
  };
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");

    axios.defaults.withCredentials = true;

    axios.post(LOGOUT, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          navigate(routes.login)
        }
      })
  }
  const handleProfile = (e) => {
    e.preventDefault();
    navigate(routes.profile)
  }
  const handleAccount = (e) => {
    e.preventDefault();
    navigate(routes.updateprofile)
  }

  const [open, setOpen] = React.useState(false);

  const handleOpenChange = React.useCallback((event, isOpen) => {
    setOpen(isOpen);
  }, []);
  return (
    <div className="header">
      <div className="header__left">
        <div className="search">
          <input type="text" className="search__input" placeholder="Search" />
          <button className="search__button">
            <svg className="search__icon" aria-hidden="true" viewBox="0 0 24 24">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
          </button>
        </div>
      </div>

      <div className="header__right">
        <div className="header__right__option1">
          <Link to={routes.home} >
            <img src="https://cdn-icons-png.flaticon.com/128/1946/1946488.png" alt='' />
            <Headeroptions title="Home" />
          </Link>

        </div>
        <div className="header__right__option3">
          <Popover
            content={<div>
              {<UploadCertificate />}
              <a onClick={hide}>Close</a>
            </div>}
            title="Post Certificate"
            trigger="click"
            open={opn}
            onOpenChange={handleOpnChange}
          >
            <img src="https://cdn-icons-png.flaticon.com/128/2907/2907776.png" alt='' />
            <Headeroptions title="Post" />
          </Popover>
        </div>
        <div className="header__right__option2">
          <Dropdown open={open} onOpenChange={handleOpenChange}>
            <MenuButton className="m-2">
              {/* <img src="https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" /> */}
              <Headeroptions title={name} />
            </MenuButton>
            <Menu>
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleAccount}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </div>

    </div>
  )
}

export default Header