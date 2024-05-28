import { BsPlus } from "react-icons/bs";
import { BsGripVertical } from "react-icons/bs";
import { RiFileEditLine } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import {Link, useParams} from 'react-router-dom';
import { assignments } from "../../Database";
 export default function Assignments() {
    const { cid } = useParams();
    const courseAssignments = assignments.filter((assignment)=>assignment.course===cid);
    return (
      <div id="wd-assignments">
        <div id="wd-assignment-buttons" className="mb-4 row d-flex w-100 justify-items-between" >
        <div className="me-5 col w-25 input-group">
        <button className="btn btn-lg btn-outline-secondary border-end-0"><IoIosSearch/></button>
        <input id="wd-search-assignment"
               placeholder="Search..."
               className="form-control form-control-lg border-secondary border-start-0" />
        
        </div>
        <div className="col ms-5">
        <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary me-1">
          <BsPlus/>
           Group</button>
        <button id="wd-add-assignment" className="btn btn-danger btn-lg">
        <BsPlus/>
        Assignment</button>
        </div>
        </div>

        <ul id="wd-modules" className="list-group rounded-0 w-100">
        <li className="wd-module list-group-item p-0  fs-5 border-gray ">
            <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-3 fs-3"/>
            <FaCaretDown />
            ASSIGNMENTS
            <AssignmentControlButtons/>
            </div>
          </li>
          <div className="border border-end-0 border-top-0 border-bottom-0 border-4 border-success">
          {courseAssignments.map((assignment)=>(
            <li className="wd-assignment-list-item list-group-item p-3 ps-1">
              <div className="d-flex">
              <BsGripVertical className="me-3 fs-3 mr-auto align-self-center"/>
              <RiFileEditLine className="me-3 fs-3 text-success mr-auto align-self-center"/>
              <div className="flex-grow-1 mr-auto">
              <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link text-decoration-none"><span className="text-black fw-bolder">{assignment.title}</span></Link>
              <br />
                <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not available until</span> {assignment.available} |<br/>
                <span className="fw-bold">Due</span> {assignment.due} | {assignment.points} pts
              </div>
              <div className="float-end ml-auto align-self-center"><LessonControlButtons/></div>
              </div>
            </li>
          ))}  
          </div>
        </ul>
      </div>
    );
  }
  