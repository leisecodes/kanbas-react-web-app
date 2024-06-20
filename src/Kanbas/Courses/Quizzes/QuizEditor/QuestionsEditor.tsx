import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { MdOutlineCancel } from "react-icons/md";

export default function QuestionEditor ({ question, onSave, onCancel }) {
    const editorRef = useRef(null);
    const generateUniqueId = () => {
        return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };
    const [currentQuestion, setCurrentQuestion] = useState(question);
    const [questionTitle, setQuestionTitle] = useState(currentQuestion.title);
    const [questionText, setQuestionText] = useState(currentQuestion.questionText);
    const [questionType, setQuestionType] = useState(currentQuestion.type);
    const [points, setPoints] = useState(currentQuestion.points);

    const [answers, setAnswers] = useState(currentQuestion.choices || []);
    const handleSave = () => {
        // Save the updated question text and answers (implement save logic)
        currentQuestion.questionText = questionText;
        currentQuestion.type = questionType;
        currentQuestion.title = questionTitle;
        currentQuestion.points = points;
        onSave(currentQuestion);
    };


    const handleAnswerTextChange = (answerId, newText) => {
        const updatedChoices = currentQuestion.choices.map(choice =>
            choice._id === answerId ? { ...choice, choiceText: newText } : choice
        );
        const updatedQuestion = { ...currentQuestion, choices: updatedChoices };
        setCurrentQuestion(updatedQuestion);
        //onUpdateQuestion(updatedQuestion); // Ensure this updates the parent state as well
    };

    // Handle adding a new answer choice
    const handleAddAnswer = (truth:Boolean) => {
        const newAnswer = { _id: generateUniqueId(), choiceText: '', isCorrect: truth };
        const updatedChoices = [...currentQuestion.choices, newAnswer];
        const updatedQuestion = { ...currentQuestion, choices: updatedChoices };
        setCurrentQuestion(updatedQuestion);
        //onUpdateQuestion(updatedQuestion); // Ensure this updates the parent state as well
    };

    // Handle selecting the correct answer
    const handleCorrectAnswerChange = (answerId) => {
        const updatedChoices = currentQuestion.choices.map(choice =>
            ({ ...choice, isCorrect: choice._id === answerId })
        );
        const updatedQuestion = { ...currentQuestion, choices: updatedChoices };
        setCurrentQuestion(updatedQuestion);
        //onUpdateQuestion(updatedQuestion);
    };


    const handleDeleteAnswer = (answerId) => {
        const updatedAnswers = answers.filter((answer) => answer._id !== answerId);
        setAnswers(updatedAnswers);
    };

    useEffect(() => {
        setCurrentQuestion(question);
    }, [question]);
    
    return (
        <div>
           
        <li className="wd-quiz-list-item list-group-item p-3 pb-5 ps-3 pe-4 mb-3 border rounded-2 w-75" key={question._id}>
                                <div className="d-flex float-start w-100">
                                <input id="wd-question-title" className="form-control w-50" placeholder="" onChange={(e)=>setQuestionTitle(e.target.value)} value={questionTitle}></input>
                                <select value={questionType} onChange={(e)=>setQuestionType(e.target.value)} className="form-select float-start w-25 pb-2 ms-2" >
                                <option value="MULTIPLE CHOICE">Multiple Choice</option>
                                <option value="TRUE/FALSE">True or False</option>
                                <option value="FILL IN">Fill in the Blank</option>
                                </select>
                                <div className="text-start align-items-center">
                                    <label className="align-self-center fs-6 ms-2" htmlFor="wd-points"><b>pts:</b></label>
                                </div>
                                <div className="">
                                    <input id="wd-points" className="form-control align-self-center ms-2" placeholder="" onChange={(e)=>setPoints(e.target.value)} value={points}></input>
                                </div>
                                </div>
                                {question.type.includes("MULTIPLE CHOICE") && (
                                    <div>Enter your question and multiple answers, then select the one correct answer.</div>
                                )
                                }
                                {question.type.includes("TRUE/FALSE") && (
                                    <div>Enter your question text, then select if True or False is the correct answer</div>
                                )
                                }
                                {question.type.includes("FILL IN") && (
                                    <div>Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.</div>
                                )
                                }
                                <b>Question:</b>

                                <>
                        <Editor
                            apiKey='dsidvj3cjenxotusgw0215r0n0ga3nc3fq67kqap58ji0s17'
                            onInit={(_evt, editor) => editorRef.current = editor}
                            
                            value={questionText}
                            onEditorChange={(newValue, editor)=>setQuestionText(newValue)}
                            init={{
                                height: 200,
                                width: 750,
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
                    <div className="mb-3 mt-3"><b>Answers:</b></div>

                                {currentQuestion.choices.map((c: any) => (
                                    <div key={c._id}>
                                     {currentQuestion.type.includes("MULTIPLE CHOICE") && (
                                    <div>
                                        <div className="d-flex w-100 mt-2">
                                        <input className="form-check-input ms-1" value={c.choiceText} onChange={(e)=>handleCorrectAnswerChange(c._id)}  type="radio" name={currentQuestion.id} id={c._id}></input>
                                        <label className="form-check-label ps-2 d-flex w-100" htmlFor="flexRadioDefault1">
                                            <input id="wd-question-answer w-50" type="text" className="form-control" onChange={(e)=>handleAnswerTextChange(c._id, e.target.value)} placeholder="" value={c.choiceText}></input>
                                        </label>
                                        <MdOutlineCancel className='fs-3 text-danger ms-1' onClick={(e)=>handleDeleteAnswer(c._id)}/>
                                        </div>
                                    </div>
                                    
                                    )} 
                                    {question.type.includes("TRUE/FALSE") && (
                                    <div>
                                    <div className="d-flex w-100 mt-2">
                                    <input className="form-check-input ms-1" value={c.choiceText} type="radio" name={currentQuestion._id} onChange={(e)=>handleCorrectAnswerChange(c._id)} id={c._id}></input>
                                    <label className="form-check-label ps-2 d-flex w-100" htmlFor="flexRadioDefault1">
                                        {c.choiceText}
                                    </label>
                                    </div>
                                </div>
                                    )}
                                    {question.type.includes("FILL IN") && (
                                    <div>
                                    <div className="d-flex w-100 mt-2">
                                    <input id="wd-question-answer w-50" className="form-control" onChange={(e)=>handleAnswerTextChange(c._id, e.target.value)} placeholder="" value={c.choiceText}></input>
                                    <MdOutlineCancel className='fs-3 text-danger ms-1' onClick={(e)=>handleDeleteAnswer(c._id)}/>
                                    </div>
                                </div>
                                    )}     
                                    </div>
                                ))}
                                {(question.type.includes("MULTIPLE CHOICE")) && (
                                    <button className="btn btn-primary mt-2 float-end" onClick={(e)=>{handleAddAnswer(false)}}>Add Choice</button>
                                )}
                                {(question.type.includes("FILL IN")) && (
                                    <button className="btn btn-primary mt-2 float-end" onClick={(e)=>{handleAddAnswer(true)}}>Add Choice</button>
                                )}
                                
                                <div className="d-flex float-start mt-2">
                                <button className="btn btn-secondary me-2" onClick={(e)=>onCancel(currentQuestion._id)}>Cancel</button>
                                <button className="btn btn-danger  " onClick={(e)=>handleSave()}>Save</button>
                                </div>
                            </li> */
            
        </div>
    )
}