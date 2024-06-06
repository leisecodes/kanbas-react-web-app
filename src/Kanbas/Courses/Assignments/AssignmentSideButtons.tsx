import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function AssignmentSideButtons({ assignment}: {  assignment: {
  _id: string;
  name: string;
  description: string;
  points: number;
  dueDate: string;
  availableFromDate: string;
  availableUntilDate: string;
};}) {

  
  return (
    <div className="float-end d-flex">
      <GreenCheckmark />
      <IoEllipsisVertical className="ms-1 fs-4" />
    </div>
);}
