import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quiz:any) => {
    const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
}

export const createQuiz = async (courseId: string) =>{
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

export const findQuizzesForCourse = async (courseId:string)=> {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
}

export const findQuizById = async (id:string)=> {
    const response = await axios.get(`${QUIZZES_API}/${id}`);
    return response.data;
}

export const addQuestion = async(quiz:any, newQuestion: any) => {
    quiz.questions.push(newQuestion);
    const response = await updateQuiz(quiz);
    return response.data;
}

export const updateQuestion = async (quiz:any, updatedQuestion: any) =>{
    quiz.questions.map((q)=>(q._id === updatedQuestion._id) ? updatedQuestion : q);
    const response = await updateQuiz(quiz);
    return response.data;
}

export const deleteQuestion = async (quiz:any, questionId: string) => {
    quiz.questions = quiz.questions.filter((q: any)=> q._id !== questionId);
    return await updateQuiz(quiz);
}
