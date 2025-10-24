import { useEffect, useRef, useState } from 'react';
import { Code, Database, Layout, Server, Terminal, Zap } from 'lucide-react';
import '../styles/skills.css';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  category: string;
}

const skills: Skill[] = [
  { name: 'HTML/CSS', level: 95, icon: <Layout size={28} />, category: 'Frontend' },
  { name: 'JavaScript', level: 90, icon: <Code size={28} />, category: 'Frontend' },
  { name: 'React', level: 88, icon: <Zap size={28} />, category: 'Frontend' },
  { name: 'TypeScript', level: 85, icon: <Code size={28} />, category: 'Frontend' },
  { name: 'Node.js', level: 82, icon: <Server size={28} />, category: 'Backend' },
  { name: 'Python', level: 78, icon: <Terminal size={28} />, category: 'Backend' },
  { name: 'Java', level: 75, icon: <Terminal size={28} />, category: 'Backend' },
  { name: 'MongoDB', level: 80, icon: <Database size={28} />, category: 'Database' },
];

const Skills = () => {
  const [visibleSkills, setVisibleSkills] = useState<boolean[]>(new Array(skills.length).fill(false));
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = skillRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setVisibleSkills((prev) => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">Technologies and tools I work with</p>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => (skillRefs.current[index] = el)}
              className={`skill-card ${visibleSkills[index] ? 'visible' : ''}`}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-category">{skill.category}</div>
              <div className="skill-progress-container">
                <div
                  className="skill-progress-bar"
                  style={{
                    width: visibleSkills[index] ? `${skill.level}%` : '0%',
                  }}
                >
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
