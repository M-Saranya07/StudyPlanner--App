import React, { useState } from 'react';
import './TaskManager.css';

const TaskManager = ({ tasks, updateTasks }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'study',
    dueDate: '',
    estimatedTime: '',
    completed: false
  });

  const categories = [
    { value: 'study', label: '📚 Study', color: '#667eea' },
    { value: 'assignment', label: '📝 Assignment', color: '#dc3545' },
    { value: 'exam', label: '📋 Exam Prep', color: '#ffc107' },
    { value: 'project', label: '💼 Project', color: '#28a745' },
    { value: 'research', label: '🔬 Research', color: '#17a2b8' },
    { value: 'reading', label: '📖 Reading', color: '#6f42c1' },
    { value: 'other', label: '📋 Other', color: '#6c757d' }
  ];

  const priorities = [
    { value: 'high', label: 'High Priority', color: '#dc3545' },
    { value: 'medium', label: 'Medium Priority', color: '#ffc107' },
    { value: 'low', label: 'Low Priority', color: '#28a745' }
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
    
    if (editingTask) {
      // Update existing task
      const updatedTasks = tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...formData, updatedAt: new Date().toISOString() }
          : task
      );
      updateTasks(updatedTasks);
    } else {
      // Add new task
      const newTask = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      updateTasks([...tasks, newTask]);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: 'study',
      dueDate: '',
      estimatedTime: '',
      completed: false
    });
    setShowForm(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
      estimatedTime: task.estimatedTime,
      completed: task.completed
    });
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      updateTasks(updatedTasks);
    }
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
        : task
    );
    updateTasks(updatedTasks);
  };

  const getCategoryInfo = (categoryValue) => {
    return categories.find(cat => cat.value === categoryValue) || categories[0];
  };

  const getPriorityInfo = (priorityValue) => {
    return priorities.find(pri => pri.value === priorityValue) || priorities[1];
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    const diffTime = dueDateObj - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter and sort tasks
  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'pending':
        return !task.completed;
      case 'overdue':
        return !task.completed && isOverdue(task.dueDate);
      case 'high':
        return task.priority === 'high';
      default:
        return true;
    }
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'createdAt':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;
  const overdueCount = tasks.filter(task => !task.completed && isOverdue(task.dueDate)).length;

  return (
    <div className="task-manager">
      <div className="tasks-header">
        <h2>📝 Academic Tasks</h2>
        <p>Manage your study tasks and assignments</p>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          <span>➕</span>
          Add New Task
        </button>
      </div>

      {/* Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{totalCount}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{completedCount}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{totalCount - completedCount}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{overdueCount}</div>
          <div className="stat-label">Overdue</div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="card filters-card">
        <div className="filters-row">
          <div className="filter-group">
            <label className="filter-label">Filter:</label>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label className="filter-label">Sort by:</label>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="createdAt">Date Created</option>
              <option value="title">Title</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>
        </div>
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="card task-form-card">
          <div className="card-header">
            <h3 className="card-title">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h3>
            <button 
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                setEditingTask(null);
                setFormData({
                  title: '',
                  description: '',
                  priority: 'medium',
                  category: 'study',
                  dueDate: '',
                  estimatedTime: '',
                  completed: false
                });
              }}
            >
              ✕ Cancel
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-group">
              <label className="form-label">Task Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="e.g., Complete Math Assignment"
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
                placeholder="Describe the task details..."
                rows="3"
              />
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
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Time</label>
                <input
                  type="text"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="e.g., 2 hours, 30 minutes"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleInputChange}
                />
                <span className="checkbox-text">Mark as completed</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                <span>{editingTask ? '💾' : '➕'}</span>
                {editingTask ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tasks List */}
      <div className="tasks-list">
        {sortedTasks.length === 0 ? (
          <div className="card empty-state-card">
            <div className="empty-state">
              <h3>📝 No Tasks Found</h3>
              <p>
                {filter === 'all' 
                  ? "No tasks yet. Add your first academic task!" 
                  : `No tasks match the "${filter}" filter.`
                }
              </p>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <span>➕</span>
                Add Your First Task
              </button>
            </div>
          </div>
        ) : (
          <div className="tasks-grid">
            {sortedTasks.map(task => {
              const categoryInfo = getCategoryInfo(task.category);
              const priorityInfo = getPriorityInfo(task.priority);
              const daysUntilDue = getDaysUntilDue(task.dueDate);
              const overdue = isOverdue(task.dueDate);

              return (
                <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}>
                  <div className="task-card-header">
                    <div className="task-category" style={{ backgroundColor: categoryInfo.color }}>
                      {categoryInfo.label}
                    </div>
                    <div className="task-actions">
                      <button 
                        className="btn-icon"
                        onClick={() => handleEdit(task)}
                        title="Edit Task"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon btn-danger"
                        onClick={() => handleDelete(task.id)}
                        title="Delete Task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="task-content">
                    <div className="task-title-row">
                      <h3 className="task-title">{task.title}</h3>
                      <button 
                        className={`complete-btn ${task.completed ? 'completed' : ''}`}
                        onClick={() => handleToggleComplete(task.id)}
                        title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        {task.completed ? '✅' : '⭕'}
                      </button>
                    </div>
                    
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}
                  </div>

                  <div className="task-meta">
                    <div className="task-priority">
                      <span className="priority-label">Priority:</span>
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: priorityInfo.color }}
                      >
                        {priorityInfo.label}
                      </span>
                    </div>
                    
                    {task.dueDate && (
                      <div className="task-due-date">
                        <span className="due-label">Due:</span>
                        <span className={`due-date ${overdue ? 'overdue' : ''}`}>
                          {new Date(task.dueDate).toLocaleDateString()}
                          {overdue && <span className="overdue-indicator"> (Overdue)</span>}
                          {!overdue && daysUntilDue <= 3 && daysUntilDue >= 0 && (
                            <span className="urgent-indicator"> ({daysUntilDue} days left)</span>
                          )}
                        </span>
                      </div>
                    )}

                    {task.estimatedTime && (
                      <div className="task-time">
                        <span className="time-label">Est. Time:</span>
                        <span className="time-value">{task.estimatedTime}</span>
                      </div>
                    )}
                  </div>

                  <div className="task-timeline">
                    <small>
                      Created: {new Date(task.createdAt).toLocaleDateString()}
                      {task.updatedAt !== task.createdAt && (
                        <span> • Updated: {new Date(task.updatedAt).toLocaleDateString()}</span>
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

export default TaskManager;
