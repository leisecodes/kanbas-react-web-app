import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical } from "react-icons/bs";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPlus } from "react-icons/fa";
import { MdUnpublished } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { FaCaretDown } from "react-icons/fa"
import { setQuizzes, addQuiz, editQuiz, updateQuiz, deleteQuiz } from "./reducer";
import * as profileClient from "../../Account/client";
import React, { useEffect, useState } from "react";
export default function QuizList () {
    const { cid } = useParams();
    const navigate = useNavigate();
    const [numQuestions, setNumQuestions] = useState(0);
    const [published, setPublished] = useState(false);
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState("");
    const today = new Date();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };

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

    useEffect(()=>{
        fetchQuizzes();
        fetchUser();
    }, []);

    const handleCreateQuiz = async () => {
        const newQuiz = await client.createQuiz(cid as string);
        fetchQuizzes();
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`);
    };

    const handlePublish = async (quiz, val) => {
        const updatedQuiz = {
            ...quiz,
            isPublished: val
        };
        try {
            const response = await client.updateQuiz(updatedQuiz);
        } catch (error) {
            console.error('Failed to update publish status:', error);
        }
        fetchQuizzes();
    };
    
    return (
        <div id="wd-quizzes">
        <div id="wd-quiz-menu" className="mb-4">
        <button className="btn btn-lg btn-secondary me-1 mb-4 float-end">
        <IoEllipsisVertical></IoEllipsisVertical>
        </button>
        {userRole.includes("FACULTY") && (
            <div>
            <button onClick={(e)=>handleCreateQuiz()} className="btn btn-lg btn-danger me-1 mb-4 float-end">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Quiz
            </button>
            {quizzes.length <= 0 && (<h4 className="mt-2 align-self-center">No quizzes added. Select + Quiz to create a new quiz.</h4> )}
            </div>
        )}
        
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
                <div className="d-flex">
                {quiz.availableDate > today.toISOString() && (<p><b>Not available until</b> {new Date(quiz.availableDate).toDateString()} | </p>)}
                {(quiz.availableDate < today.toISOString()) && (quiz.untilDate > today.toISOString()) && (<p><b>Available until</b> {new Date(quiz.untilDate).toDateString()} | </p>)}
                {quiz.availableDate < today.toISOString() && (quiz.untilDate < today.toISOString()) && (<b>Closed | </b>)}
                <span className="fw-bold me-1"> Due</span> {new Date(quiz.dueDate).toDateString()} at 11:59pm | {quiz.points} pts |
                {" " + quiz.questions.length + " "} Questions
                </div>
              </div>
              {userRole.includes("FACULTY") && (
                    <div className="float-end d-flex">
                    {quiz.isPublished ? (<div onClick={(e)=>handlePublish(quiz, false)}><GreenCheckmark /></div>):(<div onClick={(e)=>handlePublish(quiz, true)}><MdUnpublished className="fs-4"/></div>)}
                    
                    <IoEllipsisVertical className="ms-1 fs-4" />
                  </div>
              )}
              
            </div>
        </li>

        ))
        
        }
        </div>
        </ul>
        </div>
    )
}