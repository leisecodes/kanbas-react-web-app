import "./index.css"
import {Link, useLocation, useParams} from 'react-router-dom';
export default function CoursesNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const links = [
  {label : "Home"},
  {label : "Modules"}, 
   { label : "Piazza"}, 
   {label : "Zoom"}, 
   {label : "Assignments"}, 
   {label : "Quizzes"}, 
   {label : "Grades"},
   {label : "People"}]
    return (
      <div id="wd-courses-navigation" className="list-group fs-5 rounded-0 me-5">
      {links.map((link) => (
        <Link key={link.label} to={`/Kanbas/Courses/${cid}/${link.label}`} className={`list-group-item border-0 pt-1 pb-1 mb-3
              ${pathname.includes(link.label) ? "active border" : "text-danger border"}`}>
          {link.label}
        </Link>
      ))}

      
      </div>
  );}
  