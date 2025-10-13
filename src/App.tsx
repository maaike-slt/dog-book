import { type JSX, useEffect, useState } from "react"
import "./App.css"
import getNewVote from "./query/get_new_vote.ts"

function App(): JSX.Element {
	const [dogVote, setDogVote] = useState<string[]>([])

	useEffect(() => {
		handleGetNewVote()
	}, [])

	async function handleGetNewVote(): Promise<void> {
		const res = await getNewVote()

		if (res.length !== 2) {
			// deno-lint-ignore no-console
			console.error("Failed to get two dog images")
			return
		}

		setDogVote(res)
	}

	if (dogVote.length !== 2) {
		// TODO: better loading ui
		return <div>loading...</div>
	}

	return (
		<>
			<div className="main-container">
				<div className="main-title">
					choose your favorite!
				</div>

				<button type="button" className="dog-button">
					<img
						src={dogVote[0]}
						alt="Dog 1"
						className="dog-image"
					/>
				</button>
				<button type="button" className="dog-button">
					<img
						src={dogVote[1]}
						alt="Dog 2"
						className="dog-image"
					/>
				</button>
			</div>
		</>
	)
}

export default App
