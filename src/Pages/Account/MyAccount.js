import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Component/Layout";
import Banner from "../Img/createAccountBanner.png";
import Accountbtn from "./AccountButtons";
import "../Css/All.css";

const MyAccount = () => {
  const fileInputRef = useRef(null);

  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [phoneNumber, setPhone] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [alternateEmail, setAlternateEmail] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [postal, setPostal] = useState("");
  const [dob, setDob] = useState("");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserId(userData._id.trim());

      setAccountType(userData.accountType || "");
      setEmail(userData.email || "");
      setPassword(userData.password || "");
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      uploadImage(selectedFile);
    }
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `http://localhost:4000/saveRecruiterPhoto/${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        alert("Image Updated Successfully");
        console.log("Image uploaded successfully:", responseData);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
        console.error("Image upload failed:", errorData);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while processing your request.");
    }
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
        // Set the user account data fetched from the API response
        setPhone(userAccountData.phoneNumber || "");
        setFirstName(userAccountData.firstName || "");
        setLastName(userAccountData.lastName || "");
        setAlternateEmail(userAccountData.alternateEmail || "");
        setAlternateNumber(userAccountData.alternateNumber || "");
        setCountry(userAccountData.country || "");
        setCity(userAccountData.city || "");
        setAddressLine1(userAccountData.addressLine1 || "");
        setAddressLine2(userAccountData.addressLine2 || "");
        setPostal(userAccountData.postal || "");
        setDob(userAccountData.dob || "");
        console.warn(userAccountData);
      } else {
        console.error("Failed to fetch user account info");
      }
    } catch (error) {
      console.error("error");
    }
  }

  useEffect(() => {
    getUserAccountInfo();
  }, [userId]);

  async function AccountData() {
    try {
      let data = {
        phoneNumber,
        firstName,
        lastName,
        alternateEmail,
        alternateNumber,
        country,
        city,
        addressLine1,
        addressLine2,
        postal,
        dob,
      };

      const response = await fetch(
        `http://localhost:4000/updateUser/${userId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const apiData = await response.json();
        alert(apiData.message);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while processing your request.");
    }
  }

  return (
    <Layout title={"My Account"}>
      <div className="container">
        <div className="banner py-4">
          <img src={Banner} style={{ width: "100%" }} alt="Banner" />
        </div>
        <div className="d-flex">
          <Accountbtn />

          <div className="cid-box container mx-4 p-4">
            <form className="mb-4">
              <h2 className=" my-3">Account Details</h2>
              <div className="d-flex justify-content-between">
                <div className="input-box my-2">
                  <label className="cid-label">Email Id</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name="email"
                    placeholder="Email Id"
                  />
                </div>
                <div className="input-box my-2">
                  <label className="cid-label">Phone number</label>
                  <input
                    type="Phone"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    name="phoneNumber"
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className=" my-2">
                  <label className="cid-label pb-2">Account type</label>
                  <div className="d-flex align-kitems-center">
                    <div className="radio-btn d-flex pe-4">
                      <input
                        type="radio"
                        value={"Recruiter"}
                        checked={accountType === "Recruiter"}
                        style={{ width: "100%" }}
                      />
                      <label className="px-2">Recruiter</label>
                    </div>
                    <div className="radio-btn d-flex ps-4">
                      <input
                        type="radio"
                        value={"Candidate"}
                        checked={accountType === "Candidate"}
                        style={{ width: "100%" }}
                      />
                      <label className="px-2">Candidate</label>
                    </div>
                  </div>
                </div>
                <div className="input-box my-2">
                  <label className="cid-label">Password</label>
                  <div className="input-group">
                    <input
                      type="Password"
                      className="form-control "
                      value={password}
                      aria-describedby="basic-addon2"
                    />
                    <span class="input-group-text" id="basic-addon2">
                      <Link
                        to="/resetpassword"
                        className="text-decoration-none text-secondary"
                      >
                        Reset Password
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </form>

            <form className="bodyAll mt-5">
              <h2 className=" my-3">Personal Details</h2>
              <div className="d-flex justify-content-between">
                <div className="input-box my-2">
                  <label className="cid-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    name="firstName"
                    required
                  />
                </div>
                <div className="input-box my-2">
                  <label className="cid-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    name="lastName"
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="input-box my-2">
                  <label className="cid-label">Alternate Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={alternateEmail}
                    onChange={(e) => {
                      setAlternateEmail(e.target.value);
                    }}
                    name="alternateEmail"
                  />
                </div>
                <div className="input-box my-2">
                  <label className="cid-label">Alternate Phone Number</label>
                  <input
                    type="phone"
                    className="form-control"
                    value={alternateNumber}
                    onChange={(e) => {
                      setAlternateNumber(e.target.value);
                    }}
                    name="alternateNumber"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="input-box my-2">
                  <label className="cid-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                    }}
                    name="country"
                    required
                  />
                </div>
                <div className="input-box my-2">
                  <label className="cid-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    name="city"
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="input-box my-2">
                  <label className="cid-label">Address Line1</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addressLine1}
                    onChange={(e) => {
                      setAddressLine1(e.target.value);
                    }}
                    name="addressLine1"
                    required
                  />
                </div>
                <div className="input-box my-2">
                  <label className="cid-label">Address Line2</label>
                  <input
                    type="text"
                    className="form-control"
                    value={addressLine2}
                    onChange={(e) => {
                      setAddressLine2(e.target.value);
                    }}
                    name="addressLine2"
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <div className="input-box my-2">
                  <label className="cid-label">Postal Code</label>
                  <input
                    type="phone"
                    className="form-control"
                    value={postal}
                    onChange={(e) => {
                      setPostal(e.target.value);
                    }}
                    name="postalCode"
                    required
                  />
                </div>
                <div className="input-box my-2">
                  <label className="cid-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={dob}
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                    name="dateOfBirth"
                    required
                  />
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn-primary-cidblue mt-4"
                  style={{ width: "150px" }}
                  onClick={AccountData}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyAccount;
