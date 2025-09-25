import React from 'react';
import './StudyDashboard.css';

const StudyDashboard = ({ studyData }) => {
  const { goals, tasks, schedule, progress } = studyData;

  // Calculate statistics
  const totalGoals = goals.length;
  const completedGoals = goals.filter(goal => goal.status === 'completed').length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const upcomingSessions = schedule.filter(session => 
    new Date(session.date) > new Date()
  ).length;

  // Calculate completion percentages
  const goalCompletionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get recent activities
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const upcomingSchedule = schedule
    .filter(session => new Date(session.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="study-dashboard">
      <div className="dashboard-header">
        <h2>{getGreeting()}! 🌟</h2>
        <p>Here's your study overview for today</p>
      </div>

      {/* Statistics Cards */}
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
          <div className="stat-number">{upcomingSessions}</div>
          <div className="stat-label">Upcoming Sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{goalCompletionRate}%</div>
          <div className="stat-label">Goal Progress</div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📊 Progress Overview</h3>
          </div>
          <div className="progress-section">
            <div className="progress-item">
              <div className="progress-label">
                <span>Goals Progress</span>
                <span>{goalCompletionRate}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${goalCompletionRate}%` }}
                ></div>
              </div>
            </div>
            <div className="progress-item">
              <div className="progress-label">
                <span>Tasks Progress</span>
                <span>{taskCompletionRate}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${taskCompletionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">🎯 Active Goals</h3>
          </div>
          <div className="goals-preview">
            {goals.filter(goal => goal.status === 'active').length > 0 ? (
              goals
                .filter(goal => goal.status === 'active')
                .slice(0, 3)
                .map(goal => (
                  <div key={goal.id} className="goal-item">
                    <div className="goal-title">{goal.title}</div>
                    <div className="goal-deadline">
                      Due: {new Date(goal.deadline).toLocaleDateString()}
                    </div>
                  </div>
                ))
            ) : (
              <p className="empty-state">No active goals yet. Create your first goal!</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📝 Recent Tasks</h3>
          </div>
          <div className="tasks-preview">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-title">{task.title}</div>
                  <div className={`task-priority priority-${task.priority}`}>
                    {task.priority}
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">No tasks yet. Add your first task!</p>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">📅 Upcoming Schedule</h3>
          </div>
          <div className="schedule-preview">
            {upcomingSchedule.length > 0 ? (
              upcomingSchedule.map(session => (
                <div key={session.id} className="schedule-item">
                  <div className="schedule-title">{session.title}</div>
                  <div className="schedule-time">
                    {new Date(session.date).toLocaleDateString()} at {session.time}
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-state">No upcoming sessions. Plan your study schedule!</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">⚡ Quick Actions</h3>
        </div>
        <div className="quick-actions">
          <button className="btn btn-primary">
            <span>🎯</span>
            Add New Goal
          </button>
          <button className="btn btn-primary">
            <span>📝</span>
            Add New Task
          </button>
          <button className="btn btn-primary">
            <span>📅</span>
            Schedule Study Session
          </button>
          <button className="btn btn-secondary">
            <span>📈</span>
            View Progress
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudyDashboard;
