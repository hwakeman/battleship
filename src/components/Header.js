export default function Header() {
  const header = document.createElement('div');
  header.classList.add('header');
  header.innerHTML = 'Battleship';

  return header;
}
