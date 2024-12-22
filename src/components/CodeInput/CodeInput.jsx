import React, { useState, useRef } from "react";
import "./CodeInput.css";

const CodeInput = ({ length = 4, onComplete }) => {
	const [values, setValues] = useState(Array(length).fill(""));
	const inputs = useRef([]);

	const handleChange = (value, index) => {
		if (!/^\d$/.test(value) && value !== "") return; // Allow only digits

		const newValues = [...values];
		newValues[index] = value;
		setValues(newValues);

		if (value && index < length - 1) {
			inputs.current[index + 1].focus();
		}

		if (newValues.every((v) => v !== "") && onComplete) {
			onComplete(newValues.join(""));
		}
	};

	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && !values[index] && index > 0) {
			inputs.current[index - 1].focus();
		} else if (e.key === "ArrowLeft" && index > 0) {
			inputs.current[index - 1].focus();
		} else if (e.key === "ArrowRight" && index < length - 1) {
			inputs.current[index + 1].focus();
		}
	};

	const handlePaste = (e) => {
		const paste = e.clipboardData.getData("text").slice(0, length);
		if (/^\d+$/.test(paste)) {
			const newValues = paste.split("");
			setValues(newValues);
			if (onComplete) onComplete(paste);
		}
	};

	return (
		<div className="code-input-component">
			{values.map((value, index) => (
				<input
					key={index}
					type="text"
					value={value}
					maxLength={1}
					onChange={(e) => handleChange(e.target.value, index)}
					onKeyDown={(e) => handleKeyDown(e, index)}
					onPaste={handlePaste}
					ref={(el) => (inputs.current[index] = el)}
				/>
			))}
		</div>
	);
};

export default CodeInput;
