import { Route, Routes, Outlet } from "react-router-dom";
import { PeoplePage } from "./pages/people-page";
import { PeopleDetailsPage } from "./pages/people-details-page";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route index element={<PeoplePage />} />
                <Route path=":id" element={<PeopleDetailsPage />} />
            </Route>
        </Routes>
    );
}

export default App;
