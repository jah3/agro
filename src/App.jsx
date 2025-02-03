import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <HashRouter>
            <header></header>
            <main>
                <AppRoutes />
            </main>
        </HashRouter>
    );
}

export default App;
