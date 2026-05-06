import { useState, useEffect } from 'react'
import { makeQuestion, findNode, removeNode, uid } from './utils'

const SAVE_KEY = 'fb_questions_v2'

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function clone(x) {
  return JSON.parse(JSON.stringify(x))
}

export function useQuestions() {
  const [questions, setQuestions] = useState(load)

  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify(questions))
  }, [questions])

  function patch(fn) {
    setQuestions(prev => {
      const next = clone(prev)
      fn(next)
      return next
    })
  }

  function addQuestion() {
    setQuestions(prev => [...prev, makeQuestion()])
  }

  function addChild(parentId) {
    patch(draft => {
      const parent = findNode(draft, parentId)
      if (parent) parent.kids.push(makeQuestion())
    })
  }

  function setText(id, val) {
    patch(draft => {
      const q = findNode(draft, id)
      if (q) q.text = val
    })
  }

  function setType(id, val) {
    patch(draft => {
      const q = findNode(draft, id)
      if (!q) return
      q.type = val
      if (val !== 'tf') {
        q.tfAnswer = null
        q.kids = []
      }
    })
  }

  function setTfAnswer(id, val) {
    patch(draft => {
      const q = findNode(draft, id)
      if (!q) return
      q.tfAnswer = q.tfAnswer === val ? null : val
      if (q.tfAnswer !== true) q.kids = []
    })
  }

  function deleteQuestion(id) {
    patch(draft => removeNode(draft, id))
  }

  function reorder(from, to) {
    setQuestions(prev => {
      const next = [...prev]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      return next
    })
  }

  function clearAll() {
    setQuestions([])
  }

  return {
    questions,
    addQuestion,
    addChild,
    setText,
    setType,
    setTfAnswer,
    deleteQuestion,
    reorder,
    clearAll,
  }
}
