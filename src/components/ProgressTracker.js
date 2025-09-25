import React, { useState } from 'react';
import './ProgressTracker.css';

const ProgressTracker = ({ progress, studyData, updateProgress }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week'); // week, month, semester
  const [showAddProgress, setShowAddProgress] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    subject: '',
    hoursStudied: '',
    tasksCompleted: '',
    notes: '',
    mood: 'good'
  });

  const { goals, tasks, schedule } = studyData;

  const moods = [
    { value: 'excellent', label: '😊 Excellent', color: '#28a745' },
    { value: 'good', label: '😌 Good', color: '#17a2b8' },
    { value: 'okay', label: '😐 Okay', color: '#ffc107' },
    { value: 'poor', label: '😔 Poor', color: '#dc3545' }
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Psychology',
    'Engineering', 'Medicine', 'Law', 'Business', 'Art', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newProgress = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    updateProgress([...progress, newProgress]);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      subject: '',
      hoursStudied: '',
      tasksCompleted: '',
      notes: '',
      mood: 'good'
    });
    setShowAddProgress(false);
  };

  const getMoodInfo = (moodValue) => {
    return moods.find(mood => mood.value === moodValue) || moods[1];
  };

  // Calculate statistics
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalSessions = schedule.length;
  const upcomingSessions = schedule.filter(session => 
    new Date(session.date) >= new Date()
  ).length;

  // Calculate study hours from progress entries
  const totalStudyHours = progress.reduce((total, entry) => {
    return total + (parseFloat(entry.hoursStudied) || 0);
  }, 0);

  const averageStudyHours = progress.length > 0 ? totalStudyHours / progress.length : 0;

  // Get recent progress entries
  const recentProgress = progress
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

  // Calculate weekly progress
  const getWeekProgress = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    const weekProgress = progress.filter(entry => 
      new Date(entry.date) >= startOfWeek
    );
    
    return {
      hours: weekProgress.reduce((total, entry) => total + (parseFloat(entry.hoursStudied) || 0), 0),
      entries: weekProgress.length,
      averageMood: weekProgress.length > 0 ? 
        weekProgress.reduce((sum, entry) => {
          const moodValues = { excellent: 4, good: 3, okay: 2, poor: 1 };
          return sum + moodValues[entry.mood];
        }, 0) / weekProgress.length : 0
    };
  };

  const weekStats = getWeekProgress();

  return (
    <div className="progress-tracker">
      <div className="progress-header">
        <h2>📈 Progress Tracker</h2>
        <p>Monitor your academic progress and study habits</p>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddProgress(true)}
        >
          <span>➕</span>
          Add Progress Entry
        </button>
      </div>

      {/* Overall Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalGoals}</div>
          <div className="stat-label">Total Goals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedGoals}</div>
          <div className="stat-label">Completed Goals</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalTasks}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedTasks}</div>
          <div className="stat-label">Completed Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalSessions}</div>
          <div className="stat-label">Study Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalStudyHours.toFixed(1)}h</div>
          <div className="stat-label">Total Study Hours</div>
        </div>
      </div>

      {/* Weekly Overview */}
      <div className="card weekly-overview">
        <div className="card-header">
          <h3 className="card-title">📊 This Week's Progress</h3>
        </div>
        <div className="weekly-stats">
          <div className="weekly-stat">
            <div className="weekly-stat-number">{weekStats.hours.toFixed(1)}h</div>
            <div className="weekly-stat-label">Study Hours</div>
          </div>
          <div className="weekly-stat">
            <div className="weekly-stat-number">{weekStats.entries}</div>
            <div className="weekly-stat-label">Progress Entries</div>
          </div>
          <div className="weekly-stat">
            <div className="weekly-stat-number">
              {weekStats.averageMood > 0 ? 
                moods[Math.round(weekStats.averageMood) - 1].label : 'N/A'
              }
            </div>
            <div className="weekly-stat-label">Average Mood</div>
          </div>
        </div>
      </div>

      {/* Progress Form */}
      {showAddProgress && (
        <div className="card progress-form-card">
          <div className="card-header">
            <h3 className="card-title">Add Progress Entry</h3>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowAddProgress(false)}
            >
              ✕ Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="progress-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Hours Studied</label>
                <input
                  type="number"
                  name="hoursStudied"
                  value={formData.hoursStudied}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 2.5"
                  step="0.5"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tasks Completed</label>
                <input
                  type="number"
                  name="tasksCompleted"
                  value={formData.tasksCompleted}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 3"
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">How are you feeling?</label>
              <div className="mood-selector">
                {moods.map(mood => (
                  <label key={mood.value} className="mood-option">
                    <input
                      type="radio"
                      name="mood"
                      value={mood.value}
                      checked={formData.mood === mood.value}
                      onChange={handleInputChange}
                    />
                    <span className="mood-label">{mood.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="form-input form-textarea"
                placeholder="How did your study session go? Any insights or challenges?"
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <span>💾</span>
                Save Progress Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Recent Progress */}
      <div className="card recent-progress">
        <div className="card-header">
          <h3 className="card-title">📝 Recent Progress Entries</h3>
        </div>
        <div className="progress-entries">
          {recentProgress.length > 0 ? (
            recentProgress.map(entry => {
              const moodInfo = getMoodInfo(entry.mood);
              return (
                <div key={entry.id} className="progress-entry">
                  <div className="progress-entry-header">
                    <div className="progress-date">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div className="progress-mood" style={{ backgroundColor: moodInfo.color }}>
                      {moodInfo.label}
                    </div>
                  </div>
                  
                  <div className="progress-entry-content">
                    {entry.subject && (
                      <div className="progress-subject">
                        <strong>Subject:</strong> {entry.subject}
                      </div>
                    )}
                    
                    <div className="progress-stats">
                      {entry.hoursStudied && (
                        <span className="progress-stat">
                          📚 {entry.hoursStudied}h studied
                        </span>
                      )}
                      {entry.tasksCompleted && (
                        <span className="progress-stat">
                          ✅ {entry.tasksCompleted} tasks completed
                        </span>
                      )}
                    </div>
                    
                    {entry.notes && (
                      <div className="progress-notes">
                        <strong>Notes:</strong> {entry.notes}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <h3>📈 No Progress Entries Yet</h3>
              <p>Start tracking your study progress to see insights and improvements!</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddProgress(true)}
              >
                <span>➕</span>
                Add Your First Entry
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Study Habits Insights */}
      <div className="card insights-card">
        <div className="card-header">
          <h3 className="card-title">💡 Study Insights</h3>
        </div>
        <div className="insights-content">
          <div className="insight-item">
            <div className="insight-icon">📊</div>
            <div className="insight-text">
              <strong>Average Study Time:</strong> {averageStudyHours.toFixed(1)} hours per session
            </div>
          </div>
          
          <div className="insight-item">
            <div className="insight-icon">🎯</div>
            <div className="insight-text">
              <strong>Goal Completion Rate:</strong> {totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0}%
            </div>
          </div>
          
          <div className="insight-item">
            <div className="insight-icon">📝</div>
            <div className="insight-text">
              <strong>Task Completion Rate:</strong> {totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%
            </div>
          </div>
          
          <div className="insight-item">
            <div className="insight-icon">📅</div>
            <div className="insight-text">
              <strong>Upcoming Sessions:</strong> {upcomingSessions} scheduled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
