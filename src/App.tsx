import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = "all" | "completed" | "active"

function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 1, title: "JS", isDone: true},
        {id: 1, title: "ReactJS", isDone: false},
        {id: 1, title: "Redux", isDone: false}
    ]);
    let [filter, setFilter] = useState("active");

    function removeTask(id: number) {
        let filteredTasks = tasks.filter( t => t.id !== id)
        setTasks(filteredTasks)
        }

        function changeFilter(value: FilterValuesType) {
        setFilter(value);
        }

        let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
 // 2 урок 1:09:40