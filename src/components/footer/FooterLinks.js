import githubIconUrl from '../../images/github.png';

export default function FooterLinks() {
  const footerLinks = document.createElement('div');
  footerLinks.classList.add('footer-links');

  const githubLink = document.createElement('a');
  githubLink.href = 'https://github.com/hwakeman/battleship';

  const githubImage = document.createElement('img');
  githubImage.src = githubIconUrl;

  githubLink.appendChild(githubImage);
  footerLinks.appendChild(githubLink);

  return footerLinks;
}
