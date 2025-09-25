# 📚 Study Planner - Academic Task Manager

A comprehensive React-based study planner designed to help students organize their academic journey, track progress, and boost productivity through effective time management.

## 🌟 Features

### 📊 Dashboard
- **Overview Statistics**: Track total goals, completed tasks, upcoming sessions, and progress rates
- **Progress Visualization**: Visual progress bars for goals and tasks
- **Quick Actions**: Easy access to add new goals, tasks, and schedule sessions
- **Recent Activity**: View recent tasks and upcoming schedule at a glance

### 🎯 Study Goals
- **Goal Management**: Create, edit, and track academic objectives
- **Categories**: Organize goals by type (Academic, Exam Prep, Project, Research, etc.)
- **Priority Levels**: Set high, medium, or low priority for each goal
- **Deadline Tracking**: Visual indicators for overdue and urgent goals
- **Status Management**: Track goal progress (Active, Completed, Paused, Cancelled)

### 📝 Academic Tasks
- **Task Organization**: Manage assignments, study sessions, and academic work
- **Smart Filtering**: Filter by completion status, priority, or overdue items
- **Flexible Sorting**: Sort by date, priority, title, or creation date
- **Time Estimation**: Track estimated time for each task
- **Category System**: Organize tasks by subject and type

### 📅 Study Schedule
- **Multiple Views**: Week view, month view, and list view
- **Session Planning**: Schedule study sessions with time, duration, and location
- **Session Types**: Different types (Study, Lecture, Exam, Assignment, Group Study, etc.)
- **Visual Calendar**: Week grid showing all scheduled sessions
- **Reminder System**: Set reminders for important sessions

### 📈 Progress Tracker
- **Study Hours Tracking**: Monitor time spent studying
- **Mood Tracking**: Track your study mood and well-being
- **Progress Entries**: Detailed notes about study sessions
- **Insights**: Analytics on study habits and completion rates
- **Weekly Overview**: Summary of weekly progress and achievements

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd "Study Planner"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

### Build for Production
```bash
npm run build
```

## 💾 Data Persistence

The Study Planner automatically saves all your data locally using browser localStorage. This means:
- ✅ Your data persists between browser sessions
- ✅ No account required - completely offline
- ✅ Fast and responsive
- ⚠️ Data is tied to your browser - clear browser data will remove your progress

## 🎨 Design Features

- **Modern UI**: Clean, intuitive interface with beautiful gradients
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Visual Feedback**: Hover effects, transitions, and status indicators
- **Color Coding**: Different colors for priorities, categories, and statuses

## 📱 Mobile Support

The Study Planner is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Optimized navigation for small screens
- Collapsible sections and adaptive layouts
- Mobile-first design approach

## 🔧 Technical Details

### Built With
- **React 18**: Modern React with hooks
- **CSS3**: Custom styling with modern features
- **Webpack**: Module bundling and development server
- **Babel**: JavaScript transpilation
- **Local Storage**: Client-side data persistence

### Project Structure
```
Study Planner/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── StudyDashboard.js & .css
│   │   ├── StudyGoal.js & .css
│   │   ├── TaskManager.js & .css
│   │   ├── StudySchedule.js & .css
│   │   └── ProgressTracker.js & .css
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
├── webpack.config.js
└── README.md
```

## 🎯 Use Cases

### For Students
- **Exam Preparation**: Track study goals and schedule review sessions
- **Assignment Management**: Organize tasks by priority and due dates
- **Time Management**: Monitor study hours and productivity
- **Progress Tracking**: Visualize academic achievements over time

### For Academic Planning
- **Semester Planning**: Set long-term goals and break them into tasks
- **Subject Organization**: Categorize work by different subjects
- **Deadline Management**: Never miss important due dates
- **Study Habit Analysis**: Understand your most productive study patterns

## 🚀 Future Enhancements

- **Export/Import**: Backup and restore data functionality
- **Cloud Sync**: Optional cloud storage integration
- **Notifications**: Browser notifications for reminders
- **Analytics**: Advanced progress analytics and insights
- **Collaboration**: Share goals and schedules with study groups
- **Themes**: Dark mode and customizable themes

## 📄 License

This project is licensed under the MIT License - see the package.json file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for any errors
2. Ensure you're using a modern browser with localStorage support
3. Try refreshing the page or clearing browser cache

---

**Happy Studying! 📚✨**

*Built with ❤️ for students who want to excel academically*
