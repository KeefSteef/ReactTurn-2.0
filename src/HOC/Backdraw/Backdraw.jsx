import React from 'react';
import './Backdraw.sass';

const Backdraw = props => {
    return (
        <div onClick={() => props.onClickHandler()} className="dark-bcg">
            {props.children}
        </div>
    );
};

export default Backdraw;
