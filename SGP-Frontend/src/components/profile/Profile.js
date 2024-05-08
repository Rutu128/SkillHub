import { React, useEffect } from "react";
import axios from "axios";
// import { useState } from "react";
// import { Navbar, Form, FormControl, Button } from "react-bootstrap";
// import { routes } from "../../constants/routes";
// import { Link } from "react-router-dom";
// import styles from "./Profile.module.css";
import { SocialIcon } from 'react-social-icons'
import { PROFILEDATA } from "../../constants/api";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";

const Profile = ({ data, imageContainerDisplay }) => {
  // var data1;
  const navigate = useNavigate()
  async function getProfile() {
    axios.defaults.withCredentials = true;
    await axios.get(PROFILEDATA, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.status)
          // console.log(res.data.data)
          localStorage.setItem("info", JSON.stringify(res.data?.data.info))
          localStorage.setItem("skill", JSON.stringify(res.data?.data.skill))
          localStorage.setItem("project", JSON.stringify(res.data?.data.project))
        }
      }).catch((err) => {
        if (err.response.status === 401) {
          toast.error("Session Timeout")
          navigate(routes.login)
        }
        else
          toast.error(err.response.message)
      })
  }
  useEffect(() => {
    getProfile();

  }, [])
  const user = localStorage.getItem("user");
  const User = JSON.parse(user)
  const info = localStorage.getItem("info");
  const Info = JSON.parse(info)
  const skill = localStorage.getItem("skill");
  const Skill = JSON.parse(skill);
  const project = localStorage.getItem("project");
  const Project = JSON.parse(project);
  const age = Info.age ? Info.age : 18

  // console.log("data", data1)
  return (
    // <div className="profile-page">
    //   <div className="header">
    //     <Form>
    //       <FormControl type="text" placeholder="Search" className="mr-sm-2" />
    //       <Button variant="outline-primary">Search</Button>
    //     </Form>
    //   </div>
    //   <div>

    //   </div>
    // </div>
    <div>
      <>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css"
          integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA="
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/ti-icons@0.1.2/css/themify-icons.css"
        />
        <div className="container  p-3">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
              <div className="card border-0 shadow d-flex justify-content-center align-items-center">
                <img
                  src="https://www.bootdey.com/img/Content/avatar/avatar6.png"
                  alt="..."
                  className="rounded-circle img-thumbnail"
                  style={{ width: "150px", height: "150px" }}
                />
                <div className="card-body p-1-9 p-xl-5">
                  <div className="mb-4">
                    <h3 className="h4 mb-0">{User.firstName + " " + User.lastName}</h3>
                    <span className="text-primary">Age :{age} </span>
                  </div>
                  <ul className="list-unstyled mb-4">
                    <li className="mb-3">
                      <a href="">
                        <i className="far fa-envelope display-25 me-3 text-secondary" />
                        {Info.persnoal_email}
                      </a>
                    </li>
                    <li className="mb-3">
                      <a href="#!">
                        <i className="fas fa-mobile-alt display-25 me-3 text-secondary" />
                        +91 {Info.phone}
                      </a>
                    </li>
                  </ul>
                  <ul className="social-icon-style2 ps-0">
                    <SocialIcon className="m-3" url={Info.github} />
                    <SocialIcon url={Info.linkedin} />
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="ps-lg-1-6 ps-xl-5">
                <div className="mb-5 wow fadeIn">
                  <div className="card border-0 shadow d-flex justify-content-center align-items-center">
                    <div className="text-start mb-1-6 wow fadeIn">
                      <h3 className="h3 mb-0 text-primary">Domain/Technology</h3>
                    </div>
                    <ul className="domain-list">
                      <li><h5>Web devlopment</h5></li>
                      <li><h5>Cloud</h5></li>
                      <li><h5>Security</h5></li>
                    </ul>
                  </div>
                </div>
                <div className="card border-0 shadow d-flex justify-content-center align-items-center">
                  <div className="mb-5 wow fadeIn">
                    <div className="text-start mb-1-6 wow fadeIn">
                      <h2 className="mb-0 text-primary">Event</h2>
                    </div>
                    <div className="row mt-n4">
                      <div className="col-sm-6 col-xl-4 mt-4">
                        <div className="card text-center border-0 rounded-3">
                          <div className="card-body">
                            <i className="ti-bookmark-alt icon-box medium rounded-3 mb-4" />
                            <h3 className="h5 mb-0">Project Name</h3>
                            <p className="mb-0">
                              AWS
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="col-sm-6 col-xl-4 mt-4">
                        <div className="card text-center border-0 rounded-3">
                          <div className="card-body">
                            <i className="ti-medall-alt icon-box medium rounded-3 mb-4" />
                            <h3 className="h5 mb-3">Discription</h3>
                            <p className="mb-0">
                              About 20 years of experience and professional in signage
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </>

    </div>
  );
};

export default Profile;