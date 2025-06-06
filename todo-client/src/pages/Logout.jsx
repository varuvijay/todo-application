import axios from "axios";
import React, {useContext} from "react";
import {data} from "react-router-dom";
import {UserDetails} from "../context/UserDetails.jsx";
import login from "./Login.jsx";

const Logout = () => {
    let {userDetails,setUserDetails,setLogin} = useContext(UserDetails);

    const onSubmit = async (data) => {
        try {
            const res = await axios.post("http://localhost:80/api/auth/logout", data, {
                headers: {'X-Session-ID': userDetails.sessionId}
            });
            setUserDetails(res.data);
            setLogin(true);
            console.log("logged out");
        } catch (err) {
            console.log(err);
            setUserDetails(null);

            setLogin(true);
        }
    }


    return (

        <div className="container-fluid vh-25 vw-100  d-flex justify-content-start p-3">
            <div className="container"></div>
            <div
                className="container w-auto h-25 d-flex flex-column justify-content-center  p-4 rounded-4 border-top  shadow-lg gap-3">
                <span>are u shure u want to logout</span>
                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-outline-primary " onClick={() => onSubmit()}>

                    Button
                </button>
            </div>
        </div>

</div>
)
    ;
};

export default Logout;
