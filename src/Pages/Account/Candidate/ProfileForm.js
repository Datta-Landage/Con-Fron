import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CandidateProfile({ data }) {
  useEffect(() => {
    setworkHistory([
      {
        jobTitle: data?.workHistory[0]?.jobTitle || "",
        companyName: data?.workHistory[0]?.companyName || "",
        startDate: data?.workHistory[0]?.startDate || "",
        endDate: data?.workHistory[0]?.endDate || "",
        description: data?.workHistory[0]?.Description || "",
      },
    ]);

    setEducationHistory([
      {
        title: data?.educationHistory?.[0]?.title || "",
        school: data?.educationHistory?.[0]?.school || "",
        year: data?.educationHistory?.[0]?.year || "",
      },
    ]);

    setprojects([{ title: "project", description: "" }]);
    setyearsOfExperience(data?.yearsOfExperience);
    setPreferedRole(data?.prefferedRole?.[0]?.slice(1, -1));
    setSummary(data?.summary);
    setSoftSkills(`
    ${data?.softSkills?.[0]},
    ${data?.softSkills?.[1]}`);

    setDomainSkills(`
  ${data?.domainSkills?.[0]},
  ${data?.domainSkills?.[1]}`);

    settoolsAndTechnology(
      `
    ${data?.toolsAndTechnology?.[0]},
    ${data?.toolsAndTechnology?.[1]}`
    );
  }, [data]);

  //-------------------------------------Employment History-----------------------------------\\

  const [workHistory, setworkHistory] = useState([
    {
      jobTitle: data?.workHistory[0]?.jobTitle,
      companyName: data?.workHistory[0]?.companyName,
      startDate: data?.workHistory[0]?.startDate,
      endDate: data?.workHistory[0]?.endDate,
      description: data?.workHistory[0]?.Description,
    },
  ]);

  const handleAddEmployment = () => {
    setworkHistory([
      ...workHistory,
      {
        jobTitle: "",
        companyName: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleEmploymentChange = (index, field, value) => {
    const updatedEmployment = [...workHistory];
    updatedEmployment[index][field] = value;
    setworkHistory(updatedEmployment);
  };

  //------------------------------------------------------------------------------------------\\

  //------------------------------------ Education History------------------------------------\\

  const [educationHistory, setEducationHistory] = useState([
    {
      title: data?.educationHistory?.[0]?.title,
      school: data?.educationHistory?.[0]?.school,
      year: data?.educationHistory?.[0]?.year,
    },
  ]);

  const handleAddEducation = () => {
    setEducationHistory([
      ...educationHistory,
      { title: data?.educationHistory?.[0]?.title, school: "", year: "" },
    ]);
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...educationHistory];
    updatedEducation[index][field] = value;
    setEducationHistory(updatedEducation);
  };

  //------------------------------------------------------------------------------------------\\

  //--------------------------------------Projects--------------------------------------------\\

  const [projects, setprojects] = useState([
    { title: "project", description: "" },
  ]);

  const handleAddProject = () => {
    setprojects([...projects, { title: "", description: "" }]);
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setprojects(updatedProjects);
  };

  //------------------------------------------------------------------------------------------\\

  //----------------------------------------Skills--------------------------------------------\\

  const [softSkills, setSoftSkills] = useState(`
    ${data?.softSkills?.[0]},
    ${data?.softSkills?.[1]}`);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState([]);
  const [matchingSoftSkills, setMatchingSoftSkills] = useState([]);

  const [domainSkills, setDomainSkills] = useState(`
  ${data?.domainSkills?.[0]},
  ${data?.domainSkills?.[1]}`);
  const [selectedDomainSkills, setSelectedDomainSkills] = useState([]);
  const [matchingDomainSkills, setMatchingDomainSkills] = useState([]);

  const [toolsAndTechnology, settoolsAndTechnology] = useState(
    `
    ${data?.toolsAndTechnology?.[0]},
    ${data?.toolsAndTechnology?.[1]}`
  );
  const [selectedtoolsAndTechnology, setSelectedtoolsAndTechnology] = useState(
    []
  );
  const [matchingtoolsAndTechnology, setMatchingtoolsAndTechnology] = useState(
    []
  );

  const specificSoftSkills = [
    "Communication",
    "Problem Solving",
    "Teamwork",
    "Adaptability",
    "Creativity",
  ];
  const specificDomainSkills = [
    "Java",
    "Python",
    "Web Development",
    "Data Analysis",
    "Machine Learning",
  ];
  const specifictoolsAndTechnology = [
    "React",
    "Node.js",
    "Databases",
    "Git",
    "Visual Studio Code",
  ];

  const handleSoftSkillsChange = (e) => {
    const inputValue = e.target.value;
    setSoftSkills(inputValue);

    // Filter for soft skill
    const filteredSkills = specificSoftSkills.filter((skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase())
    );

    setMatchingSoftSkills(filteredSkills);
  };

  const handleDomainSkillsChange = (e) => {
    const inputValue = e.target.value;
    setDomainSkills(inputValue);

    // Filter for domain skills
    const filteredSkills = specificDomainSkills.filter((skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase())
    );

    setMatchingDomainSkills(filteredSkills);
  };

  const handletoolsAndTechnologyChange = (e) => {
    const inputValue = e.target.value;
    settoolsAndTechnology(inputValue);

    // Filter for tools/technology
    const filteredSkills = specifictoolsAndTechnology.filter((skill) =>
      skill.toLowerCase().includes(inputValue.toLowerCase())
    );

    setMatchingtoolsAndTechnology(filteredSkills);
  };

  const handleSkillClick = (selectedSkill, skillType) => {
    if (skillType === "softSkills") {
      setSoftSkills("");
      setMatchingSoftSkills([]);
      setSelectedSoftSkills([...selectedSoftSkills, selectedSkill]);
    } else if (skillType === "domainSkills") {
      setDomainSkills("");
      setMatchingDomainSkills([]);
      setSelectedDomainSkills([...selectedDomainSkills, selectedSkill]);
    } else if (skillType === "toolsAndTechnology") {
      settoolsAndTechnology("");
      setMatchingtoolsAndTechnology([]);
      setSelectedtoolsAndTechnology([
        ...selectedtoolsAndTechnology,
        selectedSkill,
      ]);
    }
  };

  const handleRemoveSkill = (skillToRemove, skillType) => {
    if (skillType === "softSkills") {
      const updatedSkills = selectedSoftSkills.filter(
        (skill) => skill !== skillToRemove
      );
      setSelectedSoftSkills(updatedSkills);
    } else if (skillType === "domainSkills") {
      const updatedSkills = selectedDomainSkills.filter(
        (skill) => skill !== skillToRemove
      );
      setSelectedDomainSkills(updatedSkills);
    } else if (skillType === "toolsAndTechnology") {
      const updatedSkills = selectedtoolsAndTechnology.filter(
        (skill) => skill !== skillToRemove
      );
      setSelectedtoolsAndTechnology(updatedSkills);
    }
  };

  //------------------------------------------------------------------------------------------\\

  //----------------------------------------Basic Data----------------------------------------\\

  const [prefferedRole, setPreferedRole] = useState(data?.prefferedRole);
  const [yearsOfExperience, setyearsOfExperience] = useState(
    data?.yearsOfExperience
  );
  const [summary, setSummary] = useState(data?.summary);
  const [candidateId, setCandidateId] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setCandidateId(userData._id.trim());
      console.warn(candidateId);
    }
  });

  //------------------------------------------------------------------------------------------\\

  //---------------------------------------Post Api-------------------------------------------\\

  async function saveCandidateData() {
    try {
      let data = {
        candidateId,
        prefferedRole,
        yearsOfExperience,
        summary,
        workHistory,
        educationHistory,
        projects,
        softSkills: selectedSoftSkills,
        domainSkills: selectedDomainSkills,
        toolsAndTechnology: selectedtoolsAndTechnology,
      };
      console.warn(data);

      const response = await fetch(
        `https://api-connectingids.vercel.app/createProfile`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );

      if (response.ok) {
        const apiData = await response.json();
        toast.success("Your Data has been submitted successfully", {
          position: "top-center",
        });
      } else {
        const errorData = await response.json();
        toast.warning(errorData.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log("Error", error);
      toast.warning("An error occurred while processing your request !", {
        position: "top-center",
      });
    }
  }

  //------------------------------------------------------------------------------------------\\

  return (
    <div>
      <div className="row w-100">
        <h1>Candidate Information Form</h1>
        <div className="col">
          {/* -----------------------------------Basic Information--------------------------------- */}

          <div className="sec-div mb-3 p-3 cid-box">
            <h2>Candidate Information</h2>
            <form className="bodyAll my-4">
              <div className="mb-5">
                <label className="cid-label">Preffered Role:</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={prefferedRole}
                  onChange={(e) => {
                    setPreferedRole(e.target.value);
                  }}
                  name="prefferedRole"
                />
                <i style={{ fontSize: "11px", color: "rgb(92, 82, 239)" }}>
                  Format: Role1, Role2, Role3
                </i>
              </div>
              <div className="mb-5">
                <label className="cid-label">Years of Experience:</label>
                <input
                  type="number"
                  className="form-control"
                  required
                  value={yearsOfExperience}
                  onChange={(e) => {
                    setyearsOfExperience(e.target.value);
                  }}
                  name="yearsOfExperience"
                />
              </div>
              <div className="mb-5">
                <label className="cid-label">About Me:</label>
                <textarea
                  className="form-control"
                  style={{ height: "150px" }}
                  rows="4"
                  value={summary}
                  onChange={(e) => {
                    setSummary(e.target.value);
                  }}
                  name="summary"
                />
              </div>
            </form>
          </div>

          {/* --------------------------------------------------------------------------------------- */}

          {/* -----------------------------------Employment History---------------------------------- */}

          <div className="sec-div mb-3 p-3 cid-box">
            <h2>Employment History:</h2>
            {workHistory.map((employment, index) => (
              <form
                key={index}
                className="bodyAll my-4 p-3 rounded"
                style={{ backgroundColor: "rgb(247, 247, 247)" }}
              >
                <div className="mb-5">
                  <label className="cid-label">Job Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={employment.jobTitle}
                    onChange={(e) =>
                      handleEmploymentChange(index, "jobTitle", e.target.value)
                    }
                    name="jobTitle"
                  />
                </div>
                <div className="mb-5">
                  <label className="cid-label">Company Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={employment.companyName}
                    onChange={(e) =>
                      handleEmploymentChange(
                        index,
                        "companyName",
                        e.target.value
                      )
                    }
                    name="companyName"
                  />
                </div>
                <div className="mb-5">
                  <label className="cid-label">Start Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={employment.startDate}
                    onChange={(e) =>
                      handleEmploymentChange(index, "startDate", e.target.value)
                    }
                    name="startDate"
                  />
                </div>
                <div className="mb-5">
                  <label className="cid-label">End Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={employment.endDate}
                    onChange={(e) =>
                      handleEmploymentChange(index, "endDate", e.target.value)
                    }
                    name="endDate"
                  />
                </div>
                <div className="">
                  <label className="cid-label">Description:</label>
                  <textarea
                    className="form-control"
                    style={{ height: "150px" }}
                    rows="4"
                    value={employment.description}
                    onChange={(e) =>
                      handleEmploymentChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    name="description"
                  />
                </div>
              </form>
            ))}
            <button
              className="btn-primary-cidblue p-2"
              onClick={handleAddEmployment}
            >
              Add Employment History
            </button>
          </div>

          {/* --------------------------------------------------------------------------------------- */}

          {/* ------------------------------------Education History---------------------------------- */}

          <div className="sec-div mb-3 p-3 cid-box">
            <h2>Education History:</h2>
            {educationHistory.map((edu, index) => (
              <form
                key={index}
                className="bodyAll my-4 p-3 rounded"
                style={{ backgroundColor: "rgb(247, 247, 247)" }}
              >
                <div className="mb-5">
                  <label className="cid-label">Education Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={edu.title}
                    onChange={(e) =>
                      handleEducationChange(index, "title", e.target.value)
                    }
                    name="educationTitle"
                  />
                </div>
                <div className="mb-5">
                  <label className="cid-label">School Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={edu.school}
                    onChange={(e) =>
                      handleEducationChange(index, "school", e.target.value)
                    }
                    name="schoolName"
                  />
                </div>
                <div className="">
                  <label className="cid-label">Year:</label>
                  <input
                    type="number"
                    className="form-control"
                    required
                    value={edu.year}
                    onChange={(e) =>
                      handleEducationChange(index, "year", e.target.value)
                    }
                    name="year"
                  />
                </div>
              </form>
            ))}
            <button
              className="btn-primary-cidblue p-2"
              onClick={handleAddEducation}
            >
              Add Education History
            </button>
          </div>

          {/* ------------------------------------------------------------------------------------------ */}

          {/* ----------------------------------------Project------------------------------------------- */}

          <div className="sec-div mb-3 p-3 cid-box">
            <h2>Project History:</h2>
            {projects.map((project, index) => (
              <form
                key={index}
                className="bodyAll my-4 p-3 rounded"
                style={{ backgroundColor: "rgb(247, 247, 247)" }}
              >
                <div className="mb-5">
                  <label className="cid-label">Project Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={project.title}
                    onChange={(e) =>
                      handleProjectChange(index, "title", e.target.value)
                    }
                    name="projectTitle"
                  />
                </div>
                <div className="mb-5">
                  <label className="cid-label">Project Description:</label>
                  <textarea
                    className="form-control"
                    style={{ height: "150px" }}
                    rows="4"
                    value={project.description}
                    onChange={(e) =>
                      handleProjectChange(index, "description", e.target.value)
                    }
                    name="projectDescription"
                  />
                </div>
              </form>
            ))}
            <button
              className="btn-primary-cidblue p-2"
              onClick={handleAddProject}
            >
              Add Project
            </button>
          </div>

          {/* ------------------------------------------------------------------------------------------ */}

          {/* ----------------------------------------Submit Form--------------------------------------- */}

          <div className="d-flex justify-content-end">
            <button
              className="btn-primary-cidblue mt-4 py-1 px-3"
              onClick={saveCandidateData}
            >
              Submit Form
            </button>
          </div>

          {/* ------------------------------------------------------------------------------------------ */}
        </div>
        <div className="col-4 py-2">
          <div className="sec-div p-3 cid-box">
            <h2>Skills:</h2>

            {/* -----------------------------------------Skills------------------------------------------- */}

            {/* ---------------------Soft Skills------------------- */}

            <div className="mb-4">
              <label className="cid-label">Soft Skills:</label>
              <input
                type="text"
                className="form-control"
                required
                value={softSkills}
                onChange={handleSoftSkillsChange}
                name="softSkills"
              />
              {softSkills && matchingSoftSkills.length > 0 && (
                <ul className="list-group">
                  {matchingSoftSkills.map((skill, index) => (
                    <li
                      key={index}
                      className="list-group-item"
                      onClick={() => handleSkillClick(skill, "softSkills")}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
              {selectedSoftSkills.length > 0 && (
                <div className="selected-skills w-100 my-2 d-flex flex-wrap">
                  {selectedSoftSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="selected-skill m-1 px-1 bg-primary rounded"
                    >
                      {skill}
                      <span
                        onClick={() => handleRemoveSkill(skill, "softSkills")}
                        className="remove-skill mx-1 text-white position-relative translate-middle"
                        style={{ top: "-.25em" }}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ---------------------------------------------------- */}
            {/* ------------------Domain Skills--------------------- */}

            <div className="mb-4">
              <label className="cid-label">Domain Skills:</label>
              <input
                type="text"
                className="form-control"
                required
                value={domainSkills}
                onChange={handleDomainSkillsChange}
                name="domainSkills"
              />
              {domainSkills && matchingDomainSkills.length > 0 && (
                <ul className="list-group">
                  {matchingDomainSkills.map((skill, index) => (
                    <li
                      key={index}
                      className="list-group-item"
                      onClick={() => handleSkillClick(skill, "domainSkills")}
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
              {selectedDomainSkills.length > 0 && (
                <div className="selected-skills w-100 my-2 d-flex flex-wrap">
                  {selectedDomainSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="selected-skill m-1 px-1 bg-primary rounded"
                    >
                      {skill}
                      <span
                        onClick={() => handleRemoveSkill(skill, "domainSkills")}
                        className="remove-skill mx-1 text-white position-relative"
                        style={{ top: "-.25em" }}
                      >
                        &times;
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ----------------------------------------------------- */}

            {/* -------------------Tools/Technology------------------ */}
            <div className="mb-4">
              <label className="cid-label">Tools/Technology:</label>
              <input
                type="text"
                className="form-control"
                required
                value={toolsAndTechnology}
                onChange={handletoolsAndTechnologyChange}
                name="toolsAndTechnology"
              />
              {toolsAndTechnology && matchingtoolsAndTechnology.length > 0 && (
                <ul className="list-group">
                  {matchingtoolsAndTechnology.map((skill, index) => (
                    <li
                      key={index}
                      className="list-group-item"
                      onClick={() =>
                        handleSkillClick(skill, "toolsAndTechnology")
                      }
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              )}
              {selectedtoolsAndTechnology.length > 0 && (
                <div className="selected-skills my-2 ">
                  {selectedtoolsAndTechnology.map((skill, index) => (
                    <div key={index} className="selected-skill">
                      <span
                        onClick={() =>
                          handleRemoveSkill(skill, "toolsAndTechnology")
                        }
                        className="remove-skill"
                      >
                        &times;
                      </span>
                      {skill}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateProfile;
