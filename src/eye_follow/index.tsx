import React, { useMemo } from "react"
import useMousePosition from "../hook/useMousePosition.tsx"

const BASE = {
	x: 1,
	y: -4,
	size: 16,
	unit: "rem",
	zIndex: 3,
} as const

const IMG_PX_SIZE = 630

const EYE_SIZE = 20 / IMG_PX_SIZE * BASE.size
const EYE_SURFACE = EYE_SIZE * 2

const EYE_BASE_STYLE = {
	position: "fixed",
	height: EYE_SURFACE + BASE.unit,
	width: EYE_SURFACE + BASE.unit,
	zIndex: BASE.zIndex + 1,
} as const

const EYE_POS_OFFSET = {
	left: {
		x: BASE.x + (217.5 / IMG_PX_SIZE * BASE.size),
		y: BASE.y + (429.5 / IMG_PX_SIZE * BASE.size),
	},
	right: {
		x: BASE.x + (358.5 / IMG_PX_SIZE * BASE.size),
		y: BASE.y + (458.5 / IMG_PX_SIZE * BASE.size),
	},
}

const STYLE = {
	img: {
		position: "fixed",
		left: BASE.x + BASE.unit,
		bottom: BASE.y + BASE.unit,
		height: BASE.size + BASE.unit,
		zIndex: BASE.zIndex,
	},
	eye: {
		left: {
			...EYE_BASE_STYLE,
			left: EYE_POS_OFFSET.left.x + BASE.unit,
			bottom: EYE_POS_OFFSET.left.y + BASE.unit,
		},
		right: {
			...EYE_BASE_STYLE,
			left: EYE_POS_OFFSET.right.x + BASE.unit,
			bottom: EYE_POS_OFFSET.right.y + BASE.unit,
		},
	},
} as const

const EyeFollow: React.FC = () => {
	return (
		<>
			<img
				src="/dog_eye_follow.png"
				alt="Dog Eye Follow"
				style={STYLE.img}
			/>

			<Eyes />
		</>
	)
}

const Eyes: React.FC = () => {
	const fontSize = useMemo(() => {
		return parseFloat(
			getComputedStyle(document.documentElement).fontSize,
		)
	}, [])
	const { x, y } = useMousePosition()
	const w = globalThis.window.innerWidth
	const h = globalThis.window.innerHeight
	const eyeCenterPosPx = useMemo(() => {
		return {
			left: {
				x: (EYE_POS_OFFSET.left.x + EYE_SIZE) * fontSize - 0.5,
				y: h - ((EYE_POS_OFFSET.left.y + EYE_SIZE) * fontSize) - 0.5,
			},
			right: {
				x: (EYE_POS_OFFSET.right.x + EYE_SIZE) * fontSize - 0.5,
				y: h - ((EYE_POS_OFFSET.right.y + EYE_SIZE) * fontSize) - 0.5,
			},
		}
	}, [fontSize, w, h])

	console.debug({ x, y, fontSize, w, h })

	return (
		<>
			<svg style={STYLE.eye.left}>
				<title>left eye</title>
				<circle cx="50%" cy="50%" r="27%" fill="white" />
			</svg>
			<svg style={STYLE.eye.right}>
				<title>right eye</title>
				<circle cx="50%" cy="50%" r="25%" fill="white" />
			</svg>
		</>
	)
}

export default EyeFollow
