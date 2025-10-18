import { useEffect, useState } from "react"

export interface MousePosition {
	x: number | null
	y: number | null
}

export default function useMousePosition(): MousePosition {
	const [
		mousePosition,
		setMousePosition,
	] = useState<MousePosition>({ x: null, y: null })

	useEffect(() => {
		const updateMousePosition = (ev: WindowEventMap["mousemove"]) => {
			setMousePosition({ x: ev.clientX, y: ev.clientY })
		}

		globalThis.window.addEventListener("mousemove", updateMousePosition)

		return () => {
			globalThis.window.removeEventListener(
				"mousemove",
				updateMousePosition,
			)
		}
	}, [])

	return mousePosition
}
