import React from 'react';
import { useSelector } from 'react-redux'
import Drawer from '../../components/Nav/Drawer/Drawer';
import MenuToggle from '../../components/Nav/MenuToggle/MenuToggle';

import classes from './Layout.module.css'

const Layout = (props) => {
    const token = useSelector(state => state.auth.token)
    // const isAuth = !!token
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
                isAuth={!!token}
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
