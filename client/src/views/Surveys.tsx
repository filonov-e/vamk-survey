import React, { useContext } from 'react';
import { WithStyles, createStyles, Theme, withStyles, List, ListItem } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';

type Props = WithStyles<typeof styles>;

const Surveys: React.FC<Props> = (props) => {
    const { classes } = props;
    const state = useContext(AppContext);
    const { surveys } = state;

    console.log(surveys);
    

    return (
        <React.Fragment>
            <List>
                {surveys.map((survey) => (
                    <Link to={`/surveys/${survey.id}`} key={survey.id}>
                        <ListItem button>
                            {survey.name}
                        </ListItem>
                    </Link>
                ))}
            </List>
        </React.Fragment>
    );
};

const styles = (theme: Theme) => createStyles({

});

export default withStyles(styles)(Surveys);