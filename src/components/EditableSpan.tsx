import React, {ChangeEvent, useState} from "react";

type PropsType = {
    title: string
    callBack: (title: string) => void
}


export const EditableSpan = (props: PropsType) => {
    let [title, setTitle] = useState(props.title)
    let [edit, setEdit] = useState(false)
    const activateEditMode = () => {
        setEdit(true)
    }
    const deactivateEditMode = () => {
        setEdit(false)
        props.callBack(title)
    }
   const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
        return (
        edit
            ? <input onBlur={deactivateEditMode} autoFocus={true} value={title} onChange={onChangeHandler}/>
            : <span  onDoubleClick={activateEditMode}>{props.title}</span>
    )
}