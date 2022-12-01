import { useState } from 'react';
import CodeEditor from '../code-editor/code-editor';
import Preview from '../preview/preview';
import Resizable from '../resizable/resizable';
import './code-cell.css';

const CodeCell = () => {

  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  return (
    <Resizable direction='vertical'>
      <div className='main-container'>
      <CodeEditor 
          initialValue='const a = 1'
          onChange={(value) => setInput(value)}
      />
      <Preview code={code} />
      </div>
    </Resizable>
  )
}

export default CodeCell;