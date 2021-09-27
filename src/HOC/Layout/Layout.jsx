import React from 'react';
import './Layout.sass'

const Layout = props => {
    return (
        <div className="Layout">
            {props.children}
        </div>
    );
};

export default Layout;
