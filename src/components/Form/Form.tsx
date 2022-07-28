import React from 'react'
import { Todo } from '../../types/types'
import styles from './Form.module.scss'

type Props = {
  text: string,
  setText: React.Dispatch<React.SetStateAction<string>>
  addTodo: (todo: Todo) => void
}

const Form: React.FC<Props> = ({ text, setText, addTodo }) => {
  return (
    <form className={styles.form}>
      <input
        type="text"
        name="input"
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        placeholder="What do you have planned?" />
      <button
        onClick={(e) => {
          e.preventDefault()
          addTodo({
            id: Math.random(),
            text,
            done: false
          })
          setText('')
        }}
        className={styles.button}>Add task</button>
    </form>
  )
}

export default Form