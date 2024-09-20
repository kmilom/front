import React from "react";

const Container = ({children}) => {
    return(
        <div className = "min-h-screen flex items-center justify-center bg-blue-100">
            {children}
        </div>
    );
}

export default Container;