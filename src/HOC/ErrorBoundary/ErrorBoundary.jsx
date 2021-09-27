import React from 'react';

const ErrorBoundary = ({children,hasError}) => {
    return (
        <div>
            {hasError ? <h1 style={{margin: 0, padding:'30px'}}>Error loading API...</h1> : children}
        </div>
    );
}

export default ErrorBoundary;
