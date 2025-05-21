import React from "react";
import "./CircularProgress.css";

const CircularProgress = ({
	label,
	value,
	text,
	percentage,
	color,
	rotation,
	bgColor,
}) => {
	const radius = 50; // Radius of the circle
	const circumference = 2 * Math.PI * radius; // Circumference of the circle
	const progress = (percentage / 100) * circumference; // Calculate progress

	return (
		<div className="circular-progress">
			<svg
				width="180"
				height="180"
				viewBox="0 0 120 120"
				style={{ transform: `rotate(${rotation}deg)` }}
			>
				{/* Background Circle */}
				<circle
					className="circle-bg"
					cx="60"
					cy="60"
					r={radius}
					style={{ stroke: bgColor }}
					strokeWidth="10"
				/>
				{/* Foreground Circle */}
				<circle
					className="circle-fg"
					cx="60"
					cy="60"
					r={radius}
					strokeWidth="10"
					stroke={color}
					strokeDasharray={circumference}
					strokeDashoffset={circumference - progress}
				/>
			</svg>
			<div className="circle-text">
				<h2>{label}</h2>
				<p>{value}</p>
				<p>{text || `${percentage}%`}</p>
			</div>
		</div>
	);
};

export default CircularProgress;
