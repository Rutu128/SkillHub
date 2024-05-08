import * as React from 'react';
import { useState } from "react";
// import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import { Link } from "react-router-dom";
// import { routes } from "../../constants/routes";
import useInformation from "./useInformation";
import styles from "./InformationForm.module.css";
// import { FileUpload } from 'primereact/fileupload';
import Button1 from '@mui/joy/Button';
import SvgIcon from '@mui/joy/SvgIcon';
import { styled } from '@mui/joy';
// import MultiProjects from "./Multiproject/Multiproject.js";
// import MultiAdd from "./Multi/Multiadd.js";
// import MultiEvents from "./Multievent/Multievents.js";
const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;
const InformationForm = () => {
  const { handleSubmit, onSubmit, register, errors } = useInformation();
  const [image, setImage] = useState("")
  // const [skills, setSkills] = useState([""]);
  // const [domains, setDomains] = useState([""]);
  // const [languages, setlanguages] = useState([""]);
  // const [selectedFile, setSelectedFile] = useState(null);
  // const [projectDescription, setProjectDescription] = useState("");
  // const [events, setEvents] = useState([]);
  // const handleFileChange = (file) => {
  //   setSelectedFile(file);
  // };
  // const handleEventAdd = () => {
  //   setEvents([...events, { name: "", certificate: null }]);
  // };

  // const handleEventRemove = (index) => {
  //   setEvents(events.filter((event, i) => i !== index));
  // };

  // const handleEventChange = (index, value) => {
  //   setEvents(
  //     events.map((event, i) =>
  //       i === index ? { ...event, name: value } : event
  //     )
  //   );
  // };

  // const handleEventCertificateUpload = (index, file) => {
  //   setEvents(
  //     events.map((event, i) =>
  //       i === index ? { ...event, certificate: file } : event
  //     )
  //   );
  // };
  // const handlelanguage=(index,value)=>
  // {
  //   const newlanguage=[...languages];
  //   newlanguage[index]=value;
  //   setlanguages(newlanguage);
  // };

  // const addlanguage=()=>{
  //   if(languages[languages.length-1] !==''){
  //      setlanguages([...languages,'']);
  //   }
  // };

  // const removelanguage=(index)=>{
  //    if(languages.length>1){
  //     const newlanguage=[...languages];
  //     newlanguage.splice(index,1);
  //     setlanguages(newlanguage);
  //    }
  // };
  // const handleChange = (index, value) => {
  //   const newSkills = [...skills];
  //   newSkills[index] = value;
  //   setSkills(newSkills);
  // };
  // const handleAdd = () => {
  //   const lastSkill = skills[skills.length - 1];
  //   if (lastSkill !== '') {
  //     setSkills([...skills, '']);
  //   }
  // };

  // const handleRemove = (index) => {
  //   if (skills.length > 1) {
  //     const newSkills = [...skills];
  //     newSkills.splice(index, 1);
  //     setSkills(newSkills);
  //   }
  // };

  // const handleDomainChange = (index, value) => {
  //   const newDomains = [...domains];
  //   newDomains[index] = value;
  //   setDomains(newDomains);
  // };
  // const handleAddDomain = () => {
  //   if(domains[domains.length-1] !==''){
  //   setDomains([...domains, '']);}
  // };
  // const handleRemoveDomain = (index) => {
  //   if(domains.length>1){
  //   const newDomains = [...domains];
  //   newDomains.splice(index, 1);
  //   setDomains(newDomains);
  //   }
  // }


  return (

    <div className={styles.container_info}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h4>STUDENT INFORMATION</h4>
        {/* <Form.Group >
          <Form.Label>Image</Form.Label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={(event) => handleFileChange(event.target.files)}
           

          />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="avatar">

          <Button1
            component="label"
            role={undefined}
            tabIndex={-1}
            variant="outlined"
            color="neutral"
            startDecorator={
              <SvgIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              </SvgIcon>

            }
          >
            Upload a file
            <VisuallyHiddenInput type="file" accept=".png,.jpg,.jpeg" onChange={(e) => { setImage(e.target.files[0]) }} />
            <img src={image} />
          </Button1>
        </Form.Group>

        <Form.Group className="mb-3" controlId="choice">
          <Form.Label>Placement or Higher study</Form.Label>
          <Form.Select
            {...register("choice")}
            isInvalid={!!errors.choice?.message}
          >
            <option value="placement">Placement</option>
            <option value="higher_study">Higher Study</option>
          </Form.Select>

          <Form.Control.Feedback type="invalid">
            {errors.choice && errors.choice.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="cgpa">
          <Form.Label>CGPA</Form.Label>
          <Form.Control
            placeholder="Enter your CGPA"
            {...register("cgpa")}
            isInvalid={!!errors.cgpa?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cgpa && errors.cgpa.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="personal_email">
          <Form.Label>Personal email</Form.Label>
          <Form.Control
            placeholder="Enter your email address"
            {...register("personal_email")}
            isInvalid={!!errors.personal_email?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.personal_email && errors.personal_email.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            placeholder="Enter your age"
            {...register("age")}
            isInvalid={!!errors.age?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.age && errors.age.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone_no">
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            placeholder="Enter your phone number"
            {...register("phone_no")}
            isInvalid={!!errors.phone_no?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone_no && errors.phone_no.message}
          </Form.Control.Feedback>
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="skill">
          <Form.Label>Skills</Form.Label>
          {skills.map((skill, index) => (
            <div key={index} className="d-flex mb-2">
              <Form.Control
                placeholder="Enter your skills"
                // {...register("skill")}
                 value={skill}
                 onChange={(e) => handleChange(index, e.target.value)}
                isInvalid={!!errors.skill?.message}
              />
              
              <Button
                variant="outline-danger"
                onClick={() => handleRemove(index)}
                className="ms-2"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline-secondary"
            onClick={handleAdd}UU
          >
            Add Skill
          </Button>
          <Form.Control.Feedback type="invalid">
            {errors.skill && errors.skill.message}
          </Form.Control.Feedback>
        </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="skill">
          <Form.Label>Skills</Form.Label>
          <MultiAdd
            name="skill"
            setResumeDetails={onSubmit}
            placeholder="skill"
          />
        </Form.Group> */}

        {/* <Form.Group className="mb-3" controlId="domain">
          <Form.Label>Domain/Technology</Form.Label>
          {domains.map((domain, index) => (
            <div key={index} className="d-flex mb-2">
              <Form.Control
                placeholder="Interested domain"
                value={domain}
                onChange={(e) => handleDomainChange(index, e.target.value)}
                isInvalid={!!errors.domain?.message}
              />
              <Button
                variant="outline-danger"
                onClick={() => handleRemoveDomain(index)}
                className="ms-2"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline-secondary"
            onClick={handleAddDomain}
          >
            Add Domain
          </Button>
          <Form.Control.Feedback type="invalid">np
            {errors.domain && errors.domain.message}
          </Form.Control.Feedback>
        </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="domain">
          <Form.Label>Domain/Technology</Form.Label>
          <MultiAdd
            placeholder="Enter interested domain/technology"
            {...register("domain")}
            isInvalid={!!errors.domain?.message}
            name="domain"
            setResumeDetails={onSubmit}
          />
          <Form.Control.Feedback type="invalid">
            {errors.domain && errors.domain.message}
          </Form.Control.Feedback>
        </Form.Group> */}

        {/* <Form.Group className="mb-3" controlId="language">
          <Form.Label>Language</Form.Label>
          {languages.map((language,index)=>(
          <div key={index} className="d-flex mb-2">
              <Form.Control
                placeholder="Enter known languages"
                value={language}
                onChange={(e) => handlelanguage(index, e.target.value)}
                isInvalid={!!errors.language?.message}
              />
              <Button
                variant="outline-danger"
                onClick={() => removelanguage(index)}
                className="ms-2"
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            variant="outline-secondary"
            onClick={addlanguage}
          >
            Add Language
          </Button>
          <Form.Control.Feedback type="invalid">
            {errors.language && errors.language.message}
          </Form.Control.Feedback>

        </Form.Group> */}
        {/* <Form.Group className="mb-3" controlId="language">
             <Form.Label>Language</Form.Label>
            <MultiAdd name="language" setResumeDetails={onSubmit} placeholder="language" />
                 </Form.Group>
        
                 <Form.Group className="mb-3" controlId="hobby">
             <Form.Label>Hobby</Form.Label>
            <MultiAdd name="hobby" setResumeDetails={onSubmit} placeholder="hobby" />
                 </Form.Group>
        <Form.Group className="mb-3" controlId="events">
  <Form.Label>Event Participations</Form.Label>
  {events.map((event, index) => (
    <div key={index} className="d-flex mb-2">
      <Form.Control
        placeholder="Event Name"
        value={event.name}
        onChange={(e) => handleEventChange(index, e.target.value)}
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(event) => handleEventCertificateUpload(index, event.target.files[0])}
      />
      <Button
        variant="outline-danger"
        onClick={() => handleEventRemove(index)}
        className="ms-2"
      >
        Remove
      </Button>
    </div>
  ))}
  <Button variant="outline-secondary" onClick={handleEventAdd}>
    Add Event
  </Button>
</Form.Group> */}

        {/* <Form.Group className="mb-3" controlId="events">
          <Form.Label>Event Participations</Form.Label>
          <MultiEvents name="events" setResumeDetails={onSubmit} />
        </Form.Group> */}

        {/* <Form.Group className="mb-3" controlId="project">
          <Form.Label>Project</Form.Label>
          <Form.Control
            placeholder="Enter your project name"
            {...register("project")}
            isInvalid={!!errors.project?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.project && errors.project.message}
          </Form.Control.Feedback>
        </Form.Group> */}

        {/* <Form.Group className="mb-3" controlId="projectDescription">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter your project description"
            {...register("projectDescription")}
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            isInvalid={!!errors.projectDescription?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.projectDescription && errors.projectDescription.message}
          </Form.Control.Feedback>
        </Form.Group>  */}
        {/* 
        <Form.Group className="mb-3" controlId="projects">
          <Form.Label>Projects</Form.Label>
          <MultiProjects name="projects" setResumeDetails={onSubmit} />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="linkedin">
          <Form.Label>Linkedin Link</Form.Label>
          <Form.Control
            placeholder="Enter your linkedin link"
            {...register("linkedin")}
            isInvalid={!!errors.linkedin?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.linkedin && errors.linkedin.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="github">
          <Form.Label>Github link</Form.Label>
          <Form.Control
            placeholder="Enter your github link"
            {...register("github")}
            isInvalid={!!errors.github?.message}
          />
          <Form.Control.Feedback type="invalid">
            {errors.github && errors.github.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};
export default InformationForm;
