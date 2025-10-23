import type React from "react"
import "./App.css"
import DogVote from "./dog_vote/DogVote.tsx"
import EyeFollow from "./eye_follow/EyeFollow.tsx"
import MainTitle from "./main_title/MainTitle.tsx"
import StatBtn from "./stat_btn/StatBtn.tsx"

const App: React.FC = () => {
	return (
		<>
			<div className="main-container">
				<MainTitle />
				<DogVote />
				<StatBtn />
			</div>

			<EyeFollow />
		</>
	)
}

export default App
