import { TaskItemProps } from "./TaskItemProps";
import {memo, useContext} from 'react';
import { Button, Checkbox } from "antd";
import { AppContext } from "../../App";
import { useDispatch } from "react-redux";
import { removeTask, toggleTask } from "./task.slice";

interface TaskIProps {
    tList : TaskItemProps,
}
const TaskItem =({tList} : TaskIProps) => {
    const dispatch = useDispatch();
    const [context] = useContext(AppContext);
    return(
        <>
            <li className="m-2">
            <Checkbox checked={tList.done} onChange={() =>dispatch(toggleTask(tList))}/>
                <span onClick={() => dispatch(toggleTask(tList))} style={{color : context.color}}> {tList.taskName} </span>
                <Button onClick={() => dispatch(removeTask(tList))} type="primary" danger size="small" >✖</Button>
            </li>
        </>
        
    )
};

export default memo(TaskItem)
