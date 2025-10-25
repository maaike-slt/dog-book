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
				{/* https://fonts.google.com/icons?selected=Material+Symbols+Rounded:bar_chart:FILL@0;wght@400;GRAD@0;opsz@40 */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="100%"
					viewBox="0 -960 960 960"
					width="100%"
					fill="#e3e3e3"
				>
					<title>stats</title>
					<path d="M686.67-160q-14.17 0-23.75-9.58-9.59-9.59-9.59-23.75v-213.34q0-14.16 9.59-23.75 9.58-9.58 23.75-9.58h80q14.16 0 23.75 9.58 9.58 9.59 9.58 23.75v213.34q0 14.16-9.58 23.75-9.59 9.58-23.75 9.58h-80ZM440-160q-14.17 0-23.75-9.58-9.58-9.59-9.58-23.75v-573.34q0-14.16 9.58-23.75Q425.83-800 440-800h80q14.17 0 23.75 9.58 9.58 9.59 9.58 23.75v573.34q0 14.16-9.58 23.75Q534.17-160 520-160h-80Zm-246.67 0q-14.16 0-23.75-9.58-9.58-9.59-9.58-23.75v-373.34q0-14.16 9.58-23.75 9.59-9.58 23.75-9.58h80q14.17 0 23.75 9.58 9.59 9.59 9.59 23.75v373.34q0 14.16-9.59 23.75-9.58 9.58-23.75 9.58h-80Z" />
				</svg>
			</button>
			<button
				type="button"
				className="nav-button main-button"
				onClick={onClickMain}
			>
				{/* https://fonts.google.com/icons?selected=Material+Symbols+Rounded:prompt_suggestion:FILL@0;wght@400;GRAD@0;opsz@24 */}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="100%"
					viewBox="0 -960 960 960"
					width="100%"
					fill="#e3e3e3"
					style={{ transform: "scaleX(-1)" }}
				>
					<title>return</title>
					<path d="M687-400H300q-75 0-127.5-52.5T120-580q0-75 52.5-127.5T300-760q17 0 28.5 11.5T340-720q0 17-11.5 28.5T300-680q-42 0-71 29t-29 71q0 42 29 71t71 29h387L572-596q-11-11-11.5-27.5T572-652q11-11 28-11t28 11l184 184q12 12 12 28t-12 28L628-228q-12 12-28 11.5T572-229q-11-12-11.5-28t11.5-28l115-115Z" />
				</svg>
			</button>
		</>
	)
}

export default NavBtn
