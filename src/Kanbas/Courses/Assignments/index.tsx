import { BsPlus } from "react-icons/bs";
import { BsGripVertical } from "react-icons/bs";
import { RiFileEditLine } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
export default function Assignments() {
    return (
      <div id="wd-assignments">
        <div id="wd-assignment-buttons" className="row" >
        <div className="col-4">
        <input id="wd-search-assignment"
               placeholder="Search for Assignments"
               className="form-control" />
        </div>
        <div className="col-4">
        <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary">
          <BsPlus/>
           Group</button>
        </div>
        <div className="col-4">
        <button id="wd-add-assignment" className="btn btn-danger btn-lg">
        <BsPlus/>
        Assignment</button>
        </div>
        </div>

        <ul id="wd-modules" className="list-group rounded-0 w-100">
        <li className="wd-module list-group-item p-0  fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-3 fs-3"/>
            <FaCaretDown />
            ASSIGNMENTS
            <AssignmentControlButtons/>
            </div>
          </li> 
          <li className="wd-assignment-list-item list-group-item p-3 ps-1">
          <div className="d-flex">
          <BsGripVertical className="me-3 fs-3"/>
          <RiFileEditLine className="me-3 fs-3 text-success"/>
          <div>
            <a className="wd-assignment-link text-decoration-none"
              href="#/Kanbas/Courses/1234/Assignments/123">
              <span className="text-black fw-bolder">A1</span>
            </a>
            <br />
            <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not available until</span> May 6 at 12:00am |<br/>
            <span className="fw-bold">Due</span> May 13 at 11:59pm | 100 pts
            </div>
            </div>
            <LessonControlButtons/>
          </li>
          <li className="wd-assignment-list-item list-group-item p-3 ps-1">
          <div className="d-flex">
          <BsGripVertical className="me-3 fs-3"/>
          <RiFileEditLine className="me-3 fs-3 text-success"/>
          <div>
            <a className="wd-assignment-link text-decoration-none"
              href="#/Kanbas/Courses/1234/Assignments/123">
              <span className="text-black fw-bolder">A2</span>
            </a>
            <br />
            <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not available until</span> May 13 at 12:00am |<br/>
            <span className="fw-bold">Due</span> May 20 at 11:59pm | 100 pts
            </div>
            </div>
            <LessonControlButtons/>
          </li>
          <li className="wd-assignment-list-item list-group-item p-3 ps-1">
          <div className="d-flex">
          <BsGripVertical className="me-3 fs-3"/>
          <RiFileEditLine className="me-3 fs-3 text-success"/>
          <div>
            <a className="wd-assignment-link text-decoration-none"
              href="#/Kanbas/Courses/1234/Assignments/123">
              <span className="text-black fw-bolder">A3</span>
            </a>
            <br />
            <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not available until</span> May 20 at 12:00am |<br/>
            <span className="fw-bold">Due</span> May 27 at 11:59pm | 100 pts
            </div>
            </div>
            <LessonControlButtons/>
          </li>
        </ul>
        
      </div>
    );
  }
  