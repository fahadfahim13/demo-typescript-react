import React from "react";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
} from "@mui/material";
import { useUploadFileMutation } from "../features/dynamoDB";
import Papa from "papaparse";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { usePublishPricingPlansMutation } from "../features/PricingPlans/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ImportPricingPlan() {
    const [file, setFile] = React.useState<any>(null);
    const [parsedData, setParsedData] = React.useState<any>();
    const navigate = useNavigate();

    const handleOnChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const [uploadFile, { data: fileUploadData, isSuccess, isLoading }] =
        useUploadFileMutation();

    const [
        publishPricingPlan,
        { data: pubPricingPlanReturnVal,isLoading:pubLishLoading, isSuccess: isSuccessPublish },
    ] = usePublishPricingPlansMutation();

    React.useEffect(() => {
        if (file) {
            // console.log(file);
            Papa.parse(file, {
                delimiter: ",",
                complete: function (results: any) {
                    console.log("Result:", results.data);
                    const keys = results.data[0].map((item: any) =>
                        item
                            .toLowerCase()
                            .replace(" ", "_")
                            .replace("plan_name", "name")
                            .replace("uuid", "identifier")
                            .replace("term", "term_years")
                    );
                    const iterable: any = [];
                    // for (let index = 0; index < iterable.length; index++) {
                    //     const element = iterable[index];
                    //     for (let j = 0; j < array.length; j++) {
                    //         const element = array[j];

                    //     }
                    // }
                    results.data.slice(1).map((item: any) => {
                        const test: any = {};
                        item.map((subItem: any, index: number) => {
                            test[keys[index]] = subItem.toLowerCase();
                        });
                        iterable.push(test);
                    });
                    // iterable.pop();
                    setParsedData(iterable);
                    console.log("Finished:", iterable);
                },
            });
        }
    }, [file]);

    React.useEffect(() => {
        if (
            isSuccess &&
            isSuccessPublish &&
            fileUploadData &&
            pubPricingPlanReturnVal
        ) {
            toast.success("Operation Successful!");
            navigate('/');
        }
    }, [isSuccess, isSuccessPublish, fileUploadData, pubPricingPlanReturnVal]);

    return (
        <Box>
            <Box>
                <input
                    id="fileInput"
                    accept=".csv"
                    type={"file"}
                    onChange={handleOnChange}
                    style={{ display: "none" }}
                />
                <Box
                    sx={{
                        textAlign: "center",
                        mb: 2,
                        pb: 2,
                        borderBottom: "1px solid #e2e2e2",
                        fontSize: "1.5rem",
                    }}
                >
                    Import File
                </Box>
                <Box sx={{}}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "start",
                        }}
                    >
                        <Box
                            sx={{
                                my: 2,
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                justifyContent: "between",
                                border: "1px solid #e2e2e2",
                                borderRadius: 1,
                                pl: 2,
                                minWidth: "400px",
                            }}
                        >
                            <Box sx={{ flexGrow: 1, textAlign: "start" }}>
                                {file ? file.name : "No file selected"}{" "}
                                <span>
                                    {file ? (
                                        <Button
                                            onClick={() => {
                                                setFile(null);
                                                setParsedData(null);
                                            }}
                                        >
                                            <CloseIcon />
                                        </Button>
                                    ) : null}
                                </span>
                            </Box>

                            <Button
                                onClick={() => {
                                    document
                                        .getElementById("fileInput")
                                        ?.click();
                                }}
                            >
                                Browse
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <TableContainer sx={{ maxHeight: 500, mt: 4 }}>
                <Table stickyHeader>
                    <TableHead>
                        {parsedData &&
                            Object.keys(parsedData[0]).map((item: any) => (
                                <TableCell key={item}>
                                    {item.toUpperCase().replace("_", " ")}
                                </TableCell>
                            ))}
                    </TableHead>
                    <TableBody>
                        {parsedData &&
                            parsedData.map((item: any, index: number) => (
                                <TableRow key={item.name + index}>
                                    {Object.values(item).length > 2 &&
                                        Object.values(item).map(
                                            (rowData: any) => (
                                                <TableCell>{rowData}</TableCell>
                                            )
                                        )}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{display:'flex', justifyContent:'center', mt:4}} >
                <Button
                    disabled={isLoading || fileUploadData || !file}
                    variant="contained"
                    sx={{ ml: 2 }}
                    startIcon={ isLoading || pubLishLoading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                    onClick={() => {
                        const fd = new FormData();
                        fd.append("file", file);
                        uploadFile(fd);
                        publishPricingPlan({ pricing_plan: parsedData });
                        // console.log({ pricing_plan: parsedData });
                    }}
                >
                    Upload
                </Button>
            </Box>
        </Box>
    );
}
