import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import { FaBars } from "react-icons/fa6";
import { Navigate, Route, Routes, useParams, useLocation } from 'react-router-dom';
import Grades from "./Grades/Grades";
import PeopleTable from "./People/Table";
import QuizList from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import DetailsEditor from "./Quizzes/QuizEditor/DetailsEditor";
import QuestionEditor from "./Quizzes/QuizEditor/QuestionsEditor";
import QuizEditor from "./Quizzes/QuizEditor";
export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course)=>course._id===cid);
  const { pathname } = useLocation();
  console.log(cid + 'cid is:');
  return (
    <div id="wd-courses">
      <div className="d-flex">
      <h2 className="text-danger">
      <FaBars className="me-4 align-self-center text-danger"/>
      { course && course.name } &gt; {pathname.split("/")[4]}
      </h2>
      </div>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
            <CoursesNavigation />
        </div>
        <div className="flex-fill">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments"
                     element={<Assignments/>} />
              <Route path="Assignments/:id"
                     element={<AssignmentEditor/>} />
              <Route path="People" element={<PeopleTable />}/>
              <Route path="People/:uid" element={<PeopleTable />} />
              <Route path="Grades"
                     element={<Grades/>}/>
              <Route path="Quizzes" element={<QuizList/>}/>
              <Route path="Quizzes/:qid" element={<QuizDetails />}/>
              <Route path="Quizzes/:qid/*" element={<QuizEditor setEditing={""}/>}/>
            </Routes>
            </div>
          </div>
    </div>
);}
