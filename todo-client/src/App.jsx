import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import Create from "./components/Create.jsx";
import Edit from "./components/Edit.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/edit" element={<Edit/>}/>
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
