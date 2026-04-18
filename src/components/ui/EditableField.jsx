import { useState, useRef, useEffect } from 'react'

export default function EditableField({
  value,
  onChange,
  style = {},
  multiline = false,
  placeholder = 'اضغط للتعديل',
  className = '',
}) {
  const [editing, setEditing] = useState(false)
  const [local, setLocal] = useState(value)
  const ref = useRef()

  useEffect(() => setLocal(value), [value])
  useEffect(() => { if (editing) ref.current?.focus() }, [editing])

  const done = () => {
    setEditing(false)
    if (local !== value) onChange(local)
  }

  const sharedStyle = {
    background: '#1a1a1a',
    color: '#fff',
    border: '1px solid #FE2C55',
    borderRadius: 6,
    padding: '4px 8px',
    fontSize: 13,
    width: '100%',
    fontFamily: 'inherit',
    ...style,
  }

  if (editing) {
    if (multiline) return (
      <textarea
        ref={ref}
        value={local}
        onChange={e => setLocal(e.target.value)}
        onBlur={done}
        rows={3}
        style={{ ...sharedStyle, resize: 'none' }}
      />
    )
    return (
      <input
        ref={ref}
        value={local}
        onChange={e => setLocal(e.target.value)}
        onBlur={done}
        onKeyDown={e => e.key === 'Enter' && done()}
        style={sharedStyle}
      />
    )
  }

  return (
    <span
      className={`editable ${className}`}
      onClick={() => setEditing(true)}
      style={{ color: '#fff', ...style }}
    >
      {value || <span style={{ color: '#555' }}>{placeholder}</span>}
    </span>
  )
}
