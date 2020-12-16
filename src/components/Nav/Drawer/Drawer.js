import React from 'react'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './Drawer.module.css'

const links = [ 
    { to: '/', label: 'Список', exact: true },
    { to: '/auth', label: 'Авторизация', exact: false },
    { to: '/quiz-creator', label: 'Создать тест', exact: false }
]

 const Drawer = ({isOpen, onClose}) => {

    const handleClick = () => {
        onClose()
    }

     const cls = [
        classes.Drawer,
        !isOpen ? classes.close : '',
     ]

    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    { links.map((link, index) => (
                        <li key={index}>
                            <NavLink 
                                to={link.to}
                                exact={link.exact}
                                activeClassName={classes.active}
                                onClick={handleClick}
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    )) }
                </ul>
            </nav>
           { isOpen && <Backdrop clickHandler={onClose} /> } 
        </>
    )
}

export default Drawer