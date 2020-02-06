import React from 'react';
import { WithStyles, createStyles, Theme, withStyles } from '@material-ui/core';
import { SurveyApi } from '../common/types/common';
import Survey from './Survey';

interface OwnProps {
    surveys: SurveyApi[];
}

type Props = OwnProps & WithStyles<typeof styles>;

const Surveys: React.FC<Props> = (props) => {
    const { classes } = props;

    return (
        <React.Fragment>
            {/* {props.surveys.map(surveyItem => (
                //<Survey name={'Test Survey'} stepContent={surveyItem.stepContent} />
            ))} */}
            <Survey name={'Test Survey'} stepContent={['one', 'two', 'three']} />
            <Survey name={'Test Survey'} stepContent={['one', 'two', 'three']} />
            <Survey name={'Test Survey'} stepContent={['one', 'two', 'three']} />
        </React.Fragment>
    );
};

const styles = (theme: Theme) => createStyles({

});

export default withStyles(styles)(Surveys);