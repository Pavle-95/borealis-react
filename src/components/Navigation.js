import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className='navigation'>
            <ul className='nav-holder'>
                <li className='nav-link title'><Link to="/">Konfigurator servisa</Link></li>
                <li className='nav-link info'>Izračunajte trošak servisa</li>
            </ul>
        </nav>
    );
};

export default Navigation;