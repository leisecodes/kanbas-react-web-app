export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <h2><label htmlFor="wd-name">Assignment Name</label></h2>
        <input id="wd-name" value="A1 - ENV + HTML" />
        <br />
        <br />
        <textarea rows={10} cols={55} id="wd-description">
          The assignment is available online
          Submit a link to the landing page of your Web Application
          running on Netlify. The landing page should include the following:
          Your full name and section. Links to each of the lab assignments.
          Link to the Kanbas application. Links to all relevant source code 
          repositories. The Kanbas application should include a link to navigate 
          back to the landing page.
        </textarea>
        <br />
        <br/>
        <table>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" value={100} />
            </td>
          </tr>
          <br/>
          <tr>
            <td>
                <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
                <select id="wd-group">
                    <option value="Assignments">ASSIGNMENTS</option>
                    <option value="Quizzes">QUIZZES</option>
                    <option value="Discussions">DISCUSSIONS</option>
                </select>
            </td>
          </tr>
          <br/>
          <tr>
            <td>
                <label htmlFor="wd-display-grade-as">Display Grade As</label>
            </td>
            <td>
                <select id="wd-display-grade-as">
                    <option value="Percentage">Percentage</option>
                </select>
            </td>
          </tr>
          <br/>
          <tr>
            <td>
                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select id="wd-submission-type">
                    <option value="Online">Online</option>
                </select>
            </td>
          </tr>
          <br/>
          <tr>
            <td>
            </td>
            <td>
                Online Entry Options <br/>
                <input type="checkbox" name="wd-text-entry" id="wd-text-entry"></input>
                <label htmlFor="wd-text-entry">Text Entry</label>
                <br/>
                <input type="checkbox" name="wd-website-url" id="wd-website-url"></input>
                <label htmlFor="wd-website-url">Website URL</label>
                <br/>
                <input type="checkbox" name="wd-media-recordings" id="wd-media-recordings"></input>
                <label htmlFor="wd-media-recordings">Media Recordings</label>
                <br/>
                <input type="checkbox" name="wd-student-annotation" id="wd-student-annotation"></input>
                <label htmlFor="wd-student-annotation">Student Annotation</label>
                <br/>
                <input type="checkbox" name="wd-file-upload" id="wd-file-upload"></input>
                <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>
          <br/>
          <tr>
            <td>Assign</td>
            <td>
                <label htmlFor="wd-assign-to">Assign To</label><br/>
                <input type="text" name="wd-assign-to" id="wd-assign-to" value="Everyone"></input>
            </td>
          </tr>
          <tr>
            <td></td>
            <td>
                <label htmlFor="wd-due-date">Due</label><br/>
                <input type="date" id="wd-due-date"></input>
            </td>
          </tr>
          <br/>
          <tr>
            <td></td>
            <td>
                <label htmlFor="wd-available-from">Available From</label><br/>
                <input type="date" id="wd-available-from"></input>
            </td>
            <td>
                <label htmlFor="wd-available-until">Until</label><br/>
                <input type="date" id="wd-available-until"></input>
            </td>
          </tr>
          <br/>
          <tr>
                <td colSpan={3}><hr/></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>
                <button>Cancel</button>
                <button>Save</button>
                </td>
            </tr>
        </table>
      </div>
    );
  }
  