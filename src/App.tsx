import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "GraphQl", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: number) => {
        const newTasksArray = tasks.filter(t => t.id !== taskID)
        setTasks(newTasksArray) // new array
        // useState имеет под капотом функцию обновления для перересовки, при изменении
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
                title="What to learn"
                tasks={tasksForTodo}
                removeTask={removeTask}
                changeFilter={changeFilter}


            />
        </div>
    );
}

export default App;
