import {Link, useLocation, useParams} from 'react-router-dom';

export default function Links() {
    const { pathname } = useLocation();
    const { cid } = useParams();
    const {qid} = useParams();
      return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0 me-5">
            <ul className="nav nav-pills">
                <li  className="nav-item"><Link id="wd-details" to={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/DetailEditor`}
                className={`nav-link ${pathname.includes("DetailEditor") ? "active" : ""}`}>Details</Link></li>
                <li  className="nav-item"><Link id="wd-questions" to={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/QuestionEditor`}
                className={`nav-link ${pathname.includes("QuestionEditor") ? "active" : ""}`}>Questions</Link></li>
            </ul>
        </div>
    );}