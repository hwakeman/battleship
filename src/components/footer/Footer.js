import React from 'react'
import '../styles/footer.css'
import FooterLinks from './FooterLinks';

export default function Footer() {
    return (
      <div className='footer'>
        <div className='footer-text'>Created by Harley Wakeman</div>
        <FooterLinks/>
      </div>
    );
}