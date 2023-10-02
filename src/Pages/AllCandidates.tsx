import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiMessageSquare } from "react-icons/fi";
import { useMessageStore } from "../store/useMessagesStore";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/routes";
import { USER_TYPE, useUserInfo } from "../hooks/useUserInfo";
import { useUserStore } from "../store/useUserStore";
import { GiSuitcase } from "react-icons/gi";
import { RiGraduationCapFill } from "react-icons/ri";
import { BiSolidCertification } from "react-icons/bi";

export interface IProfile {
  _id: string;
  uniqueId: string;
  candidateId: string;
  profilePhoto?: string;
  name: string;
  prefferedRole: string[];
  yearsOfExperience: number;
  summary: string;
  workHistory: Record<string, any>[];
  educationHistory: Record<string, any>[];
  projects: Record<string, any>[];
  skills: string[];
  domainSkills: string[];
  toolsAndTechnology: string[];
  jobsAppliedByCandidate: string[];
  isDeleted?: boolean;
  bookmarkedJobs: string[];
  softSkills: string[];
}

const AllCandidatesData = () => {
  const [fetchedCandidateData, setFetchedCandidateData] = useState<IProfile[]>(
    []
  );
  const [searchValue, setSearchValue] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<string>(null);
  const setSelectedProfile = useMessageStore((s) => s.setSelectedProfile);
  const navigate = useNavigate();
  const { userData, getUserInfo, error, isLoading } = useUserInfo();
  const { accountType } = useUserStore((state) => state.user);

  useEffect(() => {
    showAllcandidates();
  }, []);
  console.log("fetch", fetchedCandidateData);
  useEffect(() => {
    if (!!error) {
      toast.error(error, {
        position: "top-center",
      });
    }
  }, [error]);

  useEffect(() => {
    if (
      !isLoading &&
      !error &&
      !!userData &&
      !!selectedCandidate &&
      userData._id === selectedCandidate
    ) {
      setSelectedProfile(
        filteredCandidates.filter(
          (candidate) => candidate.candidateId === selectedCandidate
        )[0]
      );
      navigate(ROUTES.MESSAGES);
    }
  }, [error, userData, isLoading]);

  async function showAllcandidates() {
    try {
      const response = await fetch(`http://localhost:4000/getAllProfiles`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const candidatesData = await response.json();
        console.warn(candidatesData?.data);
        setFetchedCandidateData(candidatesData);
      } else {
        console.error("Failed to fetch CandidatesData");
        toast.warning("Failed to fetch Candidate Data", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.warning("An error occurred while processing your request.", {
        position: "top-center",
      });
    }
  }

  let filteredCandidates = fetchedCandidateData.filter((candidateData) => {
    return (
      (candidateData.uniqueId &&
        candidateData.uniqueId
          .toLowerCase()
          .includes(searchValue.toLowerCase())) ||
      (candidateData.yearsOfExperience !== undefined &&
        candidateData.yearsOfExperience
          .toString()
          .includes(searchValue.toLowerCase())) ||
      (candidateData.toolsAndTechnology &&
        candidateData.toolsAndTechnology.some((tool) =>
          tool.toLowerCase().includes(searchValue.toLowerCase())
        )) ||
      (candidateData.summary &&
        candidateData.summary.toLowerCase().includes(searchValue.toLowerCase()))
    );
  });

  const clearSelectedCandidate = () => {
    setSelectedCandidate(null);
  };
  const messageCandidate = () => {
    // checking if the candidate exist or not
    getUserInfo(selectedCandidate);
  };
  console.log("sfrffgfddfgd", filteredCandidates);

  return (
    <Layout title={AllCandidatesData}>
      <div className="container  py-5">
        <div className="container ">
          <div className="input-group ">
            <input
              type="text"
              className="form-control"
              placeholder="Search for candidate ids, skills etc"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <span className="input-group-text">Search</span>
          </div>
        </div>
        <div className="d-flex">
          <div
            className={
              selectedCandidate
                ? "my-4"
                : "my-4 d-flex justify-content-start flex-wrap"
            }
          >
            {filteredCandidates?.map((candidatesData, index) => (
              <div
                key={index}
                role="button"
                className={`cid-box m-3 px-4 py-2 tw-cursor-pointer ${
                  selectedCandidate === candidatesData?.candidateId
                    ? "detailed-box tw-border tw-border-primary"
                    : ""
                }`}
                style={{ width: "400px", height: "450px" }}
                onClick={() =>
                  setSelectedCandidate(candidatesData?.candidateId)
                }
              >
                <div className="d-flex justify-content-end align-items-center">
                  <h4>
                    <i className="bi bi-database-fill-add"></i>
                  </h4>
                </div>
                <div className="m-0 d-flex justify-content-center align-items-center">
                  <img
                    className="m-2 rounded-circle bg-secondary"
                    src={candidatesData?.profilePhoto}
                    alt="H"
                    style={{ width: "120px", height: "120px" }}
                  />
                  <p
                    className="p-1 my-3 text-white text-primary position-relative translate-middle bg-primary rounded-circle"
                    style={{ top: "3.5rem", left: "-1.5rem" }}
                  >
                    {candidatesData?.yearsOfExperience} +
                  </p>
                </div>
                <div className="my-2 mt-4 d-flex justify-content-center">
                  <h3 className=" fw-bold " style={{ color: "#38349F" }}>
                    {candidatesData?.uniqueId.slice(0, 7)}
                  </h3>
                </div>
                <div className="d-flex justify-content-center">
                  <b>
                    <h6 className="fw-bold" style={{ color: "#38349F" }}>
                      {`${candidatesData.domainSkills[0]} , ${candidatesData.domainSkills[1]} `}
                    </h6>
                  </b>
                </div>
                <div className="p-1 my-1  text-center">
                  <p className="">{candidatesData.summary}</p>
                </div>
              </div>
            ))}
          </div>

          <div className=" ">
            {selectedCandidate &&
              [
                filteredCandidates?.find(
                  (candidate) => candidate.candidateId === selectedCandidate
                ),
              ]?.map((candidatesData, index) => (
                <div className="d-flex cid-box mt-4 ">
                  <div>
                    {" "}
                    <div className="p-4 m-5  tw-sticky tw-top-3">
                      <div className="d-flex justify-content-end align-items-center">
                        <h4>
                          <i className="bi bi-database-fill-add"></i>
                        </h4>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="d-flex align-items-end">
                          <img
                            className="m-2 rounded-circle bg-secondary"
                            src={candidatesData?.profilePhoto}
                            alt="H"
                            style={{ width: "100px", height: "100px" }}
                          />
                          <p
                            className="p-1 my-3 text-white text-primary position-relative translate-middle bg-primary rounded-circle"
                            style={{ top: "1em", left: "-1rem" }}
                          >
                            {candidatesData?.yearsOfExperience}+
                          </p>
                        </div>

                        <div className="my-2 mt-4 d-flex justify-content-center">
                          <h3
                            className=" fw-border fs-5 fw-bold"
                            style={{ color: "#38349F" }}
                          >
                            {candidatesData?.uniqueId.slice(0, 7)}
                            <p className="fs-6 fw-bold">
                              {" "}
                              {candidatesData?.prefferedRole[0]?.slice(1, -1)}
                            </p>
                          </h3>
                          <br />
                        </div>
                      </div>
                      <div>
                        <p className="fs-5 fw-bold mt-3 mx-2">About Me</p>
                        <p className="fs-6">{candidatesData?.summary}</p>
                      </div>

                      <div className="d-flex">
                        <p>
                          {" "}
                          <GiSuitcase className="fs-3 mt-3" />{" "}
                        </p>{" "}
                        <p className="fs-5 fw-bold mt-3 mx-2">Work Experince</p>
                      </div>

                      <div>
                        {candidatesData?.workHistory?.map(
                          (singleHistory, index) => (
                            <div key={index}>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Role:
                                </span>
                                {singleHistory?.jobTitle}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Company:
                                </span>
                                {singleHistory?.companyName}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Date:
                                </span>
                                {singleHistory?.startDate} -{" "}
                                {singleHistory?.endDate}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Description:
                                </span>
                                {singleHistory?.Description}
                              </p>
                            </div>
                          )
                        )}
                      </div>

                      <div className="d-flex">
                        <p>
                          {" "}
                          <RiGraduationCapFill className="fs-3 mt-3" />{" "}
                        </p>{" "}
                        <p className="fs-5 fw-bold mt-3 mx-2">Education</p>
                      </div>

                      <div>
                        {candidatesData?.educationHistory?.map(
                          (singleEducation, index) => (
                            <div key={index}>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  Title:
                                </span>
                                {singleEducation?.title}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  University:
                                </span>
                                {singleEducation?.school}
                              </p>
                              <p>
                                <span
                                  className="fw-bolder"
                                  style={{
                                    color: "#38349F",
                                    marginRight: "10px",
                                  }}
                                >
                                  PassOut Year:
                                </span>
                                {singleEducation?.year}
                              </p>
                              <hr />
                            </div>
                          )
                        )}
                      </div>

                      <div className="d-flex">
                        <p>
                          {" "}
                          <GiSuitcase className="fs-3 mt-3" />{" "}
                        </p>{" "}
                        <p className="fs-5 fw-bold mt-3 mx-2">Projects</p>
                      </div>

                      <div>
                        {candidatesData?.projects?.map((project, index) => (
                          <div key={index}>
                            {Object.entries(project).map(
                              ([title, description], idx) => (
                                <div key={idx}>
                                  <p>
                                    <span
                                      className="fw-bolder"
                                      style={{
                                        color: "#38349F",
                                        marginRight: "10px",
                                      }}
                                    >
                                      Title:
                                    </span>
                                    {title}
                                  </p>
                                  <p>
                                    <span
                                      className="fw-bolder"
                                      style={{
                                        color: "#38349F",
                                        marginRight: "10px",
                                      }}
                                    >
                                      Description:
                                    </span>
                                    {description}
                                  </p>
                                  <hr />
                                </div>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginLeft: "10px", marginTop: "80px" }}>
                    <div className="d-flex gap-4">
                      {accountType.toLowerCase() ===
                        USER_TYPE.RECRUITER.toLowerCase() && (
                        <button
                          onClick={messageCandidate}
                          className="tw-px-4 tw-py-2 tw-font-bold active:tw-bg-blue-400 tw-text-primary tw-bg-blue-500/10 hover:tw-bg-blue-200 tw-rounded-md tw-mt-4"
                          title={"Message Candidate"}
                        >
                          Message
                        </button>
                      )}
                      <button
                        onClick={clearSelectedCandidate}
                        className="tw-px-4 tw-py-2 tw-font-bold tw-text-white tw-bg-red-500 tw-rounded-md tw-mt-4 tw-hover:bg-red-700 "
                      >
                        Close
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      width: "500px",
                      marginTop: "160px",
                      marginRight: "100px",
                    }}
                  >
                    <div className="d-flex mt-4">
                      <p> </p> <p className="fs-5 fw-bold mt-3 mx-2">Domains</p>
                    </div>
                    <div className="d-flex gap-2">
                      {candidatesData?.domainSkills?.map((skill, index) => (
                        <p
                          key={index}
                          className="p-2 rounded-3"
                          style={{ backgroundColor: "#38349F" }}
                        >
                          <span className="fw-bold text-white p-1">
                            {skill}
                          </span>
                        </p>
                      ))}
                    </div>

                    <div className="d-flex mt-4">
                      <p> </p>{" "}
                      <p className="fs-5 fw-bold mt-3 ">Tools/Technology</p>
                    </div>

                    <div className="d-flex gap-2">
                      <p
                        key={index}
                        className="p-2 rounded-3"
                        style={{ backgroundColor: "#38349F" }}
                      >
                        <span className="fw-bold text-white p-1">
                          {candidatesData?.toolsAndTechnology[0]}
                        </span>
                      </p>
                      <p
                        key={index}
                        className="p-2 rounded-3"
                        style={{ backgroundColor: "#38349F" }}
                      >
                        <span className="fw-bold text-white p-1">
                          {candidatesData?.toolsAndTechnology[1]}
                        </span>
                      </p>
                    </div>

                    <div className="d-flex mt-4">
                      <p> </p> <p className="fs-5 fw-bold mt-3 ">SoftSkills</p>
                    </div>

                    <div className="d-flex gap-2">
                      {candidatesData?.softSkills?.map((skill, index) => (
                        <p
                          key={index}
                          className="p-2 rounded-3"
                          style={{ backgroundColor: "#38349F" }}
                        >
                          <span className="fw-bold text-white p-1">
                            {skill}
                          </span>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default AllCandidatesData;
