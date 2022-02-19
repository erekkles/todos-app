import React from 'react';
import "../../stylesheets/layout.css";

const Layout = ({ children }) => {
    return (
        <div className="layout_container">
            { children }
        </div>
    )
}

export default Layout
