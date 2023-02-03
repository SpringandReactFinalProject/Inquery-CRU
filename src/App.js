import { Route, Routes } from "react-router-dom";
import Card from "./component/Card/card";
import AddContractForm from "./component/contract/AddContractForm";
import Footer from "./component/footer/Footer";
import AddInqueryForm from "./component/inquery/AddInqueryForm";
import InqueryList from "./component/inquery/InqueryList";
import Layout from "./component/layout/Layout"

function App() {
  return (

    <div>
      <Layout />
      <Routes>
       
        <Route path='/inquery' element={<AddInqueryForm />} />
        <Route path='/inquery'>
          <Route path="list" element={<Card />} />
        </Route>
        <Route path='/contract' element={<AddContractForm />} />
     
      </Routes>
      <Footer />
    </div>







  );
}

export default App;
