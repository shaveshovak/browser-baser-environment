import { useEffect, useRef } from "react";
import './preview.css';

interface PreviewProps  {
  code: string;
};

const html = ` <html> 
	<head>
		<style>
			html {
				background-color: white;
			}
		</style>
	</head>
	<body>
		<div id="root"></div>
		<script>
			window.addEventListener('message', (event) => {
				try{
					eval(event.data);
				} catch (err) {
					const root = document.querySelector('#root');
					root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
					console.error(err);
				}
			}, false);
		</script>
	</body>
</html>`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*');
		}, 50)
	}, [code]);
	
	return <div className="preview-wrapper">
				<iframe 
					title='The result of the executed code' 
					ref={iframe}
					sandbox='allow-scripts' // when the iframe element does have a sandbox or has value 'allow-same-origin' direct access between frames is allowed
					srcDoc={html}
				/>
		</div>
}  

export default Preview;