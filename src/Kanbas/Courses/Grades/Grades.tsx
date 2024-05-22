import GradesControlButtons from "./GradesControlButtons";
import { IoIosSearch } from "react-icons/io";
import { RxCaretDown } from "react-icons/rx";
import { CiFilter } from "react-icons/ci";
import { IoEnterOutline } from "react-icons/io5";


export default function Grades(){
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
                <th scope="col" className="col-2" >
                    A1 SETUP
                </th>
                <th scope="col" className="col-2">
                    A2 HTML
                </th>
                <th scope="col" className="col-2">
                    A3 CSS
                </th>
                <th scope="col" className="col-2">
                    A4 BOOTSTRAP
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td className="text-danger">Jane Adams</td>
            <td>100%</td>
            <td>96.67%</td>
            <td>92.18%</td>
            <td>66.22%</td>
            </tr>
            <tr>
            <td className="text-danger">Christina Allen</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            </tr>
            <tr>
            <td className="text-danger">Samreen Ansari</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            </tr>
            <tr>
            <td className="text-danger">Han Bao</td>
            <td>100%</td>
            <td>100%</td>
            <td>
               <div className="input-group input-group-sm flex-nowrap w-100">
                    <input type="text" className="form-control" value="88.03"></input>
                    <button className="btn btn-secondary" type="button"><IoEnterOutline/></button>
               </div>
                </td>
            <td>98.99%</td>
            </tr>
            <tr>
            <td className="text-danger">Mahi Sai Srinivas Bobbili</td>
            <td>100%</td>
            <td>96.67%</td>
            <td>98.37%</td>
            <td>100%</td>
            </tr>
            <tr>
            <td className="text-danger">Siran Cao</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            <td>100%</td>
            </tr>
            
        </tbody>
    </table>
    </div>

    </div>
)


};