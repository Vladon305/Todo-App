import React, { useEffect, useState } from 'react'
import styles from './App.module.scss'
import Form from './components/Form/Form'
import Todos from './components/todos/Todos'
import { useTypedSelector } from './hooks/useTypedSelector'
import { useActions } from './hooks/useActions'
import { localStorageUtil } from './utils/localStorageUtil'

const App: React.FC = () => {

  const { todos, doneTodos, doingTodos } = useTypedSelector((state) => state.todos)
  const { setTodos, addTodo, editTodo, deleteTodo, setDone, setDoing, setDoneTodos, setDoingTodos } = useActions()
  const [text, setText] = useState('')
  const [choseTodo, setChoseTodo] = useState<'all' | 'done' | 'doing'>('all')

  const onEditTodo = (id: number, text: string, setMode: React.Dispatch<React.SetStateAction<boolean>>) => {
    editTodo({ id, text })
    setMode(false)
  }

  const onDeleteTodo = (id: number) => {
    deleteTodo(id)
  }

  useEffect(() => {
    const todosFromLocal = localStorageUtil.getTodos()
    setTodos(todosFromLocal || [])
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    localStorageUtil.addTodo(todos)
    setDoneTodos(todos.filter((todo) => todo.done === true))
    setDoingTodos(todos.filter((todo) => todo.done === false))
    // eslint-disable-next-line
  }, [todos])

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.h1}>Todos</h1>
        <Form text={text} setText={setText} addTodo={addTodo} />
      </header>
      <main className={styles.main}>
        <section className={styles.parentTodos}>
          <div className={styles.h2Container}>
            <h2 className={styles.h2}
              onClick={() => setChoseTodo('all')}
            >Tasks</h2>
            <h2 className={styles.h2}
              onClick={() => setChoseTodo('done')}
            >Done tasks</h2>
            <h2 className={styles.h2}
              onClick={() => setChoseTodo('doing')}
            >Doing tasks</h2>
          </div>
          <div>
            {choseTodo === 'all' && todos.map((todo) => <Todos todo={todo} key={todo.id} editTodo={onEditTodo}
              deleteTodo={onDeleteTodo} setDone={setDone} setDoing={setDoing} />)}
            {choseTodo === 'done' && doneTodos.map((todo) => <Todos todo={todo} key={todo.id} editTodo={onEditTodo}
              deleteTodo={onDeleteTodo} setDone={setDone} setDoing={setDoing} />)}
            {choseTodo === 'doing' && doingTodos.map((todo) => <Todos todo={todo} key={todo.id} editTodo={onEditTodo}
              deleteTodo={onDeleteTodo} setDone={setDone} setDoing={setDoing} />)}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
