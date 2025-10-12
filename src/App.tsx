import { type JSX, useEffect, useState } from "react"
import "./App.css"
import getNewVote from "./query/get_new_vote.ts"

function App(): JSX.Element {
	const [dogVote, setDogVote] = useState<unknown[]>([])

	useEffect(() => {
		handleGetNewVote()
	}, [])

	async function handleGetNewVote(): Promise<void> {
		const res = await getNewVote()

		console.debug({ res })
	}

	return (
		<div className="main-container">
			<div className="dog-image">
			</div>
			<div className="dog-image">
			</div>
		</div>
	)
}

export default App
