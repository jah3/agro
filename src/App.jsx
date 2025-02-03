import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <BrowserRouter>
            <header></header>
            <main>
                <AppRoutes />
            </main>
        </BrowserRouter>
    );
}

export default App;
