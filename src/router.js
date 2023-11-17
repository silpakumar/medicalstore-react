import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Listmedicine from "./components/blog/ListMedicine";
import CreateMedicine from "./components/blog/CreateMedicine";
import ViewMedicine from "./components/blog/ViewMedicine";
import EditMedicine from "./components/blog/EditMedicine";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import SearchBar from "./components/blog/SearchBar";
const router =createBrowserRouter([
    { path:'', element: <Home/>},
    { path: 'blog/medicines', element: <Listmedicine/>},
    { path: 'blog/medicines/create', element: <CreateMedicine/>},
    { path: 'blog/medicines/:medicineId/view', element: <ViewMedicine/>},
    { path: 'blog/medicines/:medicineId/edit', element: <EditMedicine /> },
    { path: 'register', element:<Register/>},
    { path: 'login' , element : <Login/>},
    {path: '/search/:q' , element : <SearchBar/>},
    
]
);
export default router;