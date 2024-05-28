import GradesControlButtons from "./GradesControlButtons";
import { IoIosSearch } from "react-icons/io";
import { RxCaretDown } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";
import { IoEnterOutline } from "react-icons/io5";
import { useParams } from "react-router";
import { enrollments, users, grades, assignments } from "../../Database";

export default function Grades(){
    const { cid } = useParams();
    
    const courseAssignments = assignments.filter(assignment => assignment.course === cid);

    const enrolledStudentIds = enrollments
    .filter(enrollment => enrollment.course === cid)
    .map(enrollment => enrollment.user);

    const courseAssignmentIds = assignments
    .filter(assignment => assignment.course === cid)
    .map(assignment => assignment._id);

    const filtered = grades.filter(grade => 
        enrolledStudentIds.includes(grade.student) && 
        courseAssignmentIds.includes(grade.assignment)
      );


return(
    <div className="">
    <div className="row float-end me-3 mt-5">
    <GradesControlButtons />
    </div>
    <div className="row w-100">
        <div className="col-6">
        <div className="fw-bold my-2">Student Names</div>
        <div className="me-5 input-group">
        <button className="btn btn-lg btn-outline-secondary border-end-0"><IoIosSearch/></button>
        <input id="wd-search-assignment"
               placeholder="Search Students"
               className="form-control form-control-lg border-secondary border-start-0 border-end-0" />
        <button className="btn btn-lg btn-outline-secondary border-start-0"><RxCaretDown className="fs-4"/></button>
        </div>
        </div>
        <div className="col-6">
        <div className="fw-bold my-2">Assignment Names</div>
        <div className="me-5 input-group">
        <button className="btn btn-lg btn-outline-secondary border-end-0"><IoIosSearch/></button>
        <input id="wd-search-assignment"
               placeholder="Search Assignments"
               className="form-control form-control-lg border-secondary border-start-0 border-end-0" />
        <button className="btn btn-lg btn-outline-secondary border-start-0"><RxCaretDown className="fs-4"/></button>
        </div>
        </div>
    </div>
    <div>
    <button className="btn btn-secondary me-2 my-3">
        <CiFilter className="me-2 fs-3"/>
        Apply Filters
    </button>
    </div>
    <div className="table-responsive">
    <table className="table table-striped table-bordered">
        <thead>
            <tr>
                <th scope="col" className="col-3">
                    Student Name
                </th>
                {courseAssignments.map((assn)=>(
                    <th key={assn._id} scope="col" className="col-2" >
                    {assn.title}
                </th>
                ))}
            </tr>
        </thead>
        <tbody>
        {enrollments
            .filter(enrollment => enrollment.course === cid)
            .map(enrollment => {
              const user = users.find(user => user._id === enrollment.user);
              const userGrades = filtered.filter(grade => grade.student === enrollment.user);
              return (
                <tr key={enrollment._id}>
                  <td className="text-danger">{user?.firstName} {user?.lastName}</td>
                  {assignments
                    .filter(assignment => assignment.course === cid)
                    .map(assignment => {
                      const gradeRecord = userGrades.find(grade => grade.assignment === assignment._id);
                      return (
                        <td key={assignment._id}>{gradeRecord ? gradeRecord.grade + "%" : 'N/A'}</td>
                      );
                    })}
                </tr>
              );
            })}
        </tbody>
    </table>
    </div>

    </div>
)


};