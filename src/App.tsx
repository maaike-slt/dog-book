import type React from "react"
import "./App.css"
import DogVote from "./dog_vote/index.tsx"
import EyeFollow from "./eye_follow/index.tsx"
import MainTitle from "./main_title/index.tsx"

const App: React.FC = () => {
	return (
		<>
			<div className="main-container">
				<MainTitle />
				<DogVote />
			</div>

			<EyeFollow />
		</>
	)
}

export default App
