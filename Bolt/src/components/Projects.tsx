import { useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import '../styles/projects.css';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with cart functionality, user authentication, and payment integration.',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['React', 'Node.js', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates and team collaboration features.',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['React', 'Firebase', 'Tailwind'],
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with interactive maps, forecasts, and location-based weather data.',
    image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['JavaScript', 'API', 'CSS'],
  },
  {
    id: 4,
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for tracking social media metrics across multiple platforms with data visualization.',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['React', 'D3.js', 'Express'],
  },
  {
    id: 5,
    title: 'Portfolio Builder',
    description: 'A drag-and-drop portfolio builder that lets users create stunning portfolio websites without coding.',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['React', 'TypeScript', 'CSS'],
  },
  {
    id: 6,
    title: 'AI Chat Assistant',
    description: 'An intelligent chatbot powered by natural language processing for customer support automation.',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['Python', 'React', 'OpenAI'],
  },
];

const Projects = () => {
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>
        <p className="section-subtitle">Showcasing my recent work and creative solutions</p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => el && (cardsRef.current[index] = el)}
              className="project-card"
            >
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      <Github size={20} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
