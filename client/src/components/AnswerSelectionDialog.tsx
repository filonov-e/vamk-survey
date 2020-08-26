import React from "react";
import {
    Dialog,
    DialogTitle,
    Typography,
    DialogContent,
    Button,
} from "@material-ui/core";
import { AnswerType } from "common/types";

interface Props {
    open: boolean;
    onSelect: (type: AnswerType) => void;
}

const AnswerSelectionDialog = ({ open, onSelect }: Props) => {
    return (
        <Dialog open={open}>
            <DialogTitle>
                <Typography>Select answer type</Typography>
            </DialogTitle>
            <DialogContent>
                <Button onClick={() => onSelect("rating")}>Rating</Button>
                <Button onClick={() => onSelect("text")}>Text</Button>
            </DialogContent>
        </Dialog>
    );
};

export default AnswerSelectionDialog;
