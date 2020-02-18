import React from 'react';
import TopBar from './TopBar';

const AppContainer: React.FC<{}> = ({ ...props }) => {
    return (
        <div>
            <TopBar />
            <div>
                {props.children}
            </div>
        </div>
    );
};

export default AppContainer;