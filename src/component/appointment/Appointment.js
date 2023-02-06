import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmModal from "../utility/ConfirmModal";
import { deleteAppointment } from "./appointmentSlice";

function Appointment(props){
    console.log(props.id);

    const [isModalOpen,setModalOpen] = useState(false)
    const dispatch = useDispatch();

    function deleteHandler(){
        setModalOpen(true);
    }

    function cancelHandler(){
        setModalOpen(false);
    }

    function confirmHandler(){
        dispatch(deleteAppointment({appointmentId:props.id})).unwrap()

        setModalOpen(false)
    }

    return (

            
            <div className=" col-lg-4 col-md-6">
                
                    <div className="service-item bg-light rounded d-flex flex-column  justify-content-center ">
                        {/* <div className="service-icon mb-4">
                        <i class="fa-solid fa-user"></i>
                        </div> */}
                        <h5 className="mb-2">Id: <span className="text-secondary">{props.id}</span></h5>
                        <h5 className="mb-2">Name: <span className="text-secondary">{props.name}</span></h5>
                        <h5 className="mb-2">ConsultantFees: <span className="text-secondary">{props.consultantFees}</span></h5>
                        <h5 className="mb-2">LawyerStatus: <span className="text-secondary">{props.lawyerStatus}</span></h5>
                        <h5 className="mb-2">ClientStatus: <span className="text-secondary">{props.clientStatus}</span></h5>
                        <h5 className="m-2">Date: <span className="text-secondary">{props.date}</span></h5>
                        <h5 className="m-2">Time: <span className="text-secondary">{props.time}</span></h5>
                        <div className="my-2">
                        <Link to={`/appointment/edit/${props.id}`}>
                            <button className="btn btn-success mx-3">Update</button>
                        </Link>
                        <Link onClick={deleteHandler}>
                            <button className="btn btn-danger mx-3">
                                Delete
                            </button>
                        </Link>
                        {isModalOpen && <ConfirmModal onCancel={cancelHandler} onConfirm={confirmHandler}/>}
                       
                        </div>
                       
                    </div>
             
            </div>


    );
}
export default Appointment;