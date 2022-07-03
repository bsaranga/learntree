import { useCallback } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";

export default function CustomNode(props: NodeProps) {

    const inputRef = useCallback((ref: HTMLInputElement) => {
        if (ref != null) {
            ref.focus();
        }
    }, []);

    const onChange = useCallback((evt: any) => {
        console.log(evt.target.value);
    }, []);

    return (
        <div>
            <Handle type="target" position={Position.Top} />
            <div>
                <label htmlFor="text">Text:</label>
                <input ref={inputRef} id="text" name="text" onChange={onChange} />
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}