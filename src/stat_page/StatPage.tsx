import type React from "react"
import { useState } from "react"
import NavBtn from "./NavBtn.tsx"
import "./StatPage.css"

const StatPage: React.FC = () => {
	const [open, setOpen] = useState(false)
	return (
		<div className={`stat-page ${open ? " stat-page-open" : ""}`}>
			ola muchachos

			<NavBtn
				onClickMain={() => setOpen(false)}
				onClickStat={() => setOpen(true)}
			/>
		</div>
	)
}

export default StatPage
