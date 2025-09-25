import React, { useState } from 'react';
import './StudyGoal.css';

const StudyGoal = ({ goals, updateGoals }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 'medium',
    status: 'active',
    category: 'academic'
  });

  const categories = [
    { value: 'academic', label: '📚 Academic', color: '#667eea' },
    { value: 'exam', label: '📝 Exam Preparation', color: '#dc3545' },
    { value: 'project', label: '💼 Project', color: '#28a745' },
    { value: 'research', label: '🔬 Research', color: '#17a2b8' },
    { value: 'skill', label: '🎯 Skill Development', color: '#ffc107' },
    { value: 'other', label: '📋 Other', color: '#6c757d' }
  ];

  const priorities = [
    { value: 'high', label: 'High Priority', color: '#dc3545' },
    { value: 'medium', label: 'Medium Priority', color: '#ffc107' },
    { value: 'low', label: 'Low Priority', color: '#28a745' }
  ];

  const statuses = [
    { value: 'active', label: 'Active', color: '#667eea' },
    { value: 'completed', label: 'Completed', color: '#28a745' },
    { value: 'paused', label: 'Paused', color: '#ffc107' },
    { value: 'cancelled', label: 'Cancelled', color: '#dc3545' }
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
    
    if (editingGoal) {
      // Update existing goal
      const updatedGoals = goals.map(goal => 
        goal.id === editingGoal.id 
          ? { ...goal, ...formData, updatedAt: new Date().toISOString() }
          : goal
      );
      updateGoals(updatedGoals);
    } else {
      // Add new goal
      const newGoal = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      updateGoals([...goals, newGoal]);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      deadline: '',
      priority: 'medium',
      status: 'active',
      category: 'academic'
    });
    setShowForm(false);
    setEditingGoal(null);
  };

  const handleEdit = (goal) => {
    setFormData({
      title: goal.title,
      description: goal.description,
      deadline: goal.deadline,
      priority: goal.priority,
      status: goal.status,
      category: goal.category
    });
    setEditingGoal(goal);
    setShowForm(true);
  };

  const handleDelete = (goalId) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      const updatedGoals = goals.filter(goal => goal.id !== goalId);
      updateGoals(updatedGoals);
    }
  };

  const handleStatusChange = (goalId, newStatus) => {
    const updatedGoals = goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, status: newStatus, updatedAt: new Date().toISOString() }
        : goal
    );
    updateGoals(updatedGoals);
  };

  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[0];
  };

  const getPriorityInfo = (priorityValue) => {
    return priorities.find(pri => pri.value === priorityValue) || priorities[1];
  };

  const getStatusInfo = (statusValue) => {
    return statuses.find(stat => stat.value === statusValue) || statuses[0];
  };

  const isOverdue = (deadline) => {
    return new Date(deadline) < new Date() && new Date(deadline).toDateString() !== new Date().toDateString();
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="study-goal">
      <div className="goals-header">
        <h2>🎯 Study Goals</h2>
        <p>Set and track your academic objectives</p>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <span>➕</span>
          Add New Goal
        </button>
      </div>

      {/* Goal Form */}
      {showForm && (
        <div className="card goal-form-card">
          <div className="card-header">
            <h3 className="card-title">
              {editingGoal ? 'Edit Goal' : 'Create New Goal'}
            </h3>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                setEditingGoal(null);
                setFormData({
                  title: '',
                  description: '',
                  deadline: '',
                  priority: 'medium',
                  status: 'active',
                  category: 'academic'
                });
              }}
            >
              ✕ Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="goal-form">
            <div className="form-group">
              <label className="form-label">Goal Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., Complete Calculus Course"
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
                placeholder="Describe your goal in detail..."
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Deadline *</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  {statuses.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <span>{editingGoal ? '💾' : '➕'}</span>
                {editingGoal ? 'Update Goal' : 'Create Goal'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goals List */}
      <div className="goals-list">
        {goals.length === 0 ? (
          <div className="card empty-state-card">
            <div className="empty-state">
              <h3>🎯 No Goals Yet</h3>
              <p>Create your first study goal to get started!</p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <span>➕</span>
                Create Your First Goal
              </button>
            </div>
          </div>
        ) : (
          <div className="goals-grid">
            {goals.map(goal => {
              const categoryInfo = getCategoryInfo(goal.category);
              const priorityInfo = getPriorityInfo(goal.priority);
              const statusInfo = getStatusInfo(goal.status);
              const daysUntilDeadline = getDaysUntilDeadline(goal.deadline);
              const overdue = isOverdue(goal.deadline);

              return (
                <div key={goal.id} className={`goal-card ${goal.status} ${overdue ? 'overdue' : ''}`}>
                  <div className="goal-card-header">
                    <div className="goal-category" style={{ backgroundColor: categoryInfo.color }}>
                      {categoryInfo.label}
                    </div>
                    <div className="goal-actions">
                      <button 
                        className="btn-icon"
                        onClick={() => handleEdit(goal)}
                        title="Edit Goal"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon btn-danger"
                        onClick={() => handleDelete(goal.id)}
                        title="Delete Goal"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="goal-content">
                    <h3 className="goal-title">{goal.title}</h3>
                    {goal.description && (
                      <p className="goal-description">{goal.description}</p>
                    )}
                  </div>

                  <div className="goal-meta">
                    <div className="goal-priority">
                      <span className="priority-label">Priority:</span>
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: priorityInfo.color }}
                      >
                        {priorityInfo.label}
                      </span>
                    </div>
                    
                    <div className="goal-deadline">
                      <span className="deadline-label">Deadline:</span>
                      <span className={`deadline-date ${overdue ? 'overdue' : ''}`}>
                        {new Date(goal.deadline).toLocaleDateString()}
                        {overdue && <span className="overdue-indicator"> (Overdue)</span>}
                        {!overdue && daysUntilDeadline <= 7 && (
                          <span className="urgent-indicator"> ({daysUntilDeadline} days left)</span>
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="goal-status">
                    <label className="status-label">Status:</label>
                    <select
                      value={goal.status}
                      onChange={(e) => handleStatusChange(goal.id, e.target.value)}
                      className="status-select"
                      style={{ borderColor: statusInfo.color }}
                    >
                      {statuses.map(status => (
                        <option key={status.value} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="goal-timeline">
                    <small>
                      Created: {new Date(goal.createdAt).toLocaleDateString()}
                      {goal.updatedAt !== goal.createdAt && (
                        <span> • Updated: {new Date(goal.updatedAt).toLocaleDateString()}</span>
                      )}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGoal;
