import { useEffect, useState } from 'react';
import CodeEditor from '../code-editor/code-editor';
import { useActions } from '../../hooks/use-action';
import Resizable from '../resizable/resizable';
import Preview from '../preview/preview';
import bundler from '../../bundler';
import { Cell } from '../../state';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
};

const CodeCell:React.FC<CodeCellProps> = ({ cell }) => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction='vertical'>
      <div className='main-container'>
        <Resizable direction='horizontal'>
          <CodeEditor 
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  )
} 

export default CodeCell;