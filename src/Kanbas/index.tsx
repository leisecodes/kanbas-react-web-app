import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import "./styles.css";
import AssignmentEditor from "./Courses/Assignments/Editor";
import * as client from "./Courses/client";
import { useState, useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import QuizDetails from "./Courses/Quizzes/QuizDetails";
import DetailsEditor from "./Courses/Quizzes/QuizEditor/DetailsEditor";
import QuestionEditor from "./Courses/Quizzes/QuizEditor/QuestionsEditor";
export default function Kanbas() {
  
  const [courses, setCourses] = useState<any[]>([]);
  const fetchCourses = async () => {
    const courses = await client.fetchAllCourses();
    setCourses(courses);
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    setCourses([ ...courses, newCourse ]);
  };

  const deleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setCourses(courses.filter(
      (c) => c._id !== courseId));
  };

  const updateCourse = async () => {
    await client.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };


  return (
    <Provider store={store}>
    <div id="wd-kanbas" className="h-100">
      <div className="d-flex h-100">
      <div className="d-none d-md-block bg-black wd-nav">
      <KanbasNavigation />
      </div>
    
    <div className="flex-fill p-4">
          <Routes>
              <Route path="/" element={<Navigate to="Dashboard" />} />
              <Route path="/Account/*" element={<Account/>}/>
              <Route path="Dashboard" element={<ProtectedRoute><Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}/>
</ProtectedRoute>} />
              <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses}/></ProtectedRoute>} />
              <Route path="Courses/:cid/Assignments/:aid/*" element={<AssignmentEditor/>}/>
              <Route path="Courses/:cid/Assignments/new" element={<AssignmentEditor/>}/>
              <Route path="Courses/:cid/Quizzes/:qid/*" element={<QuizDetails/>}/>
            </Routes>
      </div>
      </div>
    </div>
    </Provider>
);}

