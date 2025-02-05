import {Navigate, Routes, Route} from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import Dostavka from "../pages/Dostavka.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/store" element={<HomePage/>}/>
            <Route path="/store/:category" element={<HomePage/>}/>
            <Route path="/store/:category/:subcategory" element={<HomePage/>}/>
            <Route path="/product/:id" element={<HomePage/>}/>
            <Route path="/checkout" element={<CheckoutPage/>}/>
            <Route path="/dostavka" element={<Dostavka/>}/>
                {/*<Route path="/order-confirmation" element={<OrderConfirmation />} />*/}
        </Routes>
    );
};

export default AppRoutes;
