import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import { FaCaretDown } from "react-icons/fa"
import { setQuizzes, addQuiz, editQuiz, updateQuiz, deleteQuiz } from "./reducer";
import React, { useEffect, useState } from "react";
export default function QuizList () {
    const { cid } = useParams();
    const [numQuestions, setNumQuestions] = useState(0);
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(()=>{
        fetchQuizzes();
    }, []);

    return (
        <div id="wd-quizzes">
        <div id="wd-quiz-menu" className="mb-4">
        <button className="btn btn-lg btn-secondary me-1 mb-4 float-end">
        <IoEllipsisVertical></IoEllipsisVertical>
        </button>
        <button className="btn btn-lg btn-danger me-1 mb-4 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Quiz
        </button>
        
        </div>

        <ul id="wd-quizzes" className="list-group rounded-0 w-100">
        <li  className="wd-quiz list-group-item p-0  fs-5 border-gray ">
            <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-3 fs-3"/>
            <FaCaretDown className="me-2"/>
            Assignment Quizzes
            </div>
          </li>
          <div className="border border-end-0 border-top-0 border-bottom-0 border-4 border-success">
        {quizzes
        .filter((quiz : any) => quiz.course === cid)
        .map((quiz : any)=>(
        <li key={quiz._id} className="wd-quiz-list-item list-group-item p-3 ps-1">
            <div className="d-flex">
                <MdOutlineRocketLaunch className="me-3 ms-2 fs-3 text-success mr-auto align-self-center"/>
                <div className="flex-grow-1 mr-auto">
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} className="wd-quiz-link text-decoration-none">
                        <span className="text-black fw-bolder">{quiz.name}</span>
                    </Link>
                    <br />
                <span className="fw-bold me-1">Not available until</span> {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(new Date(quiz.availableDate))} at 12:00am | 
                <span className="fw-bold me-1"> Due</span> {new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(new Date(quiz.dueDate))} at 11:59pm | {quiz.points} pts |
                {" " + quiz.questions.length + " "} Questions
              </div>
              <div className="float-end d-flex">
                <GreenCheckmark />
                <IoEllipsisVertical className="ms-1 fs-4" />
    </div>
            </div>
        </li>

        ))
        
        }
        </div>
        </ul>
        </div>
    )
}