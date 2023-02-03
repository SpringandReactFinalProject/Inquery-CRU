
function InqueryItem(props) {
    return (

            
            <div className="col-lg-4 col-md-6">
                
                    <div className="service-item bg-primary rounded d-flex flex-column align-items-center justify-content-center text-center">
                        {/* <div className="service-icon mb-4">
                        <i class="fa-solid fa-user"></i>
                        </div> */}
                        <h4 className="mb-3">Lawyer: {props.lawyerName}</h4>
                        <h4 className="mb-3">User: {props.userId}</h4>
                        <h6 className="mb-3">User PhoneNo: {props.phoneNo}</h6>
                        <p className="m-0">{props.description}</p>
                        <div className="my-3">
                            <button className="btn btn-success mx-3">Update</button>
                            <button className="btn btn-danger">Delete</button>
                        </div>
                        <a className="btn btn-lg btn-primary rounded-pill" href="">
                            <i className="bi bi-arrow-right"></i>
                        </a>
                    </div>
             
            </div>


    );
}
export default InqueryItem;