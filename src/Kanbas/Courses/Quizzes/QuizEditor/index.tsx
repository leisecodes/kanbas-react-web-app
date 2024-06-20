import { Provider } from "react-redux";
import { Route, Routes, Navigate, useNavigate, Link, useLocation, useParams } from "react-router-dom";
import store from "../../../store";
import DetailsEditor from "./DetailsEditor";
import QuestionEditor from "./QuestionsEditor";
import Links from "./Links";
import React, { useState, useEffect } from "react";
import Quiz from "../Quiz";
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import * as client from "../client";
export default function QuizEditor({setEditing}) {
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const { pathname } = useLocation();
    const { qid } = useParams();
    const { cid } = useParams();
    const [questionEdit, setQuestionEdit] = useState(false);
    const [editingQuestions, setEditingQuestions] = useState([]);
    const [quiz, setQuiz] = useState<any>({});
    const [quizName, setQuizName] = useState("");
    const [quizDescription, setQuizDescription] = useState("");
    const [type, setType] = useState("");
    const [group, setGroup] = useState("");
    const [shuffle, setShuffle] = useState(true);
    const [timeLimit, setTimeLimit] = useState(0);
    const [dueDate, setDueDate] = useState("");
    const [availableDate, setAvailableDate] = useState("");
    const [untilDate, setUntilDate] = useState("");
    const [attempts, setAttempts] = useState(false);
    const [numAttempts, setNumAttempts] = useState(1);
    const [oneQuestion, setOneQuestion] = useState(true);
    const [webcam, setWebcam] = useState(false);
    const [lock, setLock] = useState(false);
    const [showAnswers, setShowAnswers] = useState("");
    const [code, setCode] = useState("");
    const [questions, setQuestions] = useState<any>({});
    const [published, setPublished] = useState(false);
    const fetchQuiz = async () => {
        if (!qid) return;
        const quiz = await client.findQuizById(qid);
        setQuiz(quiz);
        setQuizName(quiz.name);
        setQuizDescription(quiz.description);
        setType(quiz.type);
        setGroup(quiz.assignmentGroup);
        setShuffle(quiz.shuffle);
        setTimeLimit(quiz.timeLimit);
        setDueDate(quiz.dueDate);
        setAvailableDate(quiz.availableDate);
        setUntilDate(quiz.untilDate);
        setAttempts(quiz.multipleAttempts);
        setNumAttempts(quiz.numAttempts);
        setOneQuestion(quiz.oneQuestion);
        setWebcam(quiz.webcam);
        setLock(quiz.lockQuestions);
        setShowAnswers(quiz.showAnswers);
        setCode(quiz.accessCode);
        setQuestions(quiz.questions);
        setPublished(quiz.isPublished);
    }
    useEffect(() => {
        if (qid) fetchQuiz();
    }, [qid]);
    if (!qid) return null;

    const toggleEditQuestion = (questionId) => {
        setEditingQuestions((prev) =>
            prev.includes(questionId)
                ? prev.filter((id) => id !== questionId)
                : [...prev, questionId]
        );
    };

    const generateUniqueId = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };

    const handleSaveQuestion = (updatedQuestion) => {
        const updatedQuestions = questions.map((question) =>
            question._id === updatedQuestion._id ? updatedQuestion : question
        );
        setQuiz({ ...quiz, questions: updatedQuestions });
        setQuestions(updatedQuestions);
        toggleEditQuestion(updatedQuestion._id); // Exit edit mode after saving
    };

    const handleCancelQuestion = (qid) => {
        toggleEditQuestion(qid);
    };


    const addNewQuestion = () => {
        const newQuestion = {
            _id: generateUniqueId(),
            title: 'New Question',
            questionText: '',
            type: 'MULTIPLE CHOICE',
            points: 0,
            choices: [],
        };
        setQuestions([...questions, newQuestion]);
        setQuiz({ ...quiz, questions: questions });
    };

    const deleteQuestion = (questionId) => {
        const updatedQuestions = questions.filter((question) => question._id !== questionId);
        setQuestions(updatedQuestions)
        setQuiz({ ...quiz, questions: questions });
    };

    const handleUpdateQuestion = (updatedQuestion) => {
        const updatedQuestions = quiz.questions.map(q =>
            q._id === updatedQuestion._id ? updatedQuestion : q
        );
        setQuiz({ ...quiz, questions: updatedQuestions });
    };

    const handleSave = async () => {
        quiz.name = quizName;
        quiz.description = quizDescription;
        quiz.type = type;
        quiz.assignmentGroup = group;
        quiz.shuffle = shuffle;
        quiz.timeLimit = timeLimit;
        quiz.dueDate = dueDate;
        quiz.availableDate = availableDate;
        quiz.untilDate = untilDate;
        quiz.multipleAttempts = attempts;
        quiz.numAttempts = numAttempts;
        quiz.oneQuestion = oneQuestion;
        quiz.webcam = webcam;
        quiz.lockQuestions = lock;
        quiz.showAnswers = showAnswers;
        quiz.accessCode = code;
        quiz.questions = questions;

        await client.updateQuiz(quiz)
        setEditing(false);
    };

    const handleSaveandPublish = async ()=> {
        setPublished(true);
        quiz.isPublished = true;
        handleSave();
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);

    };

    const handleCancel = () => {
        setEditing(false);
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    };


    return (
        <div>
            <h1>Quiz Editor</h1>
            <div id="wd-courses-navigation" className="">
                <ul className="nav nav-tabs">
                    <li className="nav-item"><button className="nav-link" onClick={(e) => { setQuestionEdit(false) }}>Details</button></li>
                    <li className="nav-item"><button className="nav-link" onClick={(e) => { setQuestionEdit(true) }}>Questions</button></li>
                </ul>
            </div>


            {!questionEdit && (
                <div>
                    <input id="wd-name" className="form-control w-50 mt-3 mb-3" placeholder="Quiz Name" onChange={(e)=>setQuizName(e.target.value)} value={quizName}></input>
                    Quiz Instructions:
                    <>
                        <Editor
                            apiKey='dsidvj3cjenxotusgw0215r0n0ga3nc3fq67kqap58ji0s17'
                            onInit={(_evt, editor) => editorRef.current = editor}
                            value={quizDescription}
                            onEditorChange={(newValue, editor) => setQuizDescription(newValue)}
                            init={{
                                height: 250,
                                width: 1000,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </>

                    <div className="row w-75">
                        <div className="col-6 text-end">
                            Quiz Type:
                        </div>
                        <div className="col-6">
                            <select value={type} onChange={(e) => setType(e.target.value)} className="form-select float-start w-100 pb-2" >
                                <option value="GRADED QUIZ">Graded Quiz</option>
                                <option value="PRACTICE QUIZ">Practice Quiz</option>
                                <option value="GRADED SURVEY">Graded Survey</option>
                                <option value="UNGRADED SURVEY">Ungraded Survey</option>
                            </select>
                        </div>
                    </div>
                    <div className="row w-75">
                        <div className="col-6 text-end">
                            Assignment Group:
                        </div>
                        <div className="col-6">
                            <select value={group} onChange={(e) => setGroup(e.target.value)} className="form-select float-start w-100 pb-2" >
                                <option value="QUIZZES">Quizzes</option>
                                <option value="ASSIGNMENTS">Assignments</option>
                                <option value="EXAMS">Exams</option>
                                <option value="PROJECTS">Projects</option>
                            </select>
                        </div>
                    </div>
                    <div className="row w-75">
                        <div className="col-6 text-end">
                        </div>
                        <div className="col-6">
                            <b>Options</b>
                        </div>
                    </div>
                    <div className="row w-75">
                        <div className="col-6 text-end">
                        </div>
                        <div className="col-6">
                            <input defaultChecked={shuffle} onChange={(e) => { setShuffle(e.target.checked) }} className="form-check-input" type="checkbox" name="wd-shuffle" id="wd-shuffle"></input>
                            <label htmlFor="wd-shuffle" className="form-check-label ms-2 pb-2">Shuffle Answers</label>
                        </div>
                    </div>
                    <div className="row w-75 align-items-center">
                        <div className="col-6 text-end">
                        </div>
                        <div className="col-2 d-flex">
                            <input defaultChecked={!(timeLimit === 0)} onChange={(e) => { !(e.target.checked) ? setTimeLimit(0) : setTimeLimit(timeLimit); }} className="form-check-input" type="checkbox" name="wd-time" id="wd-time"></input>
                            <label htmlFor="wd-time" className="form-check-label ms-2 pb-2">Time Limit</label>
                        </div>
                        <div className="col-1 text-end">
                            <input id="wd-minutes" type="number" className="form-control align-self-center" placeholder="" onChange={(e)=>setTimeLimit(e.target.valueAsNumber)} value={timeLimit}></input>
                        </div>
                        <div className="col-3 text-start">
                            <label className="align-self-center" htmlFor="wd-minutes">Minutes</label>
                        </div>
                    </div>
                    <div className="row w-75">
                        <div className="col-6 text-end">
                        </div>
                        <div className="col-6">
                            <input defaultChecked={attempts} onChange={(e) => { setAttempts(e.target.checked) }} className="form-check-input" type="checkbox" name="wd-attempts" id="wd-attempts"></input>
                            <label htmlFor="wd-attempts" className="form-check-label ms-2 pb-2">Allow Multiple Attempts</label>
                        </div>
                    </div>
                    {attempts && (
                        <div className="row w-75 align-items-center">
                            <div className="col-6 text-end">
                            </div>
                            <div className="col-6 d-flex">
                                <div className="col-2">
                                    <input id="wd-attemptNum" type="number" className="form-control align-self-center" placeholder="" value={numAttempts} onChange={(e)=>setNumAttempts(e.target.valueAsNumber)}></input>
                                </div>
                                <div className="col-5 text-start align-items-center">
                                    <label className="align-self-center ms-2" htmlFor="wd-attemptNum">Allowed Attempts</label>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="row w-75">
                        <div className="col-6 text-end">
                        </div>
                        <div className="col-6">
                            <input defaultChecked={oneQuestion} onChange={(e) => { setOneQuestion(e.target.checked) }} className="form-check-input" type="checkbox" name="wd-oneQuestion" id="wd-oneQuestion"></input>
                            <label htmlFor="wd-oneQuestion" className="form-check-label ms-2 pb-2">Show One Question at a Time</label>
                        </div>
                    </div>
                    <div className="row w-75">
                        <div className="col-6 text-end">
                        </div>
                        <div className="col-6">
                            <input defaultChecked={webcam} onChange={(e) => { setWebcam(e.target.checked) }} className="form-check-input" type="checkbox" name="wd-webcam" id="wd-webcam"></input>
                            <label htmlFor="wd-webcam" className="form-check-label ms-2 pb-2">Webcam Required</label>
                        </div>
                    </div>
                    <div className="row w-75">
                        <div className="col-6 text-end">
                        </div>
                        <div className="col-6">
                            <input defaultChecked={lock} onChange={(e) => { setLock(e.target.checked) }} className="form-check-input" type="checkbox" name="wd-lock" id="wd-lock"></input>
                            <label htmlFor="wd-lock" className="form-check-label ms-2 pb-2">Lock Questions after Answering</label>
                        </div>
                    </div>
                    <div className="row w-75">
                        <div className="col-6 text-end">
                            Show Correct Answers
                        </div>
                        <div className="col-6">
                            <select value={showAnswers} onChange={(e) => setShowAnswers(e.target.value)} className="form-select float-start w-100 pb-2" >
                                <option value="IMMEDIATELY">Immediately</option>
                                <option value="AFTER DUE DATE">After Due Date</option>
                                <option value="NEVER">Never</option>
                            </select>
                        </div>
                    </div>
                    <div className="row w-75">
                        <div className="col-6 text-end">
                            Access Code
                        </div>
                        <div className="col-6">
                            <input id="wd-code" className="form-control" placeholder="" value={code} onChange={(e)=>setCode(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row w-75">
                        <div className="col-6 text-end">
                            Assign
                        </div>
                        <div className="col-5 ms-3 border border-grey p-3 rounded-1 mb-3">
                            <label htmlFor="wd-assign-to" className="form-label"><b>Assign To</b></label><br />
                            <input className="form-control mb-3" type="text" name="wd-assign-to" id="wd-assign-to" value="Everyone"></input>
                            <label htmlFor="wd-due-date" className="form-label"><b>Due</b></label><br />
                            <input className="form-control mb-3" type="date" id="wd-due-date" onChange={(e) => setDueDate(e.target.value)} value={dueDate}  ></input>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="wd-available-from" className="form-label"><b>Available From</b></label><br />
                                    <input className="form-control " type="date" id="wd-available-from" onChange={(e) => setAvailableDate(e.target.value)} value={availableDate} ></input>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="wd-available-until" className="form-label"><b>Until</b></label><br />
                                    <input className="form-control" type="date" id="wd-available-until" onChange={(e) => setUntilDate(e.target.value)} value={untilDate} ></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-secondary me-2" onClick={(e)=>handleCancel()}>Cancel</button>
                        <button className="btn btn-danger me-2" onClick={(e)=>handleSave()}>Save</button>
                        <button className="btn btn-primary" onClick={(e)=>handleSaveandPublish()}>Save and Publish</button>
                    </div>
                </div>

            )}
            {questionEdit && 
                (   <div>
                    <button className="btn btn-danger mb-3 mt-3 ms-1" onClick={(e)=>addNewQuestion()}>New Question</button>
                    <ul className="list-group rounded-2 w-100">
                        {questions.map((q: any) => (
                            <div key="q._id">
                            {!editingQuestions.includes(q._id) ? (
                            <li className="wd-quiz-list-item list-group-item p-3 ps-3 mb-3 border rounded-2 w-75" key={q._id}>
                                <div className="d-flex float-start w-100">
                                <h3>{q.title}</h3>
                                <div className="d-flex float-end">
                                <button className="btn btn-secondary float-end ms-5 me-2" onClick={(e)=>toggleEditQuestion(q._id)}>Edit</button>
                                <button className="btn btn-danger float-end" onClick={(e)=>deleteQuestion(q._id)}>Delete</button>
                                </div>
                                </div>
                                Points: {q.points}
                                <p>{q.questionText}</p>
                                {q.choices.map((c: any) => (
                                    <li className="wd-quiz-list-item list-group-item p-2 ps-1 w-100" key={c._id}>
                                        {!(q.type.includes("FILL IN")) && (
                                            <div>
                                            <input className="form-check-input ms-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                                            <label className="form-check-label ps-2" htmlFor="flexRadioDefault1">
                                            {c.choiceText}
                                    
                                            </label>
                                            </div>
                                        )}
                                        {q.type.includes("FILL IN") && (
                                            <div>
                                                {c.choiceText}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </li>
                            ):
                            (
                            <QuestionEditor question={q} onSave={handleSaveQuestion} onCancel={handleCancelQuestion}/>
                              
                            )}
                            </div>
                        ))
                        }
                    </ul>
                    </div>
                )
            }

        </div>
    )
}