import react, { useState, useEffect } from "react"
import { useParams } from "react-router";
import * as client from "./client";
import * as userClient from "../People/client";
import * as profileClient from "../../Account/client";
import parse from 'html-react-parser';


export default function Quiz (quizParam:any) {
    const parse = require('html-react-parser').default;
    const { qid } = useParams();
    const { cid } = useParams();
    const [currentQuiz, setCurrentQuiz]= useState(quizParam);
    const [quizName, setQuizName] = useState(quizParam.name)
    const [quizDescription, setQuizDescription] = useState("");
    const [shuffle, setShuffle] = useState(false);
    const [timeLimit, setTimeLimit] = useState(0);
    const [attempts, setAttempts] = useState(false);
    const [numAttempts, setNumAttempts] = useState(1);
    const [oneQuestion, setOneQuestion] = useState(true);
    const [questions, setQuestions] = useState<any>([]);
    const [userAttempts, setUserAttempts] = useState([]);
    const [answers, setAnswers] = useState({});
    const [user, setUser] = useState({});
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState("");

    const loadAttempts = async () => {
        const fetchedAttempts = await userClient.getQuizAttempts(userId);
        setUserAttempts(fetchedAttempts);
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
    const fetchQuiz = async () => {
        if (!qid) return;
        const quiz = await client.findQuizById(qid);
        setCurrentQuiz(quiz);
        setQuizName(quiz.name);
        setQuizDescription(quiz.description);
        setShuffle(quiz.shuffle);
        setTimeLimit(quiz.timeLimit);
        setAttempts(quiz.multipleAttempts);
        setNumAttempts(quiz.numAttempts);
        setQuestions(quiz.questions);
    }
    useEffect(() => {
        if (qid) fetchQuiz();
        fetchUser();
        loadAttempts();
    }, [qid]);
    if (!qid) return null;

    const handleAnswerChange = (questionId, answer) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

   /* const handleSubmitAttempt = async () => {
        const attemptData = {
            quiz: qid,
            answers: Object.entries(answers).map(([questionId, answer]) => ({
                questionId,
                answer,
                correct: checkAnswer(questionId, answer)  // You need to define how to check the answer
            })),
            score: calculateScore(answers)  // Define how to calculate the total score
        };
        await userClient.addQuizAttempt(userId, attemptData);
        await loadAttempts();  // Reload attempts to show the new one
    };*/

    return (
        <div>
        <h2>{quizName}</h2>
        {quizDescription && (parse(quizDescription))}
        <h4>Questions:</h4>
        <ul className="list-group rounded-2 w-100">
        {questions.map((question)=>(
            <li className="wd-quiz-list-item list-group-item p-3 ps-3 mb-3 border rounded-2 w-75" key={question._id}>
                <div className="d-flex float-start w-100">
                <h4>{question.title}</h4>
                </div>
                <h6>Points: {" " + question.points}</h6>
                {parse(question.questionText)}
                {!(question.type.includes('FILL IN')) && (
                <div>
                {question.choices.map((choice)=>(
                    <div>
                        <input type="radio" name={question._id} id={choice._id}></input>
                        <label htmlFor={choice._id}>{choice.choiceText}</label>
                        
                        </div>
                ))}
                </div>
                )}
                {question.type.includes('FILL IN') && (
                    <div>
                        <input type="text"></input>
                    </div>
                )}
            </li>
        ))}
        </ul>
        <button className="btn btn-danger">Submit Quiz</button>
        </div>

    )
}