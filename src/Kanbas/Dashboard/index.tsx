import "./styles.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as client from "../Courses/People/client";
import * as profileClient from "../Account/client";
export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
      courses: any[]; course: any; setCourse: (course: any) => void;
      addNewCourse: () => void; deleteCourse: (course: any) => void;
      updateCourse: () => void;
    }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [createdCourses, setCreatedCourses] = useState([]);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState('');
  const [viewAll, setViewAll] = useState(false);
  const [userRole, setUserRole] = useState("");
  const fetchUser = async () => {
    try {
      const current = await profileClient.profile();
      setUser(current);
      setUserId(current._id);
      setUserRole(current.role)
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const enrolled = await client.getEnrolledCourses(userId);
      const created = await client.getCreatedCourses(userId);
      const test = enrolled.enrolledCourses;
      setEnrolledCourses(test);
      setCreatedCourses(created.createdCourses);
    } catch (error) {
      console.error("Error fetching courses", error);
      setMessage("Could not fetch courses");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchCourses();
    }
  }, [userId]);

  const handleEnroll = async (courseId) => {
    try {
      const newCourse = await client.enrollInCourse(userId, courseId);
      if (newCourse) {
        setEnrolledCourses([...enrolledCourses, newCourse]);
      }
    } catch (error) {
      console.error("Error enrolling in course", error);
    }
    fetchCourses();
  };

  const handleUnenroll = async (courseId) => {
    try {
      const updatedEnrolledCourses = await client.unenrollFromCourse(userId, courseId);
      setEnrolledCourses(updatedEnrolledCourses);
    } catch (error) {
      console.error("Error unenrolling from course", error);
    }
    fetchCourses();
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {userRole.includes('FACULTY') && (
        <div>
          <h5>New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click" onClick={addNewCourse}>Add</button>
            <button className="btn btn-warning float-end me-2"
              onClick={updateCourse} id="wd-update-course-click">
              Update
            </button>
          </h5>


          <br />
          <input value={course.name} className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })} />
          <textarea value={course.description} className="form-control"
            onChange={(e) => setCourse({ ...course, description: e.target.value })} />
          <hr />
        </div>
      )}


      <h3>Enrolled Courses</h3>
      {enrolledCourses.length > 0 ? (
        <div id="wd-dashboard-courses" className="row">
          <div className="row row-cols-1 row cols-md-5 g-4">
            {enrolledCourses.map((course: any) => (
              <div key={course._id} className="wd-dashboard-course col" style={{ width: "260px" }}>
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
                      
                      <button onClick={(e) => {
                        handleUnenroll(course._id);
                      }} className="btn btn-danger float-end"
                        id="wd-delete-course-click">
                        Unenroll
                      </button>
                      <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary float-end me-2">Go</Link>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No enrolled courses</p>
      )}

      {userRole.includes('FACULTY') && (
        <div>
          <h3>Created Courses</h3>
          {createdCourses.length > 0 ? (<div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row cols-md-5 g-4">
              {createdCourses.map((course: any) => (
                <div key={course._id} className="wd-dashboard-course col" style={{ width: "260px" }}>
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

                        <button onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          ) : (
            <p>No created courses</p>
          )}
        </div>
      )}

      <button className="btn btn-primary" onClick={(e)=>setViewAll(!viewAll)}>
        {viewAll ? (<div>Hide</div>):(<div>View All</div>)}
      </button>
      {viewAll && (
        <div>
          <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr className="wd-pagebreak" />
          <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row cols-md-5 g-4">
              {courses.map((course: any) => (
                <div key={course._id} className="wd-dashboard-course col" style={{ width: "260px" }}>
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
                        <button onClick={(e) => {
                          handleEnroll(course._id);
                        }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Enroll
                        </button>
                      </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>

  );
}
