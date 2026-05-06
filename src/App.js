import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useQuestions } from './useQuestions'
import Question from './components/Question'
import SubmitView from './components/SubmitView'
import './App.css'

export default function App() {
  const [submitted, setSubmitted] = useState(false)
  const {
    questions,
    addQuestion,
    addChild,
    setText,
    setType,
    setTfAnswer,
    deleteQuestion,
    reorder,
    clearAll,
  } = useQuestions()

  function handleDragEnd(result) {
    if (!result.destination) return
    reorder(result.source.index, result.destination.index)
  }

  function handleClear() {
    clearAll()
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <div className="app">
        <SubmitView
          questions={questions}
          onBack={() => setSubmitted(false)}
          onClear={handleClear}
        />
      </div>
    )
  }

  return (
    <div className="app">
      <div className="header">
        <div className="header-left">
          <div className="logo">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M8 10h8M8 14h5" />
            </svg>
          </div>
          <span className="header-title">Form Builder</span>
          {questions.length > 0 && (
            <span className="header-count">{questions.length}</span>
          )}
        </div>
        <div className="header-right">
          {questions.length > 0 && (
            <button className="btn btn-ghost" onClick={handleClear}>
              clear
            </button>
          )}
          <button
            className="btn btn-primary"
            onClick={() => setSubmitted(true)}
            disabled={questions.length === 0}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="body">
        {questions.length === 0 ? (
          <div className="empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M12 8v8M8 12h8" />
            </svg>
            <p>No questions yet</p>
            <span>Click below to add one</span>
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="root">
              {(provided, snapshot) => (
                <div
                  className={`questions-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {questions.map((q, i) => (
                    <Draggable key={q.id} draggableId={q.id} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className={snapshot.isDragging ? 'is-dragging' : ''}
                        >
                          <Question
                            q={q}
                            label={`Q${i + 1}`}
                            depth={0}
                            dragHandle={provided.dragHandleProps}
                            onText={setText}
                            onType={setType}
                            onTf={setTfAnswer}
                            onDelete={deleteQuestion}
                            onAddKid={addChild}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        <button className="add-btn" onClick={addQuestion}>
          + Add question
        </button>
      </div>
    </div>
  )
}
