import React, { useState, useEffect } from 'react';
import StudyDashboard from './components/StudyDashboard';
import StudyGoal from './components/StudyGoal';
import TaskManager from './components/TaskManager';
import StudySchedule from './components/StudySchedule';
import ProgressTracker from './components/ProgressTracker';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [studyData, setStudyData] = useState({
    goals: [],
    tasks: [],
    schedule: [],
    progress: []
  });

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('studyPlannerData');
    if (savedData) {
      setStudyData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever studyData changes
  useEffect(() => {
    localStorage.setItem('studyPlannerData', JSON.stringify(studyData));
  }, [studyData]);

  const updateStudyData = (section, data) => {
    setStudyData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
    { id: 'goals', label: '🎯 Goals', icon: '🎯' },
    { id: 'tasks', label: '📝 Tasks', icon: '📝' },
    { id: 'schedule', label: '📅 Schedule', icon: '📅' },
    { id: 'progress', label: '📈 Progress', icon: '📈' }
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StudyDashboard studyData={studyData} />;
      case 'goals':
        return <StudyGoal goals={studyData.goals} updateGoals={(goals) => updateStudyData('goals', goals)} />;
      case 'tasks':
        return <TaskManager tasks={studyData.tasks} updateTasks={(tasks) => updateStudyData('tasks', tasks)} />;
      case 'schedule':
        return <StudySchedule schedule={studyData.schedule} updateSchedule={(schedule) => updateStudyData('schedule', schedule)} />;
      case 'progress':
        return <ProgressTracker progress={studyData.progress} studyData={studyData} updateProgress={(progress) => updateStudyData('progress', progress)} />;
      default:
        return <StudyDashboard studyData={studyData} />;
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>📚 Study Planner</h1>
          <p>Organize your academic journey and boost productivity</p>
        </div>
      </header>
      
      <nav className="app-nav">
        <div className="nav-container">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <main className="app-main">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;
