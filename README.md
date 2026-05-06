# Nested Form Builder
Submitted by: Saurav Singh

Institution: National Institute of Technology (NIT), Delhi

Project Role: Frontend Developer (Internship Assignment - Task 5)

A robust React application designed to handle complex, hierarchical form structures. This tool allows users to build forms with "infinite" nesting capabilities, specifically enabling sub-questions to be triggered by conditional logic (True/False answers).

https://github.com/user-attachments/assets/7561c391-85ed-4e56-aefa-1d1d221cd2ea


# Key Features
Recursive Question Engine: Supports parent questions that can branch into sub-questions, and sub-sub-questions, without depth limitations.

Intelligent Numbering: Implements a hierarchical labeling system (e.g., Q1, Q1.1, Q1.1.1, Q2) that automatically recalculates during additions, deletions, or reordering.

Drag-and-Drop UX: Integrated @hello-pangea/dnd to allow users to intuitively reorder top-level questions.

State Persistence: Utilizes LocalStorage to ensure the form configuration is preserved even after a page refresh.

Finalized Review Mode: A "Submit" feature that toggles the builder into a clean, read-only view for data verification.

# Technical Stack
Frontend Framework: React.js

State Management: Custom Hook (useQuestions.js) with an immutable tree-traversal pattern.

Drag and Drop: @hello-pangea/dnd

Styling: Modular CSS for component-level isolation.

# Project Structure
```Plaintext
src/
 ├── components/
 │    ├── Question.jsx       # The core recursive engine
 │    ├── Question.css       # Styles for hierarchical indentation
 │    ├── SubmitView.jsx     # Read-only review component
 │    └── SubmitView.css     # Finalized form styling
 ├── useQuestions.js         # Business logic & state tree management
 ├── utils.js                # Helpers (Tree traversal, UID, formatting)
 ├── App.js                  # Main entry and DnD context
 └── index.js                # React DOM rendering
```
# Logic Implementation Details
Recursive Updates
Since the form is structured as a tree, all updates (text changes, type toggles, or deletions) are handled via recursive functions in utils.js or useQuestions.js. This ensures that even a question nested five levels deep can be updated immutably without affecting the rest of the tree.

Conditional Nesting
The "True/False" question type acts as a gateway. When a user selects "True," the component dynamically renders an additional branch of the tree, allowing for complex decision-pathway forms.

# Getting Started
Install Dependencies:

```Bash
npm install
```
Launch the Application:

```Bash
npm start
```
View in Browser:
The app will automatically open at http://localhost:3000.

This project was developed as part of the Infollion Internship Assessment.
