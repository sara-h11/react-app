import { Button } from "antd";
import { useState } from "react";
import Header from "./Header";

function Counter() {
    const [number, setNumber] = useState<number>(0)
    return ( 
        <div>
          <Header title='Counter' content="counter" />
            <Button onClick={() => decreaseNumber()} type="primary">➖</Button>
            <span> {number} </span>
            <Button onClick={increaseNumber} type="primary">➕</Button>
            <Button onClick={() => setNumber(0)} danger className="m-2">reset Number</Button>
        </div>
     );

     function increaseNumber(){
        setNumber(number + 1);
     };

     function decreaseNumber(){
        setNumber(number -1);
     }
}
 
export default Counter;