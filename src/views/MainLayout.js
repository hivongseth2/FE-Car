import React from "react";
import Menu from "./Menu";
import Sidebar from "./Sidebar";

function MainLayout({children}){
    return(
        <div>
            <Menu></Menu>
            <div>{children}</div>
            <Sidebar></Sidebar>
        </div>
    );
}
export default MainLayout;