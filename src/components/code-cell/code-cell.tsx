import { useEffect, useState } from 'react';
import bundler from '../../bundler';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import Resizable from '../resizable/resizable';
import './code-cell.css';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(input);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction='vertical'>
      <div className='main-container'>
        <Resizable direction='horizontal'>
          <CodeEditor 
            initialValue='const a = 1'
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  )
} 

export default CodeCell;