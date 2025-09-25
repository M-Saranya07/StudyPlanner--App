import React, { useState } from 'react';
import './StudySchedule.css';

const StudySchedule = ({ schedule, updateSchedule }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [viewMode, setViewMode] = useState('week'); // week, month, list
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '',
    subject: '',
    type: 'study',
    location: '',
    reminder: false
  });

  const sessionTypes = [
    { value: 'study', label: '📚 Study Session', color: '#667eea' },
    { value: 'lecture', label: '🎓 Lecture', color: '#28a745' },
    { value: 'exam', label: '📝 Exam', color: '#dc3545' },
    { value: 'assignment', label: '📋 Assignment', color: '#ffc107' },
    { value: 'group', label: '👥 Group Study', color: '#17a2b8' },
    { value: 'break', label: '☕ Break', color: '#6c757d' },
    { value: 'other', label: '📅 Other', color: '#6f42c1' }
  ];

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'English', 'History', 'Geography', 'Economics', 'Psychology',
    'Engineering', 'Medicine', 'Law', 'Business', 'Art', 'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingSession) {
      // Update existing session
      const updatedSchedule = schedule.map(session => 
        session.id === editingSession.id 
          ? { ...session, ...formData, updatedAt: new Date().toISOString() }
          : session
      );
      updateSchedule(updatedSchedule);
    } else {
      // Add new session
      const newSession = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      updateSchedule([...schedule, newSession]);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '',
      subject: '',
      type: 'study',
      location: '',
      reminder: false
    });
    setShowForm(false);
    setEditingSession(null);
  };

  const handleEdit = (session) => {
    setFormData({
      title: session.title,
      description: session.description,
      date: session.date,
      time: session.time,
      duration: session.duration,
      subject: session.subject,
      type: session.type,
      location: session.location,
      reminder: session.reminder
    });
    setEditingSession(session);
    setShowForm(true);
  };

  const handleDelete = (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      const updatedSchedule = schedule.filter(session => session.id !== sessionId);
      updateSchedule(updatedSchedule);
    }
  };

  const getSessionTypeInfo = (typeValue) => {
    return sessionTypes.find(type => type.value === typeValue) || sessionTypes[0];
  };

  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const getSessionsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return schedule.filter(session => session.date === dateStr);
  };

  const getUpcomingSessions = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedule
      .filter(session => session.date >= today)
      .sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
  };

  const weekDates = getWeekDates();
  const upcomingSessions = getUpcomingSessions();

  return (
    <div className="study-schedule">
      <div className="schedule-header">
        <h2>📅 Study Schedule</h2>
        <p>Plan and manage your study sessions</p>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <span>➕</span>
          Add Study Session
        </button>
      </div>

      {/* View Mode Toggle */}
      <div className="card view-mode-card">
        <div className="view-mode-toggle">
          <button 
            className={`view-btn ${viewMode === 'week' ? 'active' : ''}`}
            onClick={() => setViewMode('week')}
          >
            📅 Week View
          </button>
          <button 
            className={`view-btn ${viewMode === 'month' ? 'active' : ''}`}
            onClick={() => setViewMode('month')}
          >
            📆 Month View
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            📋 List View
          </button>
        </div>
      </div>

      {/* Session Form */}
      {showForm && (
        <div className="card session-form-card">
          <div className="card-header">
            <h3 className="card-title">
              {editingSession ? 'Edit Session' : 'Create New Session'}
            </h3>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                setEditingSession(null);
                setFormData({
                  title: '',
                  description: '',
                  date: '',
                  time: '',
                  duration: '',
                  subject: '',
                  type: 'study',
                  location: '',
                  reminder: false
                });
              }}
            >
              ✕ Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="session-form">
            <div className="form-group">
              <label className="form-label">Session Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., Calculus Review"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-input form-textarea"
                placeholder="What will you study in this session?"
                rows="3"
              />
            </div>

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
                <label className="form-label">Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 2 hours, 90 minutes"
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
                <label className="form-label">Session Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {sessionTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., Library, Home, Classroom"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="reminder"
                  checked={formData.reminder}
                  onChange={handleInputChange}
                />
                <span className="checkbox-text">Set reminder for this session</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <span>{editingSession ? '💾' : '➕'}</span>
                {editingSession ? 'Update Session' : 'Create Session'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Schedule Views */}
      {viewMode === 'week' && (
        <div className="week-view">
          <div className="week-header">
            <h3>This Week's Schedule</h3>
          </div>
          <div className="week-grid">
            {weekDates.map(date => {
              const sessions = getSessionsForDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div key={date.toISOString()} className={`day-column ${isToday ? 'today' : ''}`}>
                  <div className="day-header">
                    <div className="day-name">{date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className="day-number">{date.getDate()}</div>
                  </div>
                  <div className="day-sessions">
                    {sessions.length > 0 ? (
                      sessions.map(session => {
                        const typeInfo = getSessionTypeInfo(session.type);
                        return (
                          <div key={session.id} className="session-item" style={{ borderLeftColor: typeInfo.color }}>
                            <div className="session-time">{session.time}</div>
                            <div className="session-title">{session.title}</div>
                            {session.subject && (
                              <div className="session-subject">{session.subject}</div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div className="no-sessions">No sessions</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {viewMode === 'list' && (
        <div className="list-view">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📅 Upcoming Sessions</h3>
            </div>
            <div className="sessions-list">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map(session => {
                  const typeInfo = getSessionTypeInfo(session.type);
                  return (
                    <div key={session.id} className="session-list-item">
                      <div className="session-info">
                        <div className="session-type" style={{ backgroundColor: typeInfo.color }}>
                          {typeInfo.label}
                        </div>
                        <div className="session-details">
                          <h4 className="session-title">{session.title}</h4>
                          <div className="session-meta">
                            <span className="session-date">
                              {new Date(session.date).toLocaleDateString()} at {session.time}
                            </span>
                            {session.subject && (
                              <span className="session-subject">• {session.subject}</span>
                            )}
                            {session.duration && (
                              <span className="session-duration">• {session.duration}</span>
                            )}
                          </div>
                          {session.description && (
                            <p className="session-description">{session.description}</p>
                          )}
                          {session.location && (
                            <div className="session-location">📍 {session.location}</div>
                          )}
                        </div>
                      </div>
                      <div className="session-actions">
                        <button 
                          className="btn-icon"
                          onClick={() => handleEdit(session)}
                          title="Edit Session"
                        >
                          ✏️
                        </button>
                        <button 
                          className="btn-icon btn-danger"
                          onClick={() => handleDelete(session.id)}
                          title="Delete Session"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-state">
                  <h3>📅 No Upcoming Sessions</h3>
                  <p>Schedule your first study session to get started!</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                  >
                    <span>➕</span>
                    Schedule Your First Session
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'month' && (
        <div className="month-view">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📆 Month View</h3>
            </div>
            <div className="month-placeholder">
              <p>Month view coming soon! For now, use the week or list view.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudySchedule;
