import React, { useState, ChangeEvent } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
} from "@material-ui/core";

interface OwnProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (login: string, password: string) => void;
}

type Props = OwnProps;

const LoginDialog: React.FC<Props> = (props) => {
    const { open, onClose, onSubmit } = props;

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [isEmailError, setIsEmailError] = useState<boolean>(false);
    const [isPasswordError, setIsPasswordError] = useState<boolean>(false);

    const handleEmailChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        setEmail(value);
    };

    const handlePasswordChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        setPassword(value);
    };

    const handleSubmit = () => {
        setIsEmailError(!email);
        setIsPasswordError(!password);

        if (email && password) {
            onSubmit(email, password);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please log-in to be able to participate in surveys.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Email Address"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    error={isEmailError}
                />
                <TextField
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                    error={isPasswordError}
                />
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        color="primary"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;
