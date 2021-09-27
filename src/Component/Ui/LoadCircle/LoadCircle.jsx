import React from 'react';
import './LoadCircle.sass'

const LoadCircle = () => {
    return (
        <div className="load_circle">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default LoadCircle;
