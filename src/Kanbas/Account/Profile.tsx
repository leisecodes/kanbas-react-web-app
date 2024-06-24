import * as client from "./client";
import * as userClient from "../Courses/People/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
export default function Profile() {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState<any>({});
    const navigate = useNavigate();
    const fetchProfile = async () => {
        try {
          const account = await client.profile();
          setProfile(account);
        } catch (err: any) {
          navigate("/Kanbas/Account/Signin");
        }
      };
    

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kanbas/Account/Signin");
    };

    const updateProfile = async () => {
        await userClient.updateUser(profile)
        fetchProfile()
    }

    useEffect(() => { fetchProfile(); }, []);
    return (
        <div>
            <h1>Profile</h1>
            {profile && (
                <div>
                    <input className="form-control mb-2 w-50" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
                    <input className="form-control mb-2 w-50" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} />
                    <input className="form-control mb-2 w-50" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} />
                    <input className="form-control mb-2 w-50" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} />
                    <input className="form-control mb-2 w-50" value={profile.dob} onChange={(e) => setProfile({ ...profile, dob: e.target.value })} type="date" />
                    <input className="form-control mb-2 w-50" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
                    <select className="form-control mb-2 w-50" value={profile.role} onChange={(e) => setProfile({ ...profile, role: e.target.value })}>
                        <option value="USER">User</option>            <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>      <option value="STUDENT">Student</option>
                    </select>
                    <button onClick={updateProfile} className="btn btn-primary w-50">
                        Update Details
                    </button>
                    <br/>
                    <button onClick={signout} className="btn btn-danger mt-2 w-50">
                        Sign out
                    </button>
                </div>

            )}
        </div>
    );
}