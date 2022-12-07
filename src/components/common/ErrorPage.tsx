import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";
import {Button} from "@mui/material";

export default function ErrorPage() {

    const error:any = useRouteError();
    console.error(error);
    const navigate = useNavigate();
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <Button variant="contained" onClick={()=>{navigate('/')}} > Take me Home </Button>
        </div>
    );
}
