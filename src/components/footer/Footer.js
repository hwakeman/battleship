import FooterLinks from './FooterLinks';

export default function Footer() {
  const footer = document.createElement('div')
  footer.classList.add('footer')

  const footerText = document.createElement('div')
  footerText.classList.add('footer-text')
  footerText.innerHTML = 'Created by Harley Wakeman'

  footer.appendChild(footerText)
  footer.appendChild(FooterLinks())

  return footer
}