import * as React from "react";
import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { ModalStyle } from "../../utils/modalStyle";
import Typography from "@mui/material/Typography";

export default function DeleteConfirmModal(props: {
    onDelete: any;
    closeDialog: any;
    showDeleteConfirm: boolean;
    isDeleting?: boolean;
}) {
    const { closeDialog, showDeleteConfirm, onDelete, isDeleting=false } = props;
    return (
        <Modal
            open={showDeleteConfirm}
            onClose={() => {
                closeDialog(false);
            }}
        >
            <Box sx={{ ...ModalStyle, width: "20%" }}>
                <Typography variant="h6" sx={{ my: 4, textAlign: "center" }}>
                    {" "}
                    Are you sure you want to delete?{" "}
                </Typography>
                <Box
                    sx={{
                        gap: 1,
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        onClick={() => {
                            closeDialog(false);
                        }}
                        variant="outlined"
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        disabled={isDeleting}
                        onClick={onDelete}
                        variant="contained"
                        color="primary"
                        startIcon={ isDeleting ? <CircularProgress size={20} />: null}
                    >
                        Delete
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
