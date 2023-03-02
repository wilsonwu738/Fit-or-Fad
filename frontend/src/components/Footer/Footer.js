import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <div className="footer-background">
            <Link to="/about" className="link">Meet The Developers</Link>
        </div>
    )
}

export default Footer;