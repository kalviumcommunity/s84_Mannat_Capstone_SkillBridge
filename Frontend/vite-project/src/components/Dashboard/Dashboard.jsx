import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const features = [
    {
      id: 1,
      title: 'Skill Validation',
      description: 'Validate your expertise through comprehensive assessments',
      icon: '🎯',
      path: '/skills',
      color: '#FF6B6B'
    },
    {
      id: 2,
      title: 'AI Job Matching',
      description: 'Get personalized job recommendations based on your skills',
      icon: '🤖',
      path: '/jobs',
      color: '#4ECDC4'
    },
    {
      id: 3,
      title: 'Learning Hub',
      description: 'Access curated courses and resources to enhance your skills',
      icon: '📚',
      path: '/learn',
      color: '#45B7D1'
    },
    {
      id: 4,
      title: 'Dream Portfolio',
      description: 'Showcase your work and achievements in a stunning portfolio',
      icon: '✨',
      path: '/portfolio',
      color: '#96C93D'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Your Dream Dashboard</h1>
        <p>Explore the features and start your journey</p>
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <Link to={feature.path} key={feature.id} className="feature-card-link">
            <div 
              className="feature-card"
              style={{'--card-color': feature.color}}
            >
              <div className="feature-icon-wrapper">
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="card-decoration">
                <div className="glow"></div>
                <div className="particles">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="particle"></div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <h4>Skills Validated</h4>
          <span className="stat-number">12</span>
        </div>
        <div className="stat-card">
          <h4>Job Matches</h4>
          <span className="stat-number">24</span>
        </div>
        <div className="stat-card">
          <h4>Courses Completed</h4>
          <span className="stat-number">8</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 