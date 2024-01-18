import './app.css';

import Body from './components/Body';
import Header from './components/Header';
import Footer from './components/footer/Footer';

document.getElementById('content').appendChild(Header());
document.getElementById('content').appendChild(Body());
document.getElementById('content').appendChild(Footer());
