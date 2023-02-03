import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InqueryItem from "./InqueryItem";
import { fetchInquery, getInqueryStatus, selectAllInquery } from "./inquerySlice";
function InqueryList(){

    const dispatch = useDispatch()
    const inquerys = useSelector(selectAllInquery)
    console.log("InqueryList: "+inquerys)
    const inqueryStatus = useSelector(getInqueryStatus)

    useEffect(() => {
        if(inqueryStatus === 'idle'){
            dispatch(fetchInquery())
        }
        },[inqueryStatus,dispatch])

        let content;

        if(inqueryStatus === 'loading'){
            content = (<p>Loading....</p>)
        }
        if(inqueryStatus === 'succeeded'){
            console.log(inqueryStatus)
            content = inquerys.map(
                (inquery) => (
                    <InqueryItem
                        userId={inquery.userId}
                        phoneNo={inquery.phoneNo}
                        lawyerName={inquery.lawyerName}
                        description={inquery.description}
                    />
                )
            );
        }

 

    return content;
    
}
export default InqueryList;