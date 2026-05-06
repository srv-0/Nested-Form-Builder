import React from 'react'
import './Question.css'
import { labelFor } from '../utils'

const DEPTH_COLORS = ['#5a5aff', '#a855f7', '#06b6d4', '#22c55e']

function Question({ q, label, depth = 0, dragHandle, onText, onType, onTf, onDelete, onAddKid }) {
  const color = DEPTH_COLORS[depth % DEPTH_COLORS.length]
  const showTf = q.type === 'tf'
  const showKids = q.type === 'tf' && q.tfAnswer === true

  return (
    <div className="q-card" style={{ '--color': color }}>
      <div className="q-top">
        {depth === 0 && (
          <span className="q-drag" {...dragHandle} title="Drag to reorder">
            ⠿
          </span>
        )}
        <span className="q-label">{label}</span>
        <div style={{ flex: 1 }} />
        <button className="q-del" onClick={() => onDelete(q.id)} title="Delete">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
          </svg>
        </button>
      </div>

      <div className="q-body">
        <div className="q-row">
          <input
            className="q-input"
            type="text"
            placeholder={`Type question ${label}...`}
            value={q.text}
            onChange={e => onText(q.id, e.target.value)}
          />
          <select
            className="q-select"
            value={q.type}
            onChange={e => onType(q.id, e.target.value)}
          >
            <option value="short">Short Answer</option>
            <option value="tf">True / False</option>
          </select>
        </div>

        {showTf && (
          <div className="q-tf">
            <span className="q-tf-label">Answer</span>
            <button
              className={`q-tf-btn ${q.tfAnswer === true ? 'is-true' : ''}`}
              onClick={() => onTf(q.id, true)}
            >
              True
            </button>
            <button
              className={`q-tf-btn ${q.tfAnswer === false ? 'is-false' : ''}`}
              onClick={() => onTf(q.id, false)}
            >
              False
            </button>
          </div>
        )}

        {showKids && (
          <div className="q-kids">
            {q.kids.map((kid, i) => (
              <Question
                key={kid.id}
                q={kid}
                label={labelFor(label, i)}
                depth={depth + 1}
                onText={onText}
                onType={onType}
                onTf={onTf}
                onDelete={onDelete}
                onAddKid={onAddKid}
              />
            ))}
            <button className="q-add-kid" onClick={() => onAddKid(q.id)}>
              + add sub-question under {label}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Question
