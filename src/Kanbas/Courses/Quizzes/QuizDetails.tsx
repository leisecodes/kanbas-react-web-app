import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import * as client from "./client";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import QuizEditor from "./QuizEditor";
import Quiz from "./Quiz";
import * as profileClient from "../../Account/client";
export default function QuizDetails() {

    const { qid } = useParams();
    const { cid } = useParams();
    const [quiz, setQuiz] = useState<any>({});
    const [quizName, setQuizName] = useState('');
    const [quizDescription, setQuizDescription] = useState('');
    const [points, setPoints] = useState();
    const [dueDate, setDueDate] = useState(new Date());
    const [availableDate, setAvailableDate] = useState(new Date());
    const [untilDate, setUntilDate] = useState(new Date());
    const [editing, setEditing] = useState(false);
    const [preview, setPreview] = useState(false);
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState("");
    const fetchQuiz = async () => {
        if (!qid) return;
        const quiz = await client.findQuizById(qid);
        setQuiz(quiz);
        setQuizName(quiz.name);
        setQuizDescription(quiz.description);
        const due = new Date(quiz.dueDate);
        const available = new Date(quiz.availableDate);
        const until = new Date(quiz.untilDate);
        setDueDate(due);
        const points = quiz.questions.reduce((acc, curr) => acc + curr.points, 0);
        setPoints(points);
        setAvailableDate(available);
        setUntilDate(until);
    }

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

    useEffect(() => {
        if (qid) fetchQuiz();
        fetchUser();
    }, [qid]);
    if (!qid) return null;

    const toggleEditing = () => {
        setEditing(!editing);
        fetchQuiz();
    }
    return (
        <div>
            {(!userRole.includes("FACULTY")) && (<div>
                <Quiz quizParam={quiz} />
            </div>)}

            {userRole.includes("FACULTY") && (
                <div>
                    {editing && (

                        <div>
                            <div className="d-flex justify-content-end align-items-center">
                                <div className="d-flex justify-content-center">
                                    <h4 className="float-end align-self-center"><span className="me-2">Points</span> {points}</h4>
                                    <button className="btn btn-lg btn-secondary ms-3 float-end align-self-center">
                                        <IoEllipsisVertical></IoEllipsisVertical>
                                    </button>
                                </div>
                            </div>
                            <hr />
                            <QuizEditor setEditing={toggleEditing} />
                        </div>

                    )

                    }



                    {preview && (
                        <div>
                            <Quiz quizParam={quiz} />
                        </div>
                    )}

                    {!editing && !preview && (
                        <div >
                            <div className="w-50 pb-5">
                                <button onClick={(e) => { setEditing(true) }} className="btn btn-secondary float-end"><FaPencil className="me-2" />Edit</button>
                                <button onClick={(e) => { setPreview(true) }} className="btn btn-secondary me-2 float-end">Preview</button>
                            </div>
                            <hr />
                            <h1 className="pb-4">{quiz.name}</h1>
                            <div className="row w-75 pb-1">
                                <div className="col text-end">
                                    <b>Quiz Type</b>
                                </div>
                                <div className="col">
                                    {quiz.type}
                                </div>
                            </div>
                            <div className="row w-75 pb-1">
                                <div className="col text-end">
                                    <b>Points</b>
                                </div>
                                <div className="col">
                                    {quiz.points}
                                </div>
                            </div>
                            <div className="row w-75 pb-1">
                                <div className="col text-end">
                                    <b>Assignment Group</b>
                                </div>
                                <div className="col">
                                    QUIZZES
                                </div>
                            </div>
                            <div className="row w-75 pb-1">
                                <div className="col text-end">
                                    <b>Shuffle Answers</b>
                                </div>
                                <div className="col">
                                    {quiz.shuffle ? "Yes" : "No"}
                                </div>
                            </div>
                            <div className="row w-75 pb-1">
                                <div className="col text-end">
                                    <b>Time Limit</b>
                                </div>
                                <div className="col">
                                    {quiz.timeLimit + ""} Minutes
                                </div>
                            </div>
                            <div className="row w-75 pb-1">
                                <div className="col text-end">
                                    <b>Multiple Attempts</b>
                                </div>
                                <div className="col">
                                    {quiz.multipleAttempts ? "Yes" : "No"}
                                </div>
                            </div>
                            {quiz.multipleAttempts && (
                                <div className="row w-75 pb-1">
                                    <div className="col text-end">
                                        <b>Allowed Attempts</b>
                                    </div>
                                    <div className="col">
                                        {quiz.numAttempts}
                                    </div>
                                </div>
                            )}
                            <div className="row w-75 pb-1">
                                <div className="col text-end">
                                    <b>Show Correct Answers</b>
                                </div>
                                <div className="col">
                                    {quiz.showAnswers}
                                </div>
                            </div>
                            <div className="row w-75 pb-1">
                                <div className="col text-end">
                                    <b>Access Code</b>
                                </div>
                                <div className="col">
                                    {quiz.accessCode}
                                </div>
                            </div>
                            <div className="row w-75 pb-1">
                                <div className="col text-end">
                                    <b>One Question at a Time</b>
                                </div>
                                <div className="col">
                                    {quiz.oneQuestion ? "Yes" : "No"}
                                </div>
                            </div>
                            <div className="row w-75 pb-1">
                                <div className="col text-end">
                                    <b>Webcam Required</b>
                                </div>
                                <div className="col">
                                    {quiz.webcam ? "Yes" : "No"}
                                </div>
                            </div>
                            <div className="row w-75 pb-4">
                                <div className="col text-end">
                                    <b>Lock Questions After Answering</b>
                                </div>
                                <div className="col">
                                    {quiz.lockQuestions ? "Yes" : "No"}
                                </div>
                            </div>
                            <div className="row w-75 border-bottom pb-2">
                                <div className="col-3">
                                    <b>Due</b>
                                </div>
                                <div className="col-3">
                                    <b>For</b>
                                </div>
                                <div className="col-3">
                                    <b>Available From</b>
                                </div>
                                <div className="col-3">
                                    <b>Until</b>
                                </div>
                            </div>
                            <div className="row w-75 border-bottom pb-2 pt-2 mb-2">
                                <div className="col-3">
                                    {dueDate.toDateString()}
                                </div>
                                <div className="col-3">
                                    Everyone
                                </div>
                                <div className="col-3">
                                    {availableDate.toDateString()}
                                </div>
                                <div className="col-3">
                                    {untilDate.toDateString()}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}


        </div>
    )
}