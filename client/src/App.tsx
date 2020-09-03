import React, { useEffect } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import AppContainer from "./views/AppContainer";
import { BrowserRouter } from "react-router-dom";
import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { fetchSurveys } from "redux/slices/surveysSlices";
import { updateActiveSurvey } from "redux/slices/activeSurveySlices";

type Props = WithStyles<typeof styles>;

const App = (props: Props) => {
    const { classes } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSurveys());
        dispatch(updateActiveSurvey(null));
    }, [dispatch]);

    return (
        <div className={classes.root}>
            <BrowserRouter>
                <AppContainer>
                    <AppRouter />
                </AppContainer>
            </BrowserRouter>
        </div>
    );
};

const styles = (theme: Theme) =>
    createStyles({
        root: {
            a: {
                textDecoration: "none",
                color: "inherit",
            },
        },
    });

export default withStyles(styles)(App);
