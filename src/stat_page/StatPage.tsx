import type React from "react"
import { useState } from "react"
import "./StatPage.css"

const StatPage: React.FC = () => {
	const [open, setOpen] = useState(false)
	return (
		<div className={`stat-page ${open ? " stat-page-open" : ""}`}>
			ola muchachos
			<button
				type="button"
				className="stat-button"
				onClick={() => setOpen(true)}
			>
				stats
			</button>
		</div>
	)
}

export default StatPage
