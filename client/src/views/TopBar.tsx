import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    createStyles,
    Theme,
    WithStyles,
    withStyles,
    Drawer,
    List,
    ListItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import LoginDialog from "components/LoginDialog";

type Props = WithStyles<typeof styles>;

const TopBar: React.FC<Props> = ({ ...props }) => {
    const { classes } = props;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState<boolean>(false);

    const handleOpenMenu = () => {
        setIsMenuOpen(true);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    const handleOpenLoginDialog = () => {
        setIsLoginDialogOpen(true);
    };

    const handleCloseLoginDialog = () => {
        setIsLoginDialogOpen(false);
    };

    const handleSubmitLoginDialog = (login: string, password: string) => {};

    return (
        <div>
            <AppBar position="static" classes={{ root: classes.appBarRoot }}>
                <Toolbar>
                    <IconButton
                        onClick={handleOpenMenu}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Surveyor
                    </Typography>
                    <Button color="inherit" onClick={handleOpenLoginDialog}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer open={isMenuOpen} onClose={handleCloseMenu}>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={handleCloseMenu}
                    onKeyDown={handleCloseMenu}
                >
                    <List>
                        <Link to="/">
                            <ListItem button>
                                <Typography variant="h6">Home</Typography>
                            </ListItem>
                        </Link>
                        <Link to="/surveys">
                            <ListItem button>
                                <Typography variant="h6">Surveys</Typography>
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
            <LoginDialog
                open={isLoginDialogOpen}
                onClose={handleCloseLoginDialog}
                onSubmit={handleSubmitLoginDialog}
            />
        </div>
    );
};

const styles = (theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        appBarRoot: {
            backgroundColor: "green",
            marginBottom: 32,
        },
        list: {
            width: 250,
            textAlign: "center",
        },
    });

export default withStyles(styles)(TopBar);
