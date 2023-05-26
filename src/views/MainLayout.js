import React from "react";
import Menu from "./Menu";

function MainLayout({children}){
    return(
        <div>
            <Menu></Menu>
            <div>{children}</div>
            <div>This is a sidebar</div>
        </div>
    );
}
export default MainLayout;