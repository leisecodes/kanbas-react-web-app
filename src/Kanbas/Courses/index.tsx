import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import { FaBars } from "react-icons/fa6";
import { Navigate, Route, Routes } from "react-router";
export default function Courses() {
  return (
    <div id="wd-courses">
      <div className="d-flex">
      <FaBars className="me-4 align-self-center text-danger"/>
      <h2>Course 1234</h2>
      </div>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
            <CoursesNavigation />
        </div>
        <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments"
                     element={<Assignments/>} />
              <Route path="Assignments/:id"
                     element={<AssignmentEditor/>} />
            </Routes>
            </div>
          </div>
    </div>
);}
