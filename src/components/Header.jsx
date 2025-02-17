import {Link} from "react-router-dom"

export default function Header() {
  return (
    <header>
      <nav className="nav">
        
        <Link to="/" className="nav_link">Главная</Link>
        <Link to="/about" className="nav_link">О нас</Link>
        <Link to="/books" className="nav_link">Книги</Link>
      </nav>
    </header>
  );
}
