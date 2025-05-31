import React, { useState } from 'react';
import './Skill.css';

const skills = [
  'JavaScript', 'Python', 'C++', 'Java', 'React', 'Node.js',
  'HTML/CSS', 'MongoDB', 'MySQL', 'DSA', 'TypeScript', 'Express.js'
];

const questionsBank = {
  JavaScript: [
    {
      question: 'What will `typeof NaN` return?',
      options: ['number', 'NaN', 'undefined', 'object'],
      answer: 'number',
    },
    {
      question: 'What is the output of `[] + []` in JavaScript?',
      options: ['""', 'undefined', 'object', 'error'],
      answer: '""',
    },
    {
      question: 'Which of these is NOT a falsy value?',
      options: ['0', '""', 'false', '{}'],
      answer: '{}',
    },
    // ... Add up to 30 tricky JS questions
  ],
  Python: [
    {
      question: 'What does the `@staticmethod` decorator do?',
      options: [
        'Creates a static method',
        'Creates a private method',
        'Makes method asynchronous',
        'Enforces type checking'
      ],
      answer: 'Creates a static method',
    },
    {
      question: 'Which of the following is immutable?',
      options: ['List', 'Set', 'Dictionary', 'Tuple'],
      answer: 'Tuple',
    },
    // Add 28 more
  ],
  // Add other skills similarly...
};

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = selectedSkill ? questionsBank[selectedSkill] || [] : [];

  const handleAnswer = (option) => {
    if (option === questions[currentQIndex].answer) setScore(score + 1);
    const next = currentQIndex + 1;
    if (next < questions.length) setCurrentQIndex(next);
    else setShowScore(true);
  };

  return (
    <div className="skills-container">
      {!selectedSkill ? (
        <div className="card-grid">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-card"
              onClick={() => {
                setSelectedSkill(skill);
                setCurrentQIndex(0);
                setScore(0);
                setShowScore(false);
              }}
            >
              <span>{skill}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="quiz-section">
          <h2>{selectedSkill} Quiz</h2>
          {!showScore ? (
            <>
              <p className="question">{questions[currentQIndex]?.question}</p>
              <div className="options">
                {questions[currentQIndex]?.options.map((opt, idx) => (
                  <button key={idx} onClick={() => handleAnswer(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
              <p className="progress">{currentQIndex + 1} / {questions.length}</p>
            </>
          ) : (
            <>
              <h3>Your Score: {score} / {questions.length}</h3>
              <button className="back-btn" onClick={() => setSelectedSkill(null)}>Go Back</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
