import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, createStyles, Theme, WithStyles, withStyles, Drawer, List, ListItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

type Props = WithStyles<typeof styles>;

const TopBar: React.FC<Props> = ({ ...props }) => {
    const { classes } = props;

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const handleOpenMenu = () => {
        setIsMenuOpen(true);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div>
            <AppBar position='static' classes={{ root: classes.appBarRoot }}>
                <Toolbar>
                    <IconButton onClick={handleOpenMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Surveyor
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer open={isMenuOpen} onClose={handleCloseMenu}>
                <div
                    className={classes.list}
                    role="presentation"
                    onClick={handleCloseMenu}
                    onKeyDown={handleCloseMenu}
                >
                    <List >
                        <Link to='/'>
                            <ListItem button>
                                <Typography variant='h6'>Home</Typography>
                            </ListItem>
                        </Link>
                        <Link to='/survey'>
                            <ListItem button>
                            <Typography variant='h6'>Survey</Typography>
                            </ListItem>
                        </Link>
                    </List>
                </div>

            </Drawer>
        </div>
    );
};

const styles = (theme: Theme) => createStyles({
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
        backgroundColor: 'green',
        marginBottom: 32,
    },
    list: {
        width: 250,
        textAlign: 'center',
    },
});

export default withStyles(styles)(TopBar);