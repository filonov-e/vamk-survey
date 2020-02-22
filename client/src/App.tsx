import React from 'react';
import './App.css';
import AppRouter from './AppRouter';
import AppContainer from './views/AppContainer';
import { BrowserRouter } from 'react-router-dom';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';

type Props = WithStyles<typeof styles>;

const App = (props: Props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <BrowserRouter>
        <AppContainer>
          <AppRouter />
        </AppContainer>
      </BrowserRouter>
    </div>
  );
}

const styles = (theme: Theme) => createStyles({
  root: {
    a: {
      textDecoration: 'none',
      color: 'inherit'
    }
  }
});

export default withStyles(styles)(App);
