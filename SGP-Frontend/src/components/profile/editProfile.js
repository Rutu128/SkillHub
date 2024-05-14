import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import styles from "./Profileupdate.css";
// import { SocialIcon } from 'react-social-icons';
import axios from "axios";
import { ADDPROJECT, ADDSKILL, CHANGECGPA, GETPROJECTS, GETSKILLS } from "../../constants/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { routes } from "../../constants/routes";
// import { Margin } from "@mui/icons-material";


let Skills = [];
let Projects = [];

const Profileupdate = () => {
    const getSkills = async () => {

        axios.defaults.withCredentials = true;

        const res = await axios.get(GETSKILLS).catch((err) => {
            if (err.response.status === 401) {
                toast.error("Please Login")
                navigate(routes.login)
            }
            toast.error(err);
        })
        // console.log(res.data.data)
        Skills = res.data.data  
        let skillName = [];
        Skills.forEach(skill => {
            skillName.push(skill.name);
        })
        setSkills(skillName);
    }
    const getProjects = async () => {

        axios.defaults.withCredentials = true;

        const res = await axios.get(GETPROJECTS).catch((err) => {
            if (err.response.status === 401) {
                toast.error("Please Login")
                navigate(routes.login)
            }
            toast.error(err);
        })
        console.log("project",res.data.data)
        Projects = res.data.data
        console.log(Projects)
        setProjects(Projects)

    }
    useEffect(() => {
        getSkills();
        // console.log(Skills)
        getProjects();
    }, [])

    const navigate = useNavigate()

    // Skills = getSkills();
    // console.log("skill",Skills)
    // Projects = getProjects();
    const [editedData, setEditedData] = useState({});
    const [editedSkill, setEditedSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ title: "", description: "", link: "" })

    const handleChange = (e) => {
        setEditedData(e.target.value);
    };

    const handleSkillChange = (e) => {
        setEditedSkill(e.target.value);
    };

    const handleAddSkill = () => {
        if (editedSkill.trim() !== "") {
            setSkills([...skills, editedSkill]);
            setEditedSkill("");
        }
    };

    const handleRemoveSkill = (index) => {
        const newSkills = [...skills];
        newSkills.splice(index, 1);
        setSkills(newSkills);
    };

    const handleAddProject = (e) => {
        // const name = e.target.name;
        // const value = e.target.value;
        // setNewProject((preValues) => {
        //  return   {...preValues,
        //     [name]: value,}
        // })
        setProjects([...projects, { title: "", description: "", link: "" }]);
    };

    const handleRemoveProject = (index) => {
        const newProjects = [...projects];
        newProjects.splice(index, 1);
        setProjects(newProjects);
    };

    const handleProjectTitleChange = (index, e) => {
        const newProjects = [...projects];
        newProjects[index].title = e.target.value;
        setProjects(newProjects);
    };

    const handleProjectDescriptionChange = (index, e) => {
        const newProjects = [...projects];
        newProjects[index].description = e.target.value;
        setProjects(newProjects);
    };

    const handleProjectLinkChange = (index, e) => {
        const newProjects = [...projects];
        newProjects[index].link = e.target.value;
        setProjects(newProjects);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Edited Data:", editedData);
        console.log("Edited Skills:", skills);
        axios.defaults.withCredentials = true;


        await axios.post(ADDSKILL, { skill: skills }, { withCredentials: true }).then((res) => {
            if (res.status === 200) {
                toast.success("Skill Added")
            }
        }).catch((err) => {
            toast.error(err)
        })
        await axios.post(ADDPROJECT, { project: projects }, { withCredentials: true }).then((res) => {
            if (res.status === 200) {
                toast.success("Project Added")
            }
        }).catch((err) => {
            toast.error(err)
        })

        await axios.post(CHANGECGPA, editedData).then((res) => {
            if (res.status === 200) {
                toast.success("SuccesFully Edited")
            }
        }).catch((err) => {
            toast.error(err)
        })
        console.log("Edited Projects:", projects);
    };

    return (
        <Form className="profile-update-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Edit CGPA</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="10"
                    value={editedData}
                    onChange={handleChange}
                    min={1}
                    max={10}
                />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Edit Domain/Technology</Form.Label>
                <div>

                    {
                        (Array.isArray(skills) ? skills : []).length > 0 && (Array.isArray(skills) ? skills : []).map((skill) => {

                            return (
                                <div key={skill._id} className="skill" style={{ margin: "10px 0px" }}>
                                    {skill}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRemoveSkill(skill._id)}
                                        className={styles.removeButton}
                                        style={{ margin: "0px 10px" }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )
                        })}
                    {/* {skills.map((skill, index) => (
                        <div key={index}>
                            {skill}
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveSkill(index)}
                                className={styles.removeButton}
                            >
                                Remove
                            </Button>
                        </div>
                    ))} */}
                </div>
                <Form.Control
                    type="text"
                    placeholder="Java,c++,Python,Networking"
                    value={editedSkill}
                    onChange={handleSkillChange}
                />
                <Button variant="primary" onClick={handleAddSkill} size="sm">
                    Add Skill
                </Button>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Edit Projects</Form.Label>
                <div>
                    {/* {

                        (Array.isArray(projects) ? projects : []).length > 0 && (Array.isArray(projects) ? projects : []).map(((project) => {
                            return (
                                <div className="project" key={project._id}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Project Title"
                                        value={project.title}
                                        onChange={(e) => handleProjectTitleChange(project._id, e)}
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="Project Description"
                                        value={project.description}
                                        onChange={(e) => handleProjectDescriptionChange(project._id, e)}
                                    />
                                    <Form.Control
                                        type="text"
                                        placeholder="Project Link"
                                        value={project.link}
                                        onChange={(e) => handleProjectLinkChange(project._id, e)}
                                    />
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRemoveProject(project._id)}
                                        className={styles.removeButton}
                                    >
                                        Remove
                                    </Button>

                                </div>

                            )
                        }))
                    } */}
                    {projects.map((project, index) => (
                        <div key={index}>
                            <Form.Control
                                type="text"
                                placeholder="Project Title"
                                value={project.title}
                                onChange={(e) => handleProjectTitleChange(index, e)}
                            />
                            <Form.Control
                                type="text"
                                placeholder="Project Description"
                                value={project.description}
                                onChange={(e) => handleProjectDescriptionChange(index, e)}
                            />
                            <Form.Control
                                type="text"
                                placeholder="Project Link"
                                value={project.link}
                                onChange={(e) => handleProjectLinkChange(index, e)}
                            />
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleRemoveProject(index)}
                                className={styles.removeButton}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
                <Button variant="primary" onClick={handleAddProject} size="sm">
                    Add Project
                </Button>
            </Form.Group>
            <br></br>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form >
    );
};

export default Profileupdate;