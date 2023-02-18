import './action-bar.css';
import { useActions } from "../../hooks/use-action";
import ActionButtons from './action-buttons';

interface ActionBarProps {
    id: string
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
    const { moveCell, deleteCell } = useActions();

    return (
        <div className="action-bar">
            <ActionButtons
                icon="fa-arrow-up"
                action={() => moveCell(id, 'up')}
            />
            <ActionButtons
                icon="fa-arrow-down"
                action={() => moveCell(id, 'down')}
            />
            <ActionButtons
                icon="fa-times"
                action={() => deleteCell(id)}
            />
        </div>
    )
};

export default ActionBar;