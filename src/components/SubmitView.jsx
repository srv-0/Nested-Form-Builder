import React from 'react'
import './SubmitView.css'
import { countNodes, labelFor } from '../utils'

function TreeItem({ q, label, depth }) {
  const pad = depth * 20

  return (
    <>
      <div className="sv-row" style={{ paddingLeft: pad + 16 }}>
        <span className="sv-num">{label}</span>
        <span className="sv-text">{q.text || <em className="sv-empty">—</em>}</span>
        <span className="sv-type">{q.type === 'tf' ? 'T/F' : 'Short'}</span>
        {q.type === 'tf' && q.tfAnswer !== null && (
          <span className={`sv-ans ${q.tfAnswer ? 'sv-true' : 'sv-false'}`}>
            {q.tfAnswer ? 'True' : 'False'}
          </span>
        )}
      </div>
      {q.kids?.map((kid, i) => (
        <TreeItem key={kid.id} q={kid} label={labelFor(label, i)} depth={depth + 1} />
      ))}
    </>
  )
}

function SubmitView({ questions, onBack, onClear }) {
  const total = countNodes(questions)

  return (
    <div className="sv-wrap">
      <div className="sv-header">
        <div className="sv-check">✓</div>
        <div>
          <h2 className="sv-title">Submitted</h2>
          <p className="sv-meta">{questions.length} parent · {total} total</p>
        </div>
        <div style={{ flex: 1 }} />
        <button className="sv-btn" onClick={onBack}>← Back</button>
        <button className="sv-btn sv-btn-red" onClick={onClear}>Clear</button>
      </div>

      <div className="sv-tree">
        {questions.length === 0 && <p className="sv-empty-msg">Nothing submitted.</p>}
        {questions.map((q, i) => (
          <TreeItem key={q.id} q={q} label={`Q${i + 1}`} depth={0} />
        ))}
      </div>
    </div>
  )
}

export default SubmitView
