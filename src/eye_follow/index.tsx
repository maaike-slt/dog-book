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
			left: BASE.x + (217.5 / IMG_PX_SIZE * BASE.size) + BASE.unit,
			bottom: BASE.y + (429.5 / IMG_PX_SIZE * BASE.size) + BASE.unit,
		},
		right: {
			...EYE_BASE_STYLE,
			left: BASE.x + (358.5 / IMG_PX_SIZE * BASE.size) + BASE.unit,
			bottom: BASE.y + (458.5 / IMG_PX_SIZE * BASE.size) + BASE.unit,
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

	console.debug({ x, y, fontSize, w, h })

	return (
		<>
			<svg style={STYLE.eye.left}>
				<circle cx="50%" cy="50%" r="27%" fill="white" />
			</svg>
			<svg style={STYLE.eye.right}>
				<circle cx="50%" cy="50%" r="25%" fill="white" />
			</svg>
		</>
	)
}

export default EyeFollow
