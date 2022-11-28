import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';

interface CodeEditorProps {
	initialValue: string;
	onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {

	const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue());
		});

		monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
	};

	return <MonacoEditor 
		editorDidMount={onEditorDidMount}
		value={initialValue}
		language='javascript' 
		height={'500px'} 
		theme={'dark'}
		options={{
			wordWrap: 'on',
			minimap: { enabled: false },
			showUnused: true,
			folding: 18,
			fontSize: 16,
			lineNumbersMinChars: 3,
			scrollBeyondLastLine: false,
		}}
	/>
}

export default CodeEditor;