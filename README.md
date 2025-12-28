# Task Tracker App

A modern, responsive task management application built with React, TypeScript, and Tailwind CSS featuring Apple-style animations and glassmorphism design.

## Features

### Core Functionality
- **Add Tasks** - Create new tasks with title and due date
- **Edit Tasks** - Modify existing tasks inline
- **Delete Tasks** - Remove tasks with confirmation dialog
- **Toggle Status** - Mark tasks as pending or completed
- **Search & Filter** - Find tasks by title and filter by status
- **Sort Options** - Sort by date or title (ascending/descending)

### UI/UX Enhancements
- **Apple-Style Split Screen** - Smooth page division when adding/editing tasks
- **Glassmorphism Effects** - Watery blur overlays instead of dark backgrounds
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Visual Status Indicators** - Color-coded task states and due date warnings

## How It Works

### Task Management
1. **Adding Tasks**: Click the "Add Task" button to open the right-side panel
2. **Editing**: Click the edit icon on any task to modify it in the side panel
3. **Completion**: Click the circular checkbox to toggle task status
4. **Deletion**: Click the delete icon and confirm in the glassmorphism popup

### Filtering & Search
- **Search Bar**: Located at the top for quick task lookup by title
- **Status Filter**: Filter tasks by All, Pending, or Completed
- **Sort Controls**: Sort by due date or title with ascending/descending buttons

### Visual Feedback
- **Overdue Tasks**: Red background for tasks past due date
- **Due Today**: Yellow background for tasks due today
- **Completed Tasks**: Green background with strikethrough text
- **Task Counters**: Live count of pending and completed tasks

## Technical Implementation

### Architecture
- **React 19** with TypeScript for type safety
- **Tailwind CSS** for utility-first styling
- **Local Storage** for data persistence
- **Custom Hooks** for debounced search functionality

### Key Features Implemented

#### 1. Advanced Sorting
- Bidirectional sorting with visual up/down arrows
- Automatic reset to ascending when changing sort field
- Real-time sort direction indicators

#### 2. Responsive Filter Layout
- Search bar prominently placed at top
- Compact font sizes for cleaner appearance
- Two-column filter grid on larger screens

Built with React js using modern web technologies and smooth animation design principles.