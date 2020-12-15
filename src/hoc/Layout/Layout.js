import React from 'react';
import Drawer from '../../components/Nav/Drawer/Drawer';
import MenuToggle from '../../components/Nav/MenuToggle/MenuToggle';

import classes from './Layout.module.css'

const Layout = (props) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const onToggle = () => {
        setIsOpen(!isOpen)
    }

    const menuCloseHandler = () => {
        setIsOpen(false)
    }

    return (
        <div className={classes.Layout}>

            <Drawer 
                isOpen={isOpen}
                onClose={menuCloseHandler}
            />

            <MenuToggle 
                onToggle={onToggle}
                isOpen={isOpen}
            />

            <main>
                {props.children}
            </main>
        </div>
    );
}

export default Layout;
