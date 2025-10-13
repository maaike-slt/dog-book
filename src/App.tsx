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

	return (
		<>
			<div className="main-container">
				<div className="main-title">
					choose your favorite!
				</div>
				<button type="button" className="dog-image" />
				<button type="button" className="dog-image" />
			</div>

			<br />
			{dogVote.map((url, index) => (
				<div key={index}>
					<img src={url} alt={`Dog ${index + 1}`} width="300" />
				</div>
			))}
		</>
	)
}

export default App
