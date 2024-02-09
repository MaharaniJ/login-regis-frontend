import React, { useState } from "react";
import "./mix.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Register() {
  const [passShow, setPassshow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const [inpVal, setInpval] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  console.log(inpVal);

  // const setVal = (e)=>{
  //     const {name,value} = e.target;
  //     setInpval(()=>{
  //         return{
  //             ...inpVal,
  //             [name]:value
  //         }
  //     })

  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = inpVal;
    if (name === "") {
      alert("Please enter your name");
      return;
    } else if (email === "") {
      alert("Please enter your email");
      return;
    } else if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    } else if (password === "") {
      alert("Please enter your password");
      return;
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    } else if (cpassword === "") {
      alert("Enter your confirm password");
      return;
    } else if (cpassword.length < 6) {
      alert("Confirm password must be at least 6 characters");
      return;
    } else if (password !== cpassword) {
      alert("Password and confirm password do not match");
      return;
    } else {
      try {
        const response = await axios.post("http://localhost:8080/register", {
          name,
          email,
          password,
          cpassword,
        });

        if (response.status === 201) {
          alert("user Loggedin successfully");
          setInpval({ name: "", email: "", password: "", cpassword: "" });
         
         
        } else {
          console.error("Error:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form_input">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                name="name"
                id="name"
                onChange={(e) => setInpval({ ...inpVal, name: e.target.value })}
                placeholder="Enter your Name"
              ></input>
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) =>
                  setInpval({ ...inpVal, email: e.target.value })
                }
                placeholder="Enter your Email Address"
              ></input>
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  name="password"
                  id="password"
                  onChange={(e) =>
                    setInpval({ ...inpVal, password: e.target.value })
                  }
                  placeholder="Enter your Password"
                ></input>
                <div
                  className="showpass"
                  onClick={() => setPassshow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <div className="form_input">
              <label htmlFor="password">Confirm Password</label>
              <div className="two">
                <input
                  type={!cpassShow ? "password" : "text"}
                  name="cpassword"
                  id="cpassword"
                  onChange={(e) =>
                    setInpval({ ...inpVal, cpassword: e.target.value })
                  }
                  placeholder="Confirm password"
                />
                <div
                  className="showpass"
                  onClick={() => setCPassShow(!cpassShow)}
                >
                  {!cpassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn">Sign Up</button>
            <p>
              Already have an Account? <NavLink to="/">Login</NavLink>{" "}
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
export default Register;
