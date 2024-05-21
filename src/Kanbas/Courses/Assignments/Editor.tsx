export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <h5><label htmlFor="wd-name" className="form-label">Assignment Name</label></h5>
        <input id="wd-name" className="form-control" value="A1" />
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
        <table>
          <div className="row">
            <div  className="col">
              <label htmlFor="wd-points" className="form-label">Points</label>
            </div>
            <div className="col">
              <input className="form-control" id="wd-points" value={100} />
            </div>
          </div>
          <br/>
          <div className="row">
            <div  className="col">
                <label htmlFor="wd-group" className="form-label">Assignment Group</label>
            </div>
            <div  className="col">
                <select className="form-select" id="wd-group">
                    <option value="Assignments">ASSIGNMENTS</option>
                    <option value="Quizzes">QUIZZES</option>
                    <option value="Discussions">DISCUSSIONS</option>
                </select>
            </div>
          </div>
          <br/>
          <div className="row">
          <div  className="col">
                <label htmlFor="wd-display-grade-as" className="form-label">Display Grade As</label>
            </div>
            <div  className="col">
                <select className="form-select" id="wd-display-grade-as">
                    <option value="Percentage">Percentage</option>
                </select>
            </div>
          </div>
          <br/>
          
          <div className="row d-flex">
            <div className="col">
                <label htmlFor="wd-submission-type" className="form-label">Submission Type</label>
            </div>
            <div className="border border-dark rounded-1">
            <div className="col">
                <select className="form-select" id="wd-submission-type">
                    <option value="Online">Online</option>
                </select>
          
              <br/>
                Online Entry Options <br/>
                <div className="form-check">
                <input className="form-check-input" type="checkbox" name="wd-text-entry" id="wd-text-entry"></input>
                <label htmlFor="wd-text-entry" className="form-check-label">Text Entry</label>
                <br/>
                <input className="form-check-input" type="checkbox" name="wd-website-url" id="wd-website-url"></input>
                <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
                <br/>
                <input className="form-check-input" type="checkbox" name="wd-media-recordings" id="wd-media-recordings"></input>
                <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
                <br/>
                <input className="form-check-input" type="checkbox" name="wd-student-annotation" id="wd-student-annotation"></input>
                <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
                <br/>
                <input className="form-check-input" type="checkbox" name="wd-file-upload" id="wd-file-upload"></input>
                <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
                </div>
          </div>
          </div>
          </div>
          <br/>
          <div className="row">
          <div  className="col">Assign</div>
          <div  className="col">
                <label htmlFor="wd-assign-to" className="form-label">Assign To</label><br/>
                <input className="form-control" type="text" name="wd-assign-to" id="wd-assign-to" value="Everyone"></input>
            </div>
          </div>
          <div className="row">
          <div  className="col"></div>
          <div  className="col">
                <label htmlFor="wd-due-date" className="form-label">Due</label><br/>
                <input className="form-control" type="date" id="wd-due-date"></input>
            </div>
          </div>
          <br/>
          <div className="row">
          <div  className="col"></div>
          <div  className="col">
                <label htmlFor="wd-available-from" className="form-label">Available From</label><br/>
                <input className="form-control" type="date" id="wd-available-from"></input>
            </div>
            <div  className="col">
                <label htmlFor="wd-available-until" className="form-label">Until</label><br/>
                <input className="form-control" type="date" id="wd-available-until"></input>
            </div>
          </div>
          <br/>
          <div className="row">
          <div  className="col"><hr/></div>
            </div>
            <div className="row">
            <div  className="col"></div>
            <div  className="col"></div>
            <div  className="col d-flex">
                <button className="btn btn-secondary">Cancel</button>
                <button className="btn btn-danger">Save</button>
                </div>
            </div>
        </table>
      </div>
    );
  }
  