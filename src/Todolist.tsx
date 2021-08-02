import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>("")
    const getTasksJSXElement = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })
    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const setAllFilter = () => props.changeFilter("all");
    const setActiveFilter = () => props.changeFilter("active");
    const setCompletedFilter = () => props.changeFilter("completed");



    //JSX
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {getTasksJSXElement}
        </ul>
        <div>
            <button onClick={setAllFilter}>All</button>
            <button onClick={setActiveFilter}>Active</button>
            <button onClick={setCompletedFilter}>Completed</button>
        </div>
    </div>
}
