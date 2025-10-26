import type React from "react"
import { useState } from "react"
import NavBtn from "./NavBtn.tsx"
import "./StatPage.css"
import TotalVoteCount from "./TotalVoteCount.tsx"

const StatPage: React.FC = () => {
	const [open, setOpen] = useState(false)

	return (
		<div className={`stat-page ${open ? " stat-page-open" : ""}`}>
			<TotalVoteCount fetch={open} />

			<NavBtn
				onClickMain={() => setOpen(false)}
				onClickStat={() => setOpen(true)}
			/>
		</div>
	)
}

export default StatPage
