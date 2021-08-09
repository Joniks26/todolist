import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    console.log(typeof v1())


    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "GraphQl", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: string) => {
        const newTasksArray = tasks.filter(t => t.id !== taskID)
        setTasks(newTasksArray) // new array
        // useState имеет под капотом функцию обновления для перересовки, при изменении
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,   // title: title,
            isDone: false
        }
      setTasks([newTask, ...tasks])

    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        const updatedTasks = tasks.map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks(updatedTasks)
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForTodo = tasks
    if (filter === "active") {
        tasksForTodo = tasks.filter(t => !t.isDone) // => t.isDone === false
    }
    if (filter === "completed") {
        tasksForTodo = tasks.filter(t => t.isDone) // => t.isDone === true
    }

    return (
        <div className="App">
            <Todolist
                filer={filter}
                title="What to learn"
                tasks={tasksForTodo}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus = {changeTaskStatus}
            />
        </div>
    );
}

export default App;
