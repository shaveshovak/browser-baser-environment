interface ActionButtonsProps {
    id?: string | undefined,
    icon: string,
    action: (id: string, actionInner?: string) => void
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ id, icon, action }) => {
    return (
        <div>
            <button 
                className="button is-primary is-small" 
                onClick={() => action(id as string)}
            >
                <span className="icon">
                    <i className={`fas ${icon}`}></i>
                </span>
            </button>
        </div>
    )
};

export default ActionButtons;