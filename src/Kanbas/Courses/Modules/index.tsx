import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router-dom";
import { modules } from "../../Database";
export default function Modules() {
  const { cid } = useParams();
  const courseModules = modules.filter((module)=>module.course===cid);
    return (
        <div id="wd-modules">
        <ModulesControls /> 
        <ul id="wd-modules" className="list-group rounded-0 w-100">
        {courseModules.map((module)=>(
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-3 fs-3"/>
                {module.name}
                <ModuleControlButtons/>
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0 w-100">
                  {module.lessons.map((lesson)=>(
                    <li className="wd-lesson list-group-item p-3 ps-1">
                        <BsGripVertical className="me-3 fs-3"/>
                        {lesson.name}
                        <LessonControlButtons />
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
    
        </ul>
</div>
    );}