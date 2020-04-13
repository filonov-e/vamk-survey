import React, { useContext } from 'react';
import { List, ListItem, Typography, Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AppContext } from 'services/AppContext';

const Surveys: React.FC = () => {
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

export default Surveys;