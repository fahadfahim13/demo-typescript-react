import React from "react";
import "./App.css";
import MainLayout from "./components/layout/mainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ExistingPricePlans from "./pages/existingPricePlans";
import PlanHistory from "./pages/pricePlanHistory";
import ErrorPage from "./components/common/ErrorPage";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddPricePlanForm from "./pages/addPricePlan";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ShowPricingPlan from "./pages/showPricingPlan";
import ShowPricingPlanHistory from "./pages/showPricingHistory";
import ImportPricingPlan from "./pages/importPricingPlan";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <MainLayout children={<ExistingPricePlans />} />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/import-file",
            element: <MainLayout children={<ImportPricingPlan />} />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/pricing-plans/edit/:id",
            element: <MainLayout children={<ShowPricingPlan />} />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/pricing-plan-history/:id",
            element: <MainLayout children={<ShowPricingPlanHistory />} />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/history",
            element: <MainLayout children={<PlanHistory />} />,
        },
        {
            path: "/create-plan",
            element: <MainLayout children={<AddPricePlanForm />} />,
        },
    ]);

    return (
        <div className="App">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    theme="light"
                />
                <RouterProvider router={router} />
            </LocalizationProvider>
        </div>
    );
}

export default App;
