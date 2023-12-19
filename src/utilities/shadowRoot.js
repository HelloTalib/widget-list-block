import { useRef, useEffect } from '@wordpress/element';

const ShadowRootComponent = (props) => {
	const myRef = useRef();

	useEffect(() => {
		const hostElement = myRef.current;

		// Create a shadow root
		const shadowRoot = hostElement.attachShadow({ mode: 'open' });

		// Create an element inside the shadow DOM
		const div = document.createElement('div');

		// Remove double quotes from the start and end of props.image
		const sanitizedImage = props.image.replace(/^"|"$/g, '');

		// Set the content of the element as SVG
		div.innerHTML = sanitizedImage;

		// Append the element to the shadow DOM
		shadowRoot.append(div);
	}, [props.image]); // Run this effect whenever the props.image changes

	return (
		<span className="zolo-block-list-icon" ref={myRef}>
			{/* The content inside the shadow DOM will be appended here */}
		</span>
	);
};

export default ShadowRootComponent;
