import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    filer: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (tasks: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const getTasksJSXElement = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeTaskStatus}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        )
    })

    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const setAllFilter = () => props.changeFilter("all");
    const setActiveFilter = () => props.changeFilter("active");
    const setCompletedFilter = () => props.changeFilter("completed");

    const allBtnClass = props.filer === "all" ? "active-filter" : ""
    const activeBtnClass = props.filer === "active" ? "active-filter" : ""
    const completedBtnClass = props.filer === "completed" ? "active-filter" : ""
    const errorMsg = error
        ? <div style={{color: "red"}}>Title is required!</div>
        : null

    //JSX
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? "error" : ""}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}/>
            <button onClick={addTask}>+</button>
            {errorMsg}
        </div>
        <ul>
            {getTasksJSXElement}
        </ul>
        <div>
            <button  className={allBtnClass} onClick={setAllFilter}>All</button>
            <button className={activeBtnClass} onClick={setActiveFilter}>Active</button>
            <button className={completedBtnClass} onClick={setCompletedFilter}>Completed</button>
        </div>
    </div>
}
