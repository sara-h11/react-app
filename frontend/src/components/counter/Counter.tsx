import { Badge, Button } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Header from "../Header";
import {increment , decrement , reset, counterValue} from "./counterSlice"

function Counter() {
    const dispatch = useDispatch();
    const countValue = useSelector(counterValue)
    return ( 
        <div>
          <Header title='Counter' content="counter" />
            <Button  type="primary" danger onClick={() => dispatch(decrement())}>➖</Button>
            <Badge count={countValue} style={{ backgroundColor: '#52c41a' }}/>
            <Button  type="primary" onClick={() => dispatch(increment())}>➕</Button>
            <Button  danger className="m-2" onClick={() => dispatch(reset())}>reset counter</Button>
        </div>
     );
}
 
export default Counter;