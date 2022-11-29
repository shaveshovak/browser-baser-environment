import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import pretier from 'prettier';
import parser from 'prettier/parser-babel';
import './code-editor.css';
import './syntax.css';
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
	initialValue: string;
	onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
	const editorRef = useRef<any>();

	const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
		editorRef.current = monacoEditor;
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue());
		});

		monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

		const highlighter = new Highlighter(
			// @ts-ignore
			window.monaco,
			codeShift,
			monacoEditor
		);
		highlighter.highLightOnDidChangeModelContent(
			() => {},
			() => {},
			undefined,
			() => {}
		);
	};

	const onFormatClick = () => {
		// get current value from the editor 
		const unFormatted = editorRef.current.getModel().getValue();

		// format that value
		const formatted = pretier.format(unFormatted, { 
			parser: 'babel',
			plugins: [parser],
			useTabs: false,
			semi: true,
			singleQuote: true
		}).replace(/\n$/, '');

		// set the formatted value back in the editor 
		editorRef.current.setValue(formatted);
	};

	return <div className='editor-wrapper'>
		<button 
			onClick={onFormatClick}
			className='button button-format is-primary is-small '
		>Format</button>
		<MonacoEditor 
			editorDidMount={onEditorDidMount}
			value={initialValue}
			language='javascript' 
			height={'500px'} 
			theme={'dark'}
			options={{
				wordWrap: 'on',
				minimap: { enabled: false },
				showUnused: true,
				fontSize: 16,
				lineNumbersMinChars: 3,
				scrollBeyondLastLine: false,
			}}
		/>
	</div>
}

export default CodeEditor;