import React from 'react'
import '../styles/footer.css'

export default function FooterLinks() {
    return (
        <div className='footer-links'>
            <a href='https://github.com/hwakeman/battleship'>
                <img src={require('../../images/github.png')}></img>
            </a>
        </div>
    );
}