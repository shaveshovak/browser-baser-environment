import { useEffect, useState, useRef  } from "react";
import MDEditor  from "@uiw/react-md-editor";
import './text-editor.css';

const TextEditor: React.FC = () => {

    const ref = useRef<HTMLDivElement | null>(null)
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState('# Header');

    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if(ref.current && e.target && ref.current.contains(e.target as Node)) {
                // console.log('Element is inside the editor');
                return;
            }
            // console.log('Element is not inside the editor');
            setEditing(false);
        }
        document.addEventListener('click', listener, { capture: true });

        return () => {
            document.removeEventListener('click', listener, { capture: true });
        }
    }, []);

    if(editing) {
        return (
            <div className='text-editor' ref={ref}>
                <MDEditor
                    value={value}
                    onChange={(v) => setValue(v || '')}
                />
            </div> 
        )
    }
    return (
        <div 
            className='text-editor' 
            onClick={() => setEditing(true)}
        >
            <div className='card-content'>
                <MDEditor.Markdown source={value} />
            </div>
        </div>
    )
}

export default TextEditor;