import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signin() {
  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signin = async () => {
    try {
        const currentUser = await client.signin(credentials);
        dispatch(setCurrentUser(currentUser));
        navigate("/Kanbas/Account/Profile");
      } catch (err: any) {
        setError(err.response.data.message);
      }  
  };

  return (
    <div>
      <h1>Sign in</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <input onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
        value={credentials.username} className="form-control mb-2" placeholder="username" />
      <input onChange={(e) => setCredentials({ ...credentials, password: e.target.value }) }
        value={credentials.password} className="form-control mb-2" placeholder="password" type="password" />
      <button onClick={signin} className="btn btn-primary w-100"> Sign in </button>
      <br />
      <Link to="/Kanbas/Account/Signup">Sign up</Link>
      <div className="mt-5">
      <h4>Project Details: </h4>
      <h5>Name: Leise Crandall</h5>
      <h6>Section: 01, Summer 1 2024</h6>
      </div>
    </div>
  );
}
