import { useEffect, useRef } from 'react';
import { Award, BookOpen, Trophy, Star } from 'lucide-react';
import '../styles/achievements.css';

interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

const achievements: Achievement[] = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    organization: 'Udemy Certification',
    date: '2024',
    description: 'Completed comprehensive full-stack development course covering React, Node.js, and MongoDB.',
    icon: <Award size={24} />,
  },
  {
    id: 2,
    title: 'Hackathon Winner',
    organization: 'Tech Innovation Challenge',
    date: '2023',
    description: 'First place in 48-hour hackathon for developing an AI-powered sustainability tracker.',
    icon: <Trophy size={24} />,
  },
  {
    id: 3,
    title: 'JavaScript Algorithms',
    organization: 'freeCodeCamp',
    date: '2023',
    description: 'Earned certification demonstrating proficiency in JavaScript algorithms and data structures.',
    icon: <BookOpen size={24} />,
  },
  {
    id: 4,
    title: 'Best UI/UX Design',
    organization: 'Design Awards',
    date: '2023',
    description: 'Recognized for exceptional user interface design in e-commerce platform project.',
    icon: <Star size={24} />,
  },
  {
    id: 5,
    title: 'Python for Data Science',
    organization: 'Coursera',
    date: '2022',
    description: 'Completed advanced Python course focusing on data analysis and machine learning fundamentals.',
    icon: <BookOpen size={24} />,
  },
  {
    id: 6,
    title: 'Open Source Contributor',
    organization: 'GitHub',
    date: '2022',
    description: 'Active contributor to multiple open-source projects with 100+ merged pull requests.',
    icon: <Star size={24} />,
  },
];

const Achievements = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

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

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <h2 className="section-title">Achievements & Certifications</h2>
        <p className="section-subtitle">Milestones in my learning journey</p>

        <div ref={timelineRef} className="timeline">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              ref={(el) => el && (itemsRef.current[index] = el)}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="timeline-content">
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-details">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <div className="achievement-meta">
                    <span className="achievement-org">{achievement.organization}</span>
                    <span className="achievement-date">{achievement.date}</span>
                  </div>
                  <p className="achievement-description">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
