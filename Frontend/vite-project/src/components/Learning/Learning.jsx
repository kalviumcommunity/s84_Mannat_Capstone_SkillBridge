import { useState, useEffect } from 'react';
import { FaYoutube, FaBook, FaPlay, FaLock, FaCheck, FaClock, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import './Learning.css';

const dsaTopics = [
  {
    id: 1,
    title: 'Arrays & Strings',
    problems: [
      { id: 1, title: 'Two Sum', difficulty: 'Easy', link: 'https://leetcode.com/problems/two-sum/' },
      { id: 2, title: 'Valid Parentheses', difficulty: 'Easy', link: 'https://leetcode.com/problems/valid-parentheses/' },
      { id: 3, title: 'Merge Intervals', difficulty: 'Medium', link: 'https://leetcode.com/problems/merge-intervals/' },
      { id: 4, title: '3Sum', difficulty: 'Medium', link: 'https://leetcode.com/problems/3sum/' },
      { id: 5, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' }
    ]
  },
  {
    id: 2,
    title: 'Binary Search',
    problems: [
      { id: 1, title: 'Binary Search', difficulty: 'Easy', link: 'https://leetcode.com/problems/binary-search/' },
      { id: 2, title: 'Search in Rotated Sorted Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
      { id: 3, title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'Medium', link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/' },
      { id: 4, title: 'Search a 2D Matrix', difficulty: 'Medium', link: 'https://leetcode.com/problems/search-a-2d-matrix/' }
    ]
  },
  {
    id: 3,
    title: 'Dynamic Programming',
    problems: [
      { id: 1, title: 'Climbing Stairs', difficulty: 'Easy', link: 'https://leetcode.com/problems/climbing-stairs/' },
      { id: 2, title: 'Longest Increasing Subsequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-increasing-subsequence/' },
      { id: 3, title: 'Coin Change', difficulty: 'Medium', link: 'https://leetcode.com/problems/coin-change/' },
      { id: 4, title: 'Longest Common Subsequence', difficulty: 'Medium', link: 'https://leetcode.com/problems/longest-common-subsequence/' },
      { id: 5, title: 'Word Break', difficulty: 'Medium', link: 'https://leetcode.com/problems/word-break/' }
    ]
  },
  {
    id: 4,
    title: 'Trees & Graphs',
    problems: [
      { id: 1, title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
      { id: 2, title: 'Number of Islands', difficulty: 'Medium', link: 'https://leetcode.com/problems/number-of-islands/' },
      { id: 3, title: 'Course Schedule', difficulty: 'Medium', link: 'https://leetcode.com/problems/course-schedule/' },
      { id: 4, title: 'Redundant Connection', difficulty: 'Medium', link: 'https://leetcode.com/problems/redundant-connection/' }
    ]
  }
];

const Learning = () => {
  const [activeTab, setActiveTab] = useState('dsa');
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Web Development Fundamentals',
      description: 'Master the basics of HTML, CSS, and JavaScript',
      level: 'Beginner',
      duration: '8 weeks',
      enrolled: true,
      progress: 65,
      topics: [
        {
          id: 1,
          title: 'HTML Basics',
          videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
          docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          completed: true
        },
        {
          id: 2,
          title: 'CSS Styling',
          videoUrl: 'https://www.youtube.com/watch?v=1PnVor36_40',
          docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          completed: true
        },
        {
          id: 3,
          title: 'JavaScript Fundamentals',
          videoUrl: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
          docsUrl: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          completed: false
        }
      ]
    },
    {
      id: 2,
      title: 'React.js Masterclass',
      description: 'Build modern web applications with React',
      level: 'Intermediate',
      duration: '10 weeks',
      enrolled: false,
      progress: 0,
      topics: [
        {
          id: 1,
          title: 'React Components',
          videoUrl: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
          docsUrl: 'https://reactjs.org/docs/components-and-props.html',
          completed: false
        },
        {
          id: 2,
          title: 'Hooks and State',
          videoUrl: 'https://www.youtube.com/watch?v=TNhaISOUy6Q',
          docsUrl: 'https://reactjs.org/docs/hooks-intro.html',
          completed: false
        },
        {
          id: 3,
          title: 'React Router',
          videoUrl: 'https://www.youtube.com/watch?v=Law7wfdg_ls',
          docsUrl: 'https://reactrouter.com/docs/en/v6',
          completed: false
        }
      ]
    },
    {
      id: 3,
      title: 'Node.js Backend Development',
      description: 'Create robust server-side applications',
      level: 'Advanced',
      duration: '12 weeks',
      enrolled: false,
      progress: 0,
      topics: [
        {
          id: 1,
          title: 'Node.js Basics',
          videoUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
          docsUrl: 'https://nodejs.org/en/docs/',
          completed: false
        },
        {
          id: 2,
          title: 'Express.js Framework',
          videoUrl: 'https://www.youtube.com/watch?v=L72fhGm1tfE',
          docsUrl: 'https://expressjs.com/en/4x/api.html',
          completed: false
        },
        {
          id: 3,
          title: 'MongoDB Integration',
          videoUrl: 'https://www.youtube.com/watch?v=Www6cTUymCY',
          docsUrl: 'https://docs.mongodb.com/',
          completed: false
        }
      ]
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [completedProblems, setCompletedProblems] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});
  const [checked, setChecked] = useState({});

  const handleEnroll = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId 
        ? { ...course, enrolled: true }
        : course
    ));
  };

  const handleTopicComplete = (courseId, topicId) => {
    setCourses(courses.map(course => {
      if (course.id === courseId) {
        const updatedTopics = course.topics.map(topic =>
          topic.id === topicId ? { ...topic, completed: true } : topic
        );
        const progress = (updatedTopics.filter(t => t.completed).length / updatedTopics.length) * 100;
        return { ...course, topics: updatedTopics, progress };
      }
      return course;
    }));
  };

  const handleProblemComplete = (problemId) => {
    setCompletedProblems(prev => ({
      ...prev,
      [problemId]: !prev[problemId]
    }));
  };

  const handleCheck = (topicId, problemId) => {
    setChecked(prev => ({
      ...prev,
      [topicId]: {
        ...prev[topicId],
        [problemId]: !prev[topicId]?.[problemId]
      }
    }));
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const getTopicProgress = (topic) => {
    const total = topic.problems.length;
    const done = topic.problems.filter(p => checked[topic.id]?.[p.id]).length;
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  return (
    <div className="learning-container">
      <div className="learning-header">
        <h1>Learning Hub</h1>
        <p>Expand your skills with our curated courses and DSA practice</p>
        <div className="learning-tabs">
          <button 
            className={`tab-button ${activeTab === 'dsa' ? 'active' : ''}`}
            onClick={() => setActiveTab('dsa')}
          >
            DSA Practice
          </button>
          <button 
            className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Skill Courses
          </button>
        </div>
        {activeTab === 'courses' && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="learning-content">
        {activeTab === 'dsa' && (
          <div className="dsa-section">
            {dsaTopics.map((topic) => {
              const progress = getTopicProgress(topic);
              return (
                <div key={topic.id} className="topic-section">
                  <div className="topic-header" onClick={() => toggleTopic(topic.id)}>
                    <h3 className="topic-title">{topic.title}</h3>
                    <button className={`expand-button ${expandedTopics[topic.id] ? 'expanded' : ''}`}>
                      <span className="expand-icon"></span>
                    </button>
                  </div>
                  <div className={`problems-table ${expandedTopics[topic.id] ? 'expanded' : ''}`}>
                    {expandedTopics[topic.id] && (
                      <div className="topic-progress-bar-wrapper">
                        <div className="topic-progress-bar">
                          <div className="topic-progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className="topic-progress-label">{progress}% Completed</span>
                      </div>
                    )}
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>#</th>
                          <th>Problem</th>
                          <th>Difficulty</th>
                          <th>Link</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topic.problems.map((problem, index) => (
                          <tr key={problem.id}>
                            <td>
                              <input
                                type="checkbox"
                                checked={!!checked[topic.id]?.[problem.id]}
                                onChange={() => handleCheck(topic.id, problem.id)}
                              />
                            </td>
                            <td>{index + 1}</td>
                            <td>{problem.title}</td>
                            <td>
                              <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                                {problem.difficulty}
                              </span>
                            </td>
                            <td>
                              <a 
                                href={problem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="leetcode-link"
                              >
                                <img 
                                  src="https://leetcode.com/favicon.ico" 
                                  alt="LeetCode" 
                                  className="leetcode-icon"
                                />
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {activeTab === 'courses' && (
          <div className="courses-section">
            <div className="courses-grid">
              {filteredCourses.map(course => (
                <div key={course.id} className="course-card">
                  <div className="course-header">
                    <h3>{course.title}</h3>
                    <span className={`level-badge ${course.level.toLowerCase()}`}>
                      {course.level}
                    </span>
                  </div>
                  <p className="course-description">{course.description}</p>
                  <div className="course-meta">
                    <span className="duration">
                      <FaClock /> {course.duration}
                    </span>
                    {course.enrolled && (
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                        <span>{Math.round(course.progress)}% Complete</span>
                      </div>
                    )}
                  </div>
                  {course.enrolled ? (
                    <button 
                      className="view-course-btn"
                      onClick={() => setSelectedCourse(course)}
                    >
                      Continue Learning
                    </button>
                  ) : (
                    <button 
                      className="enroll-btn"
                      onClick={() => handleEnroll(course.id)}
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedCourse && (
        <div className="course-details-modal">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setSelectedCourse(null)}
            >
              ×
            </button>
            <h2>{selectedCourse.title}</h2>
            <div className="topics-list">
              {selectedCourse.topics.map(topic => (
                <div key={topic.id} className="topic-item">
                  <div className="topic-header">
                    <h4>{topic.title}</h4>
                    {topic.completed ? (
                      <span className="completed-badge">
                        <FaCheck /> Completed
                      </span>
                    ) : (
                      <button
                        className="complete-btn"
                        onClick={() => handleTopicComplete(selectedCourse.id, topic.id)}
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                  <div className="topic-resources">
                    <a 
                      href={topic.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="resource-link youtube"
                    >
                      <FaYoutube /> Watch Tutorial
                    </a>
                    <a 
                      href={topic.docsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="resource-link docs"
                    >
                      <FaBook /> Read Documentation
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning; 