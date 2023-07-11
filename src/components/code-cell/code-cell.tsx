import { useEffect } from 'react';
import { useTypedSelector } from '../../hooks/use-typed.selector';
import { useCumulative } from '../../hooks/use-cumulative-code';
import { useActions } from '../../hooks/use-action';
import CodeEditor from '../code-editor/code-editor';
import Resizable from '../resizable/resizable';
import Preview from '../preview/preview';
import { Cell } from '../../state';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
};

const CodeCell:React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  const cumulativeCode = useCumulative(cell.id);

  useEffect(() => {
    if(!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);

    return () => {
      clearTimeout(timer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cumulativeCode, cell.id, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div className='main-container'>
        <Resizable direction='horizontal'>
          <CodeEditor 
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {
            !bundle || bundle.loading 
            ? 
                <div className='progress-cover'>
                  <progress className='progress is-small is-primary' max='100'>
                    Loading
                  </progress>
                </div>
            : <Preview code={bundle.code} bundlingStatus={bundle.err} />
          }
        </div>
      </div>
    </Resizable>
  )
} 

export default CodeCell;