import React, { useState, useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import * as profileClient from "../../Account/client";
import { useParams } from "react-router-dom";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

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

  const removeModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module: any) => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const createModule = async (module: any) => {
    const newModule = await client.createModule(cid as string, module);
    dispatch(addModule(newModule));
  };
  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
    fetchUser();
  }, []);


  return (
    <div id="wd-modules">
      {userRole.includes("FACULTY") && (<div>
        <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
          createModule({ name: moduleName, course: cid });
          setModuleName("");
        }} />
      </div>)}

      <ul id="wd-modules" className="list-group rounded-0 w-100">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-3 fs-3" />
                {!module.editing && module.name}
                {module.editing && (
                  <input className="form-control w-50 d-inline-block"
                    onChange={(e) => saveModule({ ...module, name: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule({ ...module, editing: false });

                      }
                    }}
                    value={module.name} />
                )}
                {userRole.includes("FACULTY") && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => {
                    removeModule(moduleId);
                  }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))} />
                  )}
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0 w-100">
                  {module.lessons.map((lesson: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-3 fs-3" />
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
  );
}