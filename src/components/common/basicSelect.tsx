import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect(props: {
    label: string;
    values: any[];
    value: any;
    setValue: any;
    error?: boolean;
    disabled?: boolean;
}) {
    const { value, setValue, error = false, disabled=false } = props;

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    {props.label}
                </InputLabel>
                <Select
                    disabled={disabled}
                    contentEditable={false}
                    error={error}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={props.label}
                    onChange={setValue}
                >
                    {props.values.map((item) => (
                        <MenuItem key={`${item.value}`} value={item.value}>
                            {" "}
                            {item.name}{" "}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
