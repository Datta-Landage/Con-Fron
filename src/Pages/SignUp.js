import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Component/Layout";
import { Link } from "react-router-dom";
import "./Css/Sign.css";
import "./Css/All.css";
import { validateEmail, validatePassword } from "./Validation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState(false);

  async function saveUser(e) {
    e.preventDefault();

    if (!accountType || !email || !password || !repassword) {
      setError(true);
      return alert("all fields are mandatory");
    }

    if (!validateEmail(email)) {
      setError(true);
      return;
    }

    if (!validatePassword(password)) {
      setError(true);
      return;
    }

    if (!validatePassword(repassword)) {
      setError(true);
      return;
    }

    try {
      console.warn({ accountType, email, password, repassword });
      let data = { accountType, email, password, repassword };

      const response = await fetch(
        "https://api-connectingids.vercel.app/signUp",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        toast.success("User Registered Successfully !", {
          position: "top-center",
        });
        navigate("/signin");
      } else {
        const errorData = await response.json();
        toast.warning(errorData.message, {
          position: "top-center",
          theme: "light",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.warning("An error occurred while processing your request.", {
        position: "top-center",
      });
    }
    setEmail("");
    setPassword("");
    setRepassword("");
    setAccountType("");
  }

  const handleAccountTypeChange = (newAccountType) => {
    setAccountType(newAccountType);
  };

  return (
    <Layout title={"SignUp Page"}>
      <div className="d-flex justify-content-center">
        <div className="sign-box bg-warning d-flex justify-content-between align-items-center py-4 rounded">
          <div className="form-info mx-4">
            <h6>Welcome to</h6>
            <h1>Connecting IDs</h1>
          </div>
          <div className="form rounded">
            <div className="Signing-optn d-flex justify-content-between pb-4">
              <Link to="/signup" className="text-decoration-none ">
                <h5>Sign Up</h5>
              </Link>
              <Link
                to="/signin"
                className="text-decoration-none text-secondary"
              >
                <h4>Sign In</h4>
              </Link>
            </div>
            <div>
              <form>
                <div className="page d-flex justify-content-between">
                  <div className="radio-btn">
                    <input
                      type="radio"
                      value={"Candidate"}
                      checked={accountType === "Candidate"}
                      onChange={() => handleAccountTypeChange("Candidate")}
                    />
                    <label className="px-2">Candidate</label>
                  </div>
                  <div className="radio-btn">
                    <input
                      type="radio"
                      value={"Recruiter"}
                      checked={accountType === "Recruiter"}
                      onChange={() => handleAccountTypeChange("Recruiter")}
                    />
                    <label className="px-2">Recruiter</label>
                  </div>
                </div>
                <div
                  className={` my-2 ${
                    error && !validateEmail(email) ? "error-border" : "inputbox"
                  }`}
                >
                  <label className="cid-label">Email</label>
                  <br />
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    name="email"
                    placeholder="Email Id"
                    required
                  />
                  {error && !validateEmail(email) && (
                    <span className="error-text text-danger">
                      <small>Invalid email</small>
                    </span>
                  )}
                </div>
                <div
                  className={` my-2 ${
                    error && !validatePassword(password)
                      ? "error-border"
                      : "inputbox"
                  }`}
                >
                  <label className="cid-label">Password</label>
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    name="password"
                    required
                  />
                  {error && !validatePassword(password) && (
                    <span className="error-text text-danger">
                      <small>
                        Password must contain 1 number 1 uppercase & lowercase
                        and 8 characters
                      </small>
                    </span>
                  )}
                </div>
                <div
                  className={`my-2 ${
                    error && !validatePassword(repassword)
                      ? "error-border"
                      : "inputbox"
                  }`}
                >
                  <label className="cid-label">Re-enter Password</label>
                  <br />
                  <input
                    type="password"
                    className="form-control"
                    value={repassword}
                    onChange={(e) => {
                      setRepassword(e.target.value);
                    }}
                    name="repassword"
                    required
                  />
                  {error && !validatePassword(repassword) && (
                    <span className="error-text text-danger">
                      <small>It must match with you password</small>
                    </span>
                  )}
                </div>
                <button
                  id="sign"
                  className="btn-primary-cidblue p-2 my-3 w-100"
                  onClick={saveUser}
                >
                  Sign Up
                </button>
              </form>
              <p className="my-3">or sign up with</p>
              <div className="signing-options d-flex justify-content-between">
                <button id="sign-option">Linkedin</button>
                <button id="sign-option">Google</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
}

export default SignUp;
