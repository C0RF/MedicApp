import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
  
    return (
        <nav className='nav-menu'>
            <div className='nav-menu-items'>
                <Link to='/'>
                    <div className='MedicApp'>MedicApp</div>
                </Link>
                <Link to='/diagnosis'>
                    <div className='Opcion'>DIAGNÓSTICO</div>
                </Link>
                <Link to='/diseases'>
                    <div className='Opcion'>ENFERMEDADES</div>
                </Link>
                <Link to='/firstAid'>
                    <div className='Opcion'>PRIMEROS AUXILIOS</div>
                </Link>
                <Link to='/nearestHospitals'>
                    <div className='Opcion'>HOSPITALES CERCANOS</div>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;