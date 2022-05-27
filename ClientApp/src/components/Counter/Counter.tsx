import React, { useState } from "react";


const _Counter: React.FC<{}> = () => {

    const [count, setCount] = useState<number>(0);

    return (
        <div>
            <h1>Classic Counter</h1>
            <button className="btn btn-primary" onClick={() => {
                setCount(count + 1)
            }}>increment</button>
            <p>Current Count: {count}</p>
        </div>
    );

}

export default _Counter;