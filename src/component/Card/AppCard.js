import AppointmentList from "../appointment/AppointmentList";

function AppCard(){
    return (
        <div className="bg-primary container-fluid py-5">
        <div className="container">
            <div className="text-center mx-auto mb-5">
                <h1 className="text-primary display-4">Appointment List</h1>
            </div>
            <div className="row g-5">
            <AppointmentList/>
            </div>
            </div>
    </div>
    );
}
export default AppCard;