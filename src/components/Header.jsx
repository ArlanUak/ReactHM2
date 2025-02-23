import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import RegistrationModal from "./RegistrationModal";

export default function Header({ onSearch }) {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      navigate("/profile");
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); 
  };
  
  return (
    <header>
      <div className="header">
        <nav className="nav">
          <Link to="/" className="nav_link">
            Главная
          </Link>
          <Link to="/about" className="nav_link">
            О нас
          </Link>
          <Link to="/books" className="nav_link">
            Книги
          </Link>
        </nav>

        <div id="search">
          <svg viewBox="0 0 420 60" xmlns="http://www.w3.org/2000/svg">
            <rect className="bar" />

            <g className="magnifier">
              <circle className="glass" />
              <line className="handle" x1="32" y1="32" x2="44" y2="44"></line>
            </g>

            <g className="sparks">
              <circle className="spark" />
              <circle className="spark" />
              <circle className="spark" />
            </g>

            <g className="burst pattern-one">
              <circle className="particle circle" />
              <path className="particle triangle" />
              <circle className="particle circle" />
              <path className="particle plus" />
              <rect className="particle rect" />
              <path className="particle triangle" />
            </g>
            <g className="burst pattern-two">
              <path className="particle plus" />
              <circle className="particle circle" />
              <path className="particle triangle" />
              <rect className="particle rect" />
              <circle className="particle circle" />
              <path className="particle plus" />
            </g>
            <g className="burst pattern-three">
              <circle className="particle circle" />
              <rect className="particle rect" />
              <path className="particle plus" />
              <path className="particle triangle" />
              <rect className="particle rect" />
              <path className="particle plus" />
            </g>
          </svg>
          <input type="search" name="q" aria-label="Search for inspiration"value={query}
          onChange={handleSearchChange}/>
        </div>

        <VscAccount
          className="account__logo"
          onClick={handleProfileClick}
          style={{ cursor: "pointer", color: "purple" }}
        />
        {isModalOpen && (
          <RegistrationModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>
    </header>
  );
}
