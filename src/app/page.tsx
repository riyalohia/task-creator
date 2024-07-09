"use client"
import { useState } from "react";
import { tasks as initialTasks } from "./mocks";

export default function Home() {
  const [query, setQuery] = useState('')
  const [tasks, setTasks] = useState(initialTasks)
  const [showAddTaskDialog, setAddTaskDialog] = useState(false)
  const [newTask, setNewTask] = useState({})

  const onSearchChange = (e) => {
    const query = e.target.value
    setQuery(query)
  }

  const onSearch = () => {
    const updatedTasks = initialTasks.filter(task => task.category.toLowerCase().includes(query.toLowerCase()))
    setTasks(updatedTasks)
  }

  const oncancel = () => {
    setQuery('')
    setTasks(initialTasks)
  }

  const addTask = () => {
    setAddTaskDialog(true)
  }

  const createNewTask = (value: string, type: string) => {
    const updatedNewTask = { ...newTask, [type]: value }
    setNewTask(updatedNewTask)
  }

  const addNewtask = () => {
    const id = tasks.length + 1
    const updatedTasks = [...tasks]
    updatedTasks.push({
      ...newTask,
      id,
      status: 'pending'
    })
    setTasks(updatedTasks)
  }

  const changeStatus = (id: number) => {
    const updatedTask = tasks.filter(task => task.id === id)
    const updatedTaskStatus = {
      ...updatedTask,
      status: 'completed'
    }
    const tasksListCopy = [...tasks]
    tasksListCopy[id-1] = updatedTaskStatus
    setTasks(tasksListCopy)
  }


  return (
    <main className="">
      <div className="flex gap-3">
        <button onClick={addTask}>Add task</button>
        <input
          value={query}
          onChange={onSearchChange}
        />
        <button onClick={onSearch}>Search</button>
        <button onClick={oncancel}>Cancel</button>
      </div>
      <div>
        {tasks.map(task => (
          <div key={task.id} className="flex gap-5">
            <div>
              <p>{task.title}</p>
              <p>{task.subtitle}</p>
            </div>
            <button onClick={() => changeStatus(task.id)}>Done</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
      {showAddTaskDialog && (
        <div>
          Add new task
          <div className="flex gap-2">
            <p>Title</p>
            <input onChange={(e) => createNewTask(e.target.value, 'title')} />
          </div>
          <div className="flex gap-2">
            <p>Subtitle</p>
            <input onChange={(e) => createNewTask(e.target.value, 'subtitle')} />
          </div>
          <div className="flex gap-2">
            <p>Category</p>
            <input onChange={(e) => createNewTask(e.target.value, 'category')} />
          </div>
          <div className="flex gap-2">
            <button onClick={addNewtask}>Add</button>
            <button>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
}
