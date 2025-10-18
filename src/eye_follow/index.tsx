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
} as const

const EYE_SOCKET_RADIUS_OFFSET_PX = {
	left: 1,
	right: 2,
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
	}, [fontSize, h])

	const mousePos = useMousePosition()
	const relativeMousePos = {
		left: {
			x: mousePos.x ?? eyeCenterPosPx.left.x,
			y: mousePos.y ?? eyeCenterPosPx.left.y,
		},
		right: {
			x: mousePos.x ?? eyeCenterPosPx.right.x,
			y: mousePos.y ?? eyeCenterPosPx.right.y,
		},
	}

	const distFromMouse = {
		left: {
			x: relativeMousePos.left.x - eyeCenterPosPx.left.x,
			y: relativeMousePos.left.y - eyeCenterPosPx.left.y,
		},
		right: {
			x: relativeMousePos.right.x - eyeCenterPosPx.right.x,
			y: relativeMousePos.right.y - eyeCenterPosPx.right.y,
		},
	}

	const maxScreenDist = {
		left: {
			x: distFromMouse.left.x > 0
				? w - eyeCenterPosPx.left.x
				: eyeCenterPosPx.left.x,
			y: distFromMouse.left.y > 0
				? h - eyeCenterPosPx.left.y
				: eyeCenterPosPx.left.y,
		},
		right: {
			x: distFromMouse.right.x > 0
				? w - eyeCenterPosPx.right.x
				: eyeCenterPosPx.right.x,
			y: distFromMouse.right.y > 0
				? h - eyeCenterPosPx.right.y
				: eyeCenterPosPx.right.y,
		},
	}

	const eyeSocketRadius = EYE_SIZE * fontSize

	const innerEyeSocketDist = {
		left: {
			x: (distFromMouse.left.x / maxScreenDist.left.x) *
				eyeSocketRadius,
			y: (distFromMouse.left.y / maxScreenDist.left.y) *
				eyeSocketRadius,
		},
		right: {
			x: (distFromMouse.right.x / maxScreenDist.right.x) *
				eyeSocketRadius,
			y: (distFromMouse.right.y / maxScreenDist.right.y) *
				eyeSocketRadius,
		},
	}

	const translate = {
		left: Math.min(
			Math.hypot(
				innerEyeSocketDist.left.x,
				innerEyeSocketDist.left.y,
			),
			eyeSocketRadius - EYE_SOCKET_RADIUS_OFFSET_PX.left,
		),
		right: Math.min(
			Math.hypot(
				innerEyeSocketDist.right.x,
				innerEyeSocketDist.right.y,
			),
			eyeSocketRadius - EYE_SOCKET_RADIUS_OFFSET_PX.right,
		),
	}

	const angle = {
		left: Math.atan2(
			distFromMouse.left.y,
			distFromMouse.left.x,
		),
		right: Math.atan2(
			distFromMouse.right.y,
			distFromMouse.right.x,
		),
	}

	return (
		<>
			<svg
				style={{
					...STYLE.eye.left,
					transform:
						`rotate(${angle.left}rad) translate(${translate.left}px)`,
				}}
			>
				<title>left pupil</title>
				<circle cx="50%" cy="50%" r="27%" fill="white" />
			</svg>
			<svg
				style={{
					...STYLE.eye.right,
					transform:
						`rotate(${angle.right}rad) translate(${translate.right}px)`,
				}}
			>
				<title>right pupil</title>
				<circle cx="50%" cy="50%" r="25%" fill="white" />
			</svg>
		</>
	)
}

export default EyeFollow
