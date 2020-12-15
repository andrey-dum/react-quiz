import React from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './Drawer.module.css'

const links = [ 1, 2, 3]

 const Drawer = ({isOpen, onClose}) => {
     const cls = [
        classes.Drawer,
        !isOpen ? classes.close : '',
     ]

    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    { links.map((link) => (
                        <li key={link}><a href="/">Link {link}</a></li>
                    )) }
                </ul>
            </nav>
           { isOpen && <Backdrop clickHandler={onClose} /> } 
        </>
    )
}

export default Drawer