import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    skills: user?.skills || [],
    experience: user?.experience || '',
    education: user?.education || '',
    location: user?.location || '',
    phone: user?.phone || '',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    website: user?.website || ''
  });

  // Mock data for progress tracking
  const skillProgress = [
    { name: 'JavaScript', progress: 85, level: 'Advanced' },
    { name: 'React', progress: 75, level: 'Intermediate' },
    { name: 'Node.js', progress: 65, level: 'Intermediate' },
    { name: 'Python', progress: 90, level: 'Expert' }
  ];

  const applicationStatus = [
    { company: 'Tech Corp', position: 'Senior Developer', status: 'Interview Scheduled', date: '2024-03-15' },
    { company: 'Innovate Inc', position: 'Full Stack Developer', status: 'Under Review', date: '2024-03-10' },
    { company: 'Digital Solutions', position: 'Frontend Developer', status: 'Application Sent', date: '2024-03-05' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the user profile
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      // Here you would typically make an API call to delete the user profile
      logout();
      navigate('/');
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
          <div className="profile-info">
            <h1>{user?.name || 'User Name'}</h1>
            <p className="user-email">{user?.email}</p>
            {!isEditing && (
              <button 
                className="edit-profile-btn"
                onClick={() => setIsEditing(true)}
              >
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="profile-content">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-section">
                <h3>Personal Information</h3>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Professional Links</h3>
                <div className="form-group">
                  <label>GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>About</h3>
                <div className="form-group">
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Skills</h3>
                <div className="form-group">
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills.join(', ')}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      skills: e.target.value.split(',').map(skill => skill.trim())
                    }))}
                    placeholder="Enter skills separated by commas"
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Experience</h3>
                <div className="form-group">
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe your work experience..."
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Education</h3>
                <div className="form-group">
                  <textarea
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe your educational background..."
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="save-btn">
                  <i className="fas fa-save"></i> Save Changes
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="profile-section">
                <h3>About</h3>
                <p>{user?.bio || 'No bio available'}</p>
              </div>

              <div className="profile-section">
                <h3>Contact Information</h3>
                <div className="contact-info">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>{user?.email}</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>{user?.phone || 'Not specified'}</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{user?.location || 'Not specified'}</span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h3>Professional Links</h3>
                <div className="social-links">
                  {user?.github && (
                    <a href={user.github} target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-github"></i>
                      <span>GitHub</span>
                    </a>
                  )}
                  {user?.linkedin && (
                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fab fa-linkedin"></i>
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {user?.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="social-link">
                      <i className="fas fa-globe"></i>
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="profile-section">
                <h3>Skills</h3>
                <div className="skills-list">
                  {user?.skills?.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <h3>Experience</h3>
                <p>{user?.experience || 'No experience details available'}</p>
              </div>

              <div className="profile-section">
                <h3>Education</h3>
                <p>{user?.education || 'No education details available'}</p>
              </div>

              <div className="profile-section">
                <h3>Skills Progress</h3>
                <div className="skills-progress">
                  {skillProgress.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{skill.progress}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="profile-section">
                <h3>Application Status</h3>
                <div className="applications-list">
                  {applicationStatus.map((app, index) => (
                    <div key={index} className="application-item">
                      <div className="application-header">
                        <h4>{app.position}</h4>
                        <span className={`status-badge ${app.status.toLowerCase().replace(' ', '-')}`}>
                          {app.status}
                        </span>
                      </div>
                      <p className="company-name">{app.company}</p>
                      <p className="application-date">Applied on: {app.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button onClick={handleLogout} className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
          <button onClick={handleDeleteProfile} className="delete-btn">
            <i className="fas fa-trash-alt"></i> Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 