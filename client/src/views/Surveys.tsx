import React, { useContext } from 'react';
import { WithStyles, createStyles, Theme, withStyles, List, ListItem, Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AppContext } from '../services/AppContext';

type Props = WithStyles<typeof styles>;

const Surveys: React.FC<Props> = (props) => {
    const { classes } = props;
    const state = useContext(AppContext);
    const { surveys, isLoadingData } = state;

    return (
        <Container>
            {isLoadingData ?
                <Typography variant='h5'>Loading...</Typography>
                :
                <List>
                    {surveys.map((survey) => (
                        <Link to={`/surveys/${survey.id}`} key={survey.id}>
                            <ListItem button>
                                {survey.name}
                            </ListItem>
                        </Link>
                    ))}
                </List>
            }
        </Container>
    );
};

const styles = (theme: Theme) => createStyles({

});

export default withStyles(styles)(Surveys);