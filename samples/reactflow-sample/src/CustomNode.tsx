import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

export default function CustomNode() {
    const onChange = useCallback((evt: any) => {
        console.log(evt.target.value);
    }, []);

    return (
        <>
            <Handle type="target" position={Position.Top} />
            <div>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} />
            </div>
            <Handle type="source" position={Position.Bottom} />
        </>
    );
}