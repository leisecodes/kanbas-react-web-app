import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlus } from "react-icons/bs";
import { BsGripVertical } from "react-icons/bs";
import { RiFileEditLine } from "react-icons/ri";
import { FaCaretDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import AssignmentControlButtons from "./AssignmentControlButtons";
import {Link, useParams} from 'react-router-dom';
import AssignmentSideButtons from './AssignmentSideButtons';
import { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import ConfirmDelete from './ConfirmDelete';
import * as client from "./client";
import { setAssignments, addAssignment, deleteAssignment, updateAssignment, editAssignment } from './reducer';
 export default function Assignments() {
    const { cid } = useParams();
    const selectAssignments = useSelector((state:any) => {
      console.log("State:", state); 
      return state.assignmentsReducer.assignments;});
    console.log(selectAssignments);
    console.log(Array.isArray(selectAssignments));
    const courseAssignments = selectAssignments.filter((assignment:any)=>assignment.course === cid);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);

    const dispatch = useDispatch();

    const removeAssignment = async (assignmentId: string) => {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    };

    const saveAssignment = async (assignment: any) => {
      const status = await client.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    };

    const createAssignment = async (assignment: any) => {
      const newAssignment = await client.createAssignment(cid as string, assignment);
      dispatch(addAssignment(newAssignment));
    };

    const fetchAssignments = async () => {
      const modules = await client.findAssignmentsForCourse(cid as string);
      dispatch(setAssignments(modules));
    };
    useEffect(() => {
      fetchAssignments();
    }, []);

    const handleDeleteClick = (id: string) => {
      setSelectedAssignmentId(id);
    };

    const handleDeleteConfirm = () => {
      if (selectedAssignmentId) {
        removeAssignment(selectedAssignmentId);
        setSelectedAssignmentId(null);
      }
    };

    const handleDeleteCancel = () => {
      setSelectedAssignmentId(null);
    };
  
    
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
        <Link to={`/Kanbas/Courses/${cid}/Assignments/new`} id="wd-add-assignment" className="btn btn-danger btn-lg">
        <BsPlus/>
        Assignment</Link>
        </div>
        </div>

        <ul id="wd-modules" className="list-group rounded-0 w-100">
        <li  className="wd-module list-group-item p-0  fs-5 border-gray ">
            <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-3 fs-3"/>
            <FaCaretDown />
            ASSIGNMENTS
            <AssignmentControlButtons/>
            </div>
          </li>
          <div className="border border-end-0 border-top-0 border-bottom-0 border-4 border-success">
          {courseAssignments.map((assignment:any)=>(
            <li key={assignment._id} className="wd-assignment-list-item list-group-item p-3 ps-1">
              <div className="d-flex">
              <BsGripVertical className="me-3 fs-3 mr-auto align-self-center"/>
              <RiFileEditLine className="me-3 fs-3 text-success mr-auto align-self-center"/>
              <div className="flex-grow-1 mr-auto">
              <Link to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`} className="wd-assignment-link text-decoration-none"><span className="text-black fw-bolder">{assignment.title}</span></Link>
              <br />
                <span className="text-danger">Multiple Modules</span> | <span className="fw-bold">Not available until</span> {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(new Date(assignment.fromDate))} at 12:00am |<br/>
                <span className="fw-bold">Due</span> {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(new Date(assignment.dueDate))} at 11:59pm | {assignment.points} pts
              </div>
              <FaTrash className='text-danger fs-5 align-self-center' onClick={() => handleDeleteClick(assignment._id)} data-bs-toggle="modal" data-bs-target="#deleteModal"></FaTrash>
              <div className="float-end ml-auto align-self-center"><AssignmentSideButtons assignment={assignment} /></div>
              </div>
            </li>
          ))}  
          </div>
        </ul>
        
        <ConfirmDelete
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      </div>
    );
  }
  