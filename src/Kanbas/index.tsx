import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import "./styles.css";
import AssignmentEditor from "./Courses/Assignments/Editor";

export default function Kanbas() {
  return (
    <div id="wd-kanbas" className="h-100">
      <div className="d-flex h-100">
      <div className="d-none d-md-block bg-black wd-nav">
      <KanbasNavigation />
      </div>
    
    <div className="flex-fill p-4">
          <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Courses/:cid/*" element={<Courses />} />
              <Route path="Courses/:cid/Assignments/:aid/*" element={<AssignmentEditor/>}/>
            </Routes>
      </div>
      </div>
    </div>
);}

