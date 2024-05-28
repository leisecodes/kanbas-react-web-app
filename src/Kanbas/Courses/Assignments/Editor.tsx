import { Link, useParams } from "react-router-dom";
import { assignments } from "../../Database";
import { courses } from "../../Database";
export default function AssignmentEditor() {
    const { aid } = useParams();
    const { cid } = useParams();
    const currentAssignment = assignments.filter((assignment)=>assignment._id===aid);
    const currentCourse = courses.filter((course)=>course._id===cid);

    return (
      
      <div id="wd-assignments-editor">
        
        {currentAssignment.map((assignment)=>(
          <div>
          <h5><label htmlFor="wd-name" className="form-label">Assignment Name</label></h5>
          <input id="wd-name" className="form-control" value={assignment.title} />
          <br />
          <br />

          <textarea className="form-control" rows={10} cols={55} id="wd-description">
          The assignment is available online
          
          Submit a link to the landing page of your Web Application
          running on Netlify.
          
          The landing page should include the following:
          
          Your full name and section
          Links to each of the lab assignments
          Link to the Kanbas application
          Links to all relevant source code repositories
          
          The Kanbas application should include a link to navigate 
          back to the landing page.
        </textarea>
        <br />
        <br/>

        <div className="row">
            <div  className="col-3 text-end">
              <label htmlFor="wd-points" className="form-label">Points</label>
            </div>
            <div className="col-5">
              <input className="form-control" id="wd-points" value={assignment.points} />
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
                <input className="form-control mb-3" type="date" id="wd-due-date" value={assignment.dueDate}></input>
                <div className="row">
                <div className="col-6">
                <label htmlFor="wd-available-from" className="form-label">Available From</label><br/>
                <input className="form-control " type="date" id="wd-available-from" value={assignment.fromDate}></input>
                </div>
                <div className="col-6">
                <label htmlFor="wd-available-until" className="form-label">Until</label><br/>
                <input className="form-control" type="date" id="wd-available-until" value={assignment.dueDate}></input>
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
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-danger">Save</Link>
                </div>
            </div>

          </div>
        ))}
      </div>
    );
  }
  