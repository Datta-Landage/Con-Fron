import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Pages/Img/CID_logo-01.svg";
import Dropdown from "react-bootstrap/Dropdown";
import "../Pages/Css/All.css";

function Header() {
  const [logedIn, setLogedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userDatas = JSON.parse(storedUserData);
      setUserId(userDatas._id.trim());
      setLogedIn(true);
      getUserAccountInfo();
    }
  }, [userId]);

  const handleDropdownItemClick = (path) => {
    navigate(path);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    setLogedIn(false);
    setUserData("");
    setUserId("");
    navigate("/");
  };

  async function getUserAccountInfo() {
    try {
      const response = await fetch(
        `http://localhost:4000/userAccount/${userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const userAccountData = await response.json();
        setUserData(userAccountData);
      } else {
        console.error("Failed to fetch user account info");
      }
    } catch (error) {
      console.error("error");
    }
  }

  return (
    <div className="tw-z-10">
      <Navbar className="header-cid text-warning justify-content-between px-5 ">
        <div className="logo">
          <Link to="/" className="text-decoration-none">
            <img src={Logo} alt="logo" style={{ width: "250px" }} />
          </Link>
        </div>
        <div className="nav-button">
          {logedIn ? (
            <div className="d-flex align-items-center me-5 pe-5">
              <div>
                <p className="m-0">
                  {userData.firstName} {userData.lastName}{" "}
                </p>
              </div>
              <div>
                <img
                  src={userData.profilePhoto}
                  className="rounded-circle mx-3"
                  style={{ width: "40px" }}
                />
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="" className="text-light">
                  <i class="bi bi-justify"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleDropdownItemClick("/myaccount")}
                  >
                    My Account
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownItemClick("/profile")}
                  >
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownItemClick("/jobs")}
                  >
                    Job
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownItemClick("/calender")}
                  >
                    Calendar
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownItemClick("/messages")}
                  >
                    Message
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignOut}>
                    Sign Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div>
              <Link to="/Signup">
                <Button variant="primary border border-white mx-2 px-4">
                  Sign Up
                </Button>
              </Link>
              <Link to="/Signin">
                <Button variant="warning border border-white mx-2 px-4">
                  Sign in
                </Button>
              </Link>
            </div>
          )}
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
