import "./styles.css";
import { Link } from "react-router-dom";
import { courses } from "../Database";

export default function Dashboard() {
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr className="wd-pagebreak" />
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row cols-md-5 g-4">
            {courses.map((course)=> (
              <div className="wd-dashboard-course col" style={{width: "260px"}}>
                <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none" >
                <div className="card rounded-3 overflow-hidden">
                  <img src={course.image} height="{160}" />
                  <div className="card-body">
                    <span className="wd-dashboard-course-link"
                      style={{ textDecoration: "none", color: "navy", fontWeight: "bold" }} >
                      {course.name}
                    </span>
                    <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                      {course.description}
                    </p>
                    <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          </div>
          </div>
          </div>

  );}
  