import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
};

const quizSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action)=> {
            state.quizzes = action.payload;
        },
        addQuiz: (state, { payload: quiz }) => {
            state.quizzes = [...state.quizzes, quiz];
        },
        deleteQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter((q)=>q._id != quizId);
        },
        updateQuiz: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q)=>
            q._id === quiz._id ? quiz : q);
        },
        editQuiz: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((q)=>
            q._id === quizId ? {...q, editing: true} : q);
        },
    },
});
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } =
    quizSlice.actions;

export default quizSlice.reducer;