import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Appointment from "./Appointment"
import { fetchAppointment, getAppointmentStatus, selectAllIAppointment } from "./appointmentSlice"

function AppointmentList(){
    const dispatch = useDispatch()
    const appointments = useSelector(selectAllIAppointment)
    console.log("InqueryList: "+appointments)
    const appointmentStatus = useSelector(getAppointmentStatus)

    useEffect(() => {
        if(appointmentStatus === 'idle'){
            dispatch(fetchAppointment())
        }
        },[appointmentStatus,dispatch])

        let content;

        if(appointmentStatus === 'loading'){
            content = (<p>Loading....</p>)
        }
        if(appointmentStatus === 'succeeded'){
            console.log(appointmentStatus)
            content = appointments.map(
                (appointment) => (
                    <Appointment
                       id={appointment.id}
                        name={appointment.name} 
                        consultantFees={appointment.consultantFees} 
                        clientStatus={appointment.clientStatus}
                        lawyerStatus={appointment.lawyerStatus}
                        date={appointment.date}
                        time={appointment.time}
                    />
                )
            );
        }

 

    return content;
}
export default AppointmentList;