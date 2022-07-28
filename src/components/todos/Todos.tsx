import React, { useState } from 'react'
import { Todo } from '../../types/types'
import styles from './Todos.module.scss'

type Props = {
  todo: Todo
  editTodo: (id: number, text: string, setMode: React.Dispatch<React.SetStateAction<boolean>>) => void
  deleteTodo: (id: number, todo: Todo) => void
  setDone: (id: number) => void
  setDoing: (id: number) => void
}

const Todos: React.FC<Props> = ({ todo, editTodo, deleteTodo, setDone, setDoing }) => {
  const [mode, setMode] = useState(false)
  const [localText, setLocalText] = useState(todo?.text)

  return (
    <div className={styles.task} key={todo.id}>
      {todo.done
        ? <div className={styles.done} onClick={() => setDoing(todo.id)}>done</div>
        : <div className={styles.doing} onClick={() => setDone(todo.id)}>do</div>}
      {!mode
        ? <div
          className={styles.content}
          onClick={() => setMode(true)}
        >
          {todo.text}
        </div>
        : <input
          className={styles.activeContent}
          onChange={(e) => setLocalText(e.currentTarget.value)}
          value={localText}
          autoFocus={true}
        />}
      <div className={styles.actions}>
        <button
          className={styles.edit}
          onClick={() => editTodo(todo.id, localText, setMode)}
        >Edit</button>
        <button className={styles.delete}
          onClick={() => deleteTodo(todo.id, todo)}>Delete</button>
      </div>
    </div>
  )
}

export default Todos