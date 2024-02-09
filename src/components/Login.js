import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./mix.css";
import axios from "axios";

const Register = () => {
  const [passShow, setPassShow] = useState(false);
  //   const [cpassShow, setCPassShow] = useState(false);

  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });

  const setVal = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };
  const token = window.localStorage.getItem("app-token");
  const addUserdata = async (e) => {
    e.preventDefault();

    const { email, password } = inpval;

    try {
      if (email === "") {
        toast.error("email is required!", {
          position: "top-center",
        });
      } else if (!email.includes("@")) {
        toast.warning("includes @ in your email!", {
          position: "top-center",
        });
      } else if (password === "") {
        toast.error("password is required!", {
          position: "top-center",
        });
      } else if (password.length < 6) {
        toast.error("password must be 6 char!", {
          position: "top-center",
        });
      } else {
        const response = await axios.post(
          "http://localhost:8080/login",
          {
            email,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Registration Successfully done 😃!", {
            position: "top-center",
          });
          setInpval({
            email: "",
            password: "",
          });
        }
      }
    } catch (error) {
      console.error("Error occurred during registration:", error.message);
      toast.error("Registration failed. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign In</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage <br />
              your tasks! We hope that you will get like it.
            </p>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                id="email"
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!passShow ? "password" : "text"}
                  value={inpval.password}
                  onChange={setVal}
                  name="password"
                  id="password"
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!passShow)}
                >
                  {!passShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>

            <button className="btn" onClick={addUserdata}>
              Sign In
            </button>
            <p>
              Don't have account? <NavLink to="/register">Signup</NavLink>
            </p>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  );
};

export default Register;
