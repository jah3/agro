import { Navigate, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/agro" element={<HomePage />} />
            <Route path="/agro/store" element={<HomePage />} />
            <Route path="/agro/store/:category" element={<HomePage />} />
            <Route path="/agro/store/:category/:subcategory" element={<HomePage />} />
            <Route path="/agro/product/:id" element={<HomePage />} />
            <Route path="/agro/checkout" element={<CheckoutPage />} />
            {/*<Route path="/order-confirmation" element={<OrderConfirmation />} />*/}
        </Routes>
    );
};

export default AppRoutes;
