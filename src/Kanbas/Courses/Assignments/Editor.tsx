import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { assignments } from "../../Database";
import { courses } from "../../Database";
import { addAssignment, deleteAssignment, updateAssignment, editAssignment } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function AssignmentEditor() {
    const { aid } = useParams();
    const { cid } = useParams();
    const [assignmentName, setAssignmentName] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');
    const [points, setPoints] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [availableDate, setAvailableDate] = useState('');
    const [untilDate, setUntilDate] = useState('');
    const {assignments} = useSelector((state:any)=>state.assignmentsReducer);
    const currentAssignment = assignments.filter((assignment:any)=>assignment._id===aid);
    const currentCourse = courses.filter((course)=>course._id===cid);
    const [assignment] = currentAssignment;

    useEffect(() => {
      if (assignment) {
        setAssignmentName(assignment.title);
        setAssignmentDescription(assignment.description);
        setPoints(assignment.points);
        setDueDate(assignment.dueDate);
        setAvailableDate(assignment.fromDate);
        setUntilDate(assignment.untilDate);
      }
    }, [assignment]);


    const handleSubmit = (e:any) => {
      e.preventDefault();
      const saveAssignment = {
        _id: assignment ? aid : "",
        course: cid,
        title: assignmentName,
        description : assignmentDescription,
        points,
        dueDate,
        fromDate : availableDate,
        untilDate,
      };
      if (assignment) {
        dispatch(updateAssignment(saveAssignment));
      } else {
        dispatch(addAssignment(saveAssignment));
      }
      navigate(`/Kanbas/Courses/${cid}/Assignments`);
    };
  
    

    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
      
      <div id="wd-assignments-editor">

          <div>
          <h5><label htmlFor="wd-name" className="form-label">Assignment Name</label></h5>
          <input id="wd-name" className="form-control" placeholder="New Assignment" onChange={(e)=>setAssignmentName(e.target.value)}  value={assignmentName} />
          <br />
          <br />

          <textarea className="form-control" placeholder="Assignment Description" onChange={(e)=> setAssignmentDescription(e.target.value)} rows={10} cols={55} id="wd-description">
          {assignment ? assignment.description: assignmentDescription}
        </textarea>
        <br />
        <br/>

        <div className="row">
            <div  className="col-3 text-end">
              <label htmlFor="wd-points" className="form-label">Points</label>
            </div>
            <div className="col-5">
              <input className="form-control" placeholder="100" onChange={(e)=>setPoints(e.target.value)}  id="wd-points" value={points} />
            </div>
          </div>
          <br/>
          <div className="row">
            <div  className="col-3 text-end">
                <label htmlFor="wd-group" className="form-label">Assignment Group</label>
            </div>
            <div  className="col-5">
                <select className="form-select" id="wd-group">
                    <option value="Assignments">ASSIGNMENTS</option>
                    <option value="Quizzes">QUIZZES</option>
                    <option value="Discussions">DISCUSSIONS</option>
                </select>
            </div>
          </div>
          <br/>
          <div className="row">
          <div  className="col-3 text-end">
                <label htmlFor="wd-display-grade-as" className="form-label">Display Grade As</label>
            </div>
            <div  className="col-5">
                <select className="form-select" id="wd-display-grade-as">
                    <option value="Percentage">Percentage</option>
                </select>
            </div>
          </div>
          <br/>
          
          <div className="row">
            <div className="col-3 text-end">
                <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
            </div>
            
            <div className="col-5 ms-3 border border-grey p-3 rounded-1">
                <select className="form-select w-100" id="wd-submission-type">
                    <option value="Online">Online</option>
                </select>
          
              <br/>
                <div className="">Online Entry Options</div> <br/>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" name="wd-text-entry" id="wd-text-entry"></input>
                <label htmlFor="wd-text-entry" className="form-check-label pb-2 ">Text Entry</label>
                <br/>
                <input className="form-check-input" type="checkbox" name="wd-website-url" id="wd-website-url"></input>
                <label htmlFor="wd-website-url" className="form-check-label pb-2">Website URL</label>
                <br/>
                <input className="form-check-input" type="checkbox" name="wd-media-recordings" id="wd-media-recordings"></input>
                <label htmlFor="wd-media-recordings" className="form-check-label pb-2">Media Recordings</label>
                <br/>
                <input className="form-check-input" type="checkbox" name="wd-student-annotation" id="wd-student-annotation"></input>
                <label htmlFor="wd-student-annotation" className="form-check-label pb-2">Student Annotation</label>
                <br/>
                <input className="form-check-input" type="checkbox" name="wd-file-upload" id="wd-file-upload"></input>
                <label htmlFor="wd-file-upload" className="form-check-label pb-2">File Uploads</label>
                </div>
          </div>
          </div>
          <br/>
          <div className="row">
          <div  className="col-3 text-end">Assign</div>
          <div  className="col-5  ms-3 border border-grey p-3 rounded-1 mb-3">
                <label htmlFor="wd-assign-to" className="form-label">Assign To</label><br/>
                <input className="form-control mb-3" type="text" name="wd-assign-to" id="wd-assign-to" value="Everyone"></input>
                <label htmlFor="wd-due-date" className="form-label">Due</label><br/>
                <input className="form-control mb-3" type="date" id="wd-due-date" onChange={(e)=>setDueDate(e.target.value)} value={assignment ? assignment.dueDate : dueDate}></input>
                <div className="row">
                <div className="col-6">
                <label htmlFor="wd-available-from" className="form-label">Available From</label><br/>
                <input className="form-control " type="date" id="wd-available-from" onChange={(e)=>setAvailableDate(e.target.value)} value={assignment ? assignment.fromDate : availableDate}></input>
                </div>
                <div className="col-6">
                <label htmlFor="wd-available-until" className="form-label">Until</label><br/>
                <input className="form-control" type="date" id="wd-available-until" onChange={(e)=>setUntilDate(e.target.value)} value={assignment ? assignment.untilDate : untilDate}></input>
                </div>
                </div>
            </div>
          </div>
          <div  className="col-3 text-end"></div>
          <div  className="col-5">
                
            </div>
          <div className="row">
          <div  className="col"><hr/></div>
            </div>
            <div className="row w-75 ">
            <div  className="d-flex justify-content-end mb-5">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-secondary me-1">Cancel</Link>
                <Link onClick={handleSubmit} to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
                </div>
            </div>

          </div>
        
      </div>
    );
  }
  