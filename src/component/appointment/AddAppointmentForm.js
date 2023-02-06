import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewAppointment } from "./appointmentSlice";

function AddAppointmentForm() {

    const [name, setName] = useState('');
    const [consultantFees, setConsultantFees] = useState('')
    const [clientStatus, setClientStatus] = useState('');
    const [lawyerStatus, setLawyerStatus] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [addRequestStatus, setAddRequestStatus] = useState('idle')



    const onNameChange = e => setName(e.target.value);
    const onConsultantFeesChange = e => setConsultantFees(e.target.value);
    const onClientStatusChange = e => setClientStatus(e.target.value);
    const onLawyerStatusChange = e => setLawyerStatus(e.target.value);
    const onDateChange = e => setDate(e.target.value);
    const onTimeChange = e => setTime(e.target.value);
    const canSave = [name, consultantFees, clientStatus, lawyerStatus, date, time].every(Boolean) && addRequestStatus === 'idle'



    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();


        if (canSave) {
            try {
                setAddRequestStatus('pending')
                console.log("In the can save")

                dispatch(
                    addNewAppointment({
                        name,
                        consultantFees,
                        clientStatus,
                        lawyerStatus,
                        date,
                        time

                    }),
                ).unwrap();

            } catch (error) {
                console.log(error)

            } finally {
                setAddRequestStatus('idle')
            }


            setName('')
            setConsultantFees('')
            setLawyerStatus('')
            setClientStatus('')
            setDate('')
            setTime('')

        }
        console.log(canSave)

    }
    return (
        <div className="container-fluid bg-primary py-5">

            <div className="container">
                <div className="row gx-5">
                <div className="col-lg-3 mb-5 mb-lg-0"></div>
                    <div className="col-lg-6 mb-5 mb-lg-0">

                        <h1 className="text-primary text-center mb-4">Make Appointment Form</h1>
                        <div className="bg-light text-center rounded p-5">

                            <form onSubmit={onSubmit}>
                                <div className="row g-3">
                                    <div className="col-12 col-sm-12">

                                        <input
                                            type="text"
                                            className="form-control bg-white border-0"
                                            placeholder="Appointment Name"
                                            value={name}
                                            onChange={onNameChange}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12">
                                        <input
                                            type="text"
                                            className="form-control bg-white border-0"
                                            placeholder="ConsultantFees"
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
                                            type="date"
                                            className="form-control bg-white border-0"
                                            placeholder="Appointment Date"
                                            value={date}
                                            onChange={onDateChange}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-12">
                                        <input
                                            type="time"
                                            className="form-control bg-white border-0"
                                            placeholder="Appointment Time"
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
export default AddAppointmentForm;