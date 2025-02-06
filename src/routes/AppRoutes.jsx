import {Navigate, Routes, Route} from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import Dostavka from "../pages/Dostavka.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import Guarantees from "../pages/Guarantees.jsx";
import {Contact} from "lucide-react";
import Contacts from "../pages/Contacts.jsx";
import FAQs from "../pages/FAQs.jsx";

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
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route path="/garantii" element={<Guarantees/>}/>
            <Route path="/contacts" element={<Contacts/>}/>
            <Route path="/faqs" element={<FAQs/>}/>

                {/*<Route path="/order-confirmation" element={<OrderConfirmation />} />*/}
        </Routes>
    );
};

export default AppRoutes;
