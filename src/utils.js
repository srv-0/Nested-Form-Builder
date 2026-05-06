export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

export function makeQuestion() {
  return { id: uid(), text: '', type: 'short', tfAnswer: null, kids: [] }
}

// walks the tree and returns the node with matching id
export function findNode(list, id) {
  for (const q of list) {
    if (q.id === id) return q
    const hit = findNode(q.kids, id)
    if (hit) return hit
  }
  return null
}

export function removeNode(list, id) {
  const i = list.findIndex(q => q.id === id)
  if (i !== -1) { list.splice(i, 1); return true }
  for (const q of list) {
    if (removeNode(q.kids, id)) return true
  }
  return false
}

export function labelFor(parentLabel, idx) {
  return parentLabel ? `${parentLabel}.${idx + 1}` : `Q${idx + 1}`
}

export function countNodes(list) {
  return list.reduce((acc, q) => acc + 1 + countNodes(q.kids), 0)
}
