import { useEffect, useRef } from 'react';
import '../styles/hero.css';

const Hero = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (nameRef.current) {
      observer.observe(nameRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="orbit-container">
          <h1 ref={nameRef} className="hero-name">
            Your Name
          </h1>
          <div className="orbit-ring orbit-1"></div>
          <div className="orbit-ring orbit-2"></div>
          <div className="orbit-ring orbit-3"></div>
        </div>
        <p className="hero-description">
          Frontend Developer | Tech Enthusiast | Java & Python Learner
        </p>
        <div className="hero-cta">
          <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="cta-button primary">
            View My Work
          </button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="cta-button secondary">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
