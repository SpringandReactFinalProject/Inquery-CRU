import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAppointmentById, updateAppointment } from "./appointmentSlice";

function EditAppointmentForm(props){
    const { appointmentId } = useParams( )
    const appointment = useSelector((state)=>selectAppointmentById(state,Number(appointmentId))) 
    console.log(appointmentId)
    console.log(appointment)

    const [id,setId] = useState(appointment?.id);
    
    const [name,setName] = useState(appointment?.name);
    const [consultantFees,setConsultantFees] = useState(appointment?.consultantFees)
    const [clientStatus,setClientStatus] = useState(appointment?.clientStatus);
    const [lawyerStatus,setLawyerStatus] = useState(appointment?.lawyerStatus);
    const [date,setDate] = useState(appointment?.date);
    const [time,setTime] = useState(appointment?.time);
    const [addRequestStatus,setAddRequestStatus]= useState('idle')

     
    
    const onNameChange = e => setName(e.target.value);
    const onConsultantFeesChange = e => setConsultantFees(e.target.value);
    const onClientStatusChange = e => setClientStatus(e.target.value);
    const onLawyerStatusChange = e => setLawyerStatus(e.target.value);
    const onDateChange = e => setDate(e.target.value);
    const onTimeChange = e => setTime(e.target.value);


    const canSave = [ name,consultantFees,clientStatus,lawyerStatus,date,time].every(Boolean) && addRequestStatus === 'idle'
   

    const dispatch = useDispatch();

    const onSubmit = (event)=>{
        event.preventDefault();

         
           if(canSave){
            try {
                setAddRequestStatus('pending')
                console.log("In the can save")

                dispatch(
                   
                   updateAppointment({
                    id,
                    name,
                    consultantFees,
                    clientStatus,
                    lawyerStatus,
                    date,
                    time
                    }),
                )
            }                
             catch (error) {
                console.log(error)
                
            }finally{
                setAddRequestStatus('idle')
            }

            setId('')
            setName('')
            setConsultantFees('')
            setLawyerStatus('')
            setClientStatus('')
            setDate('')
            setTime('')
           }
           console.log(canSave)
        
        }
        return(
            <div className="container-fluid bg-primary py-5">

            <div className="container">
                <div className="row gx-5">
                <div className="col-lg-3 mb-5 mb-lg-0"></div>
                    <div className="col-lg-6 mb-5 mb-lg-0">

                        <h1 className="text-primary text-center mb-4">Make Inquery Form</h1>
                        <div className="bg1-light text-center rounded p-5">

                            <form onSubmit={onSubmit}>
                                <div className="row g-3">
                                    <div className="col-12 col-sm-12">

                                        <input
                                            type="text"
                                            className="form-control bg-white border-0"
                                            placeholder="Phone Number"
                                            value={name}
                                            onChange={onNameChange}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12">
                                        <input
                                            type="text"
                                            className="form-control bg-white border-0"
                                            placeholder="Lawyer Name"
                                            value={consultantFees}
                                            onChange={onConsultantFeesChange}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12">
                                        <input
                                            type="text"
                                            className="form-control bg-white border-0"
                                            placeholder="Lawyer Status"
                                            value={lawyerStatus}
                                            onChange={onLawyerStatusChange}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12">
                                        <input
                                            type="text"
                                            className="form-control bg-white border-0"
                                            placeholder="Client Status"
                                            value={clientStatus}
                                            onChange={onClientStatusChange}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12">
                                        <input
                                            type="text"
                                            className="form-control bg-white border-0"
                                            placeholder="Lawyer Name"
                                            value={date}
                                            onChange={onDateChange}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12">
                                        <input
                                            type="text"
                                            className="form-control bg-white border-0"
                                            placeholder="Lawyer Name"
                                            value={time}
                                            onChange={onTimeChange}
                                        />
                                    </div>
                                    
                                    <div className="col-12">
                                            <input 
                                            type="submit" 
                                            className="btn btn-primary w-100 py-3" 
        
                                            value={'Make An Appointment'}
                                            />
                                            
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        );
}
export default EditAppointmentForm;