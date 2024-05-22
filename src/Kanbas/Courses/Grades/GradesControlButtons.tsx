import { LuFileInput } from "react-icons/lu";
import { LuFileOutput } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";

export default function GradesControlButtons(){
return(
<div>
    <button className="btn btn-secondary me-2">
        <LuFileInput className="me-2"/>
        Import
    </button>
    
    <button className="btn btn-secondary dropdown-toggle me-2"
          type="button" data-bs-toggle="dropdown">
          <LuFileOutput className="me-2"/>
          Export
        </button>

    <button className="btn btn-secondary">
    <IoMdSettings className="fs-5"/>
    </button>
</div>
    

)};