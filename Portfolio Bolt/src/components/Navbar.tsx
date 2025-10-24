import { Moon, Sun, Github, Linkedin, Twitter } from 'lucide-react';
import '../styles/navbar.css';

interface NavbarProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Navbar = ({ darkMode, toggleTheme }: NavbarProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          <div className="nav-links">
            <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
            <button onClick={() => scrollToSection('projects')} className="nav-link">Projects</button>
            <button onClick={() => scrollToSection('skills')} className="nav-link">Skills</button>
            <button onClick={() => scrollToSection('achievements')} className="nav-link">Achievements</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact Me</button>
          </div>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <div className="social-sidebar">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
          <Github size={24} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
          <Linkedin size={24} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
          <Twitter size={24} />
        </a>
      </div>
    </>
  );
};

export default Navbar;
