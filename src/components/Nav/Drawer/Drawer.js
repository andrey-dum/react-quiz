import React from 'react'
import { NavLink } from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './Drawer.module.css'


 const Drawer = ({isOpen, onClose, isAuth}) => {

    const handleClick = () => {
        onClose()
    }

     const cls = [
        classes.Drawer,
        !isOpen ? classes.close : '',
     ]

    const links = [ 
        { to: '/', label: 'Список', exact: true },
    ]

    if (isAuth) {
        links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false })
        links.push({ to: '/logout', label: 'Выйти', exact: false })
    }   else {
        links.push({ to: '/auth', label: 'Авторизация', exact: false })
    }
    

     function renderLinks(links) {
        return links.map((link, index) => (
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
        )) 
     }

    return (
        <>
            <nav className={cls.join(' ')}>
                <ul>
                    {/* { links.map((link, index) => (
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
                    )) } */}

                    { renderLinks(links) }
                </ul>
            </nav>
           { isOpen && <Backdrop clickHandler={onClose} /> } 
        </>
    )
}

export default Drawer