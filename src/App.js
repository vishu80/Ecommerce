import React,{useEffect} from "react";
import Headers from "./components/Headers";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Productdetail from "./screen/Productdetail";
import Homescreens from "./screen/Homescreens";
import { useDispatch } from "react-redux";
import { getProductList } from "./redux/action/productListaction";
import Cartscreen from "./screen/Cartscreen";
import Loginscreen from "./screen/Loginscreen";
import { ToastContainer, toast } from 'react-toastify';
import Registerscreen from "./screen/Registeruser";
import Profilescreen from "./screen/Profilescreen";
import Shippingscreen from "./screen/Shippingscreen";
import PaymentScreen from "./screen/PaymentScreen";
import PlaceorderScreen from "./screen/PlaceorderScreen";

const App = () => {
  const dispatch=useDispatch();
    useEffect(()=>{
      dispatch(getProductList());
    },[])

  return (
    <>
      <BrowserRouter>
        <main className="py-3">
          <Headers />

          <Container>
            <Routes>
              <Route path="/signup" element={<Loginscreen />} />
              <Route path="/product/:id" element={<Productdetail />} />
              <Route path="/cart/:id/:qty" element={<Cartscreen />} />  
              <Route path="/" element={<Homescreens />} exact />
              <Route path="/register" element={<Registerscreen/>}/>
              <Route path="/profile" element={<Profilescreen/>}/>
              <Route path='/shipping' element={<Shippingscreen/>}/>
              <Route path='/payment' element={<PaymentScreen/>}/>
              <Route path='/placeorder' element={<PlaceorderScreen/>}/>



            </Routes>
          </Container>
        </main>
        <Footer />
        <ToastContainer autoClose={1000}/>

      </BrowserRouter>
    </>
  );
};

export default App;
