import type React from "react"
import "./NavBtn.css"

interface NavBtnProps {
	onClickMain: () => void
	onClickStat: () => void
}

const NavBtn: React.FC<NavBtnProps> = ({ onClickMain, onClickStat }) => {
	return (
		<>
			<button
				type="button"
				className="nav-button stat-button"
				onClick={onClickStat}
			>
				stats
			</button>
			<button
				type="button"
				className="nav-button main-button"
				onClick={onClickMain}
			>
				main
			</button>
		</>
	)
}

export default NavBtn
