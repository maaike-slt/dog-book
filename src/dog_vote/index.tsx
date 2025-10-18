import type React from "react"
import { useEffect, useState } from "react"
import castVote from "../query/cast_vote.ts"
import getNewVote from "../query/get_new_vote.ts"
import "./index.css"

const DogVote: React.FC = () => {
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

	async function handleCastVote(
		upDogUrl: string,
		downDogUrl: string,
	): Promise<void> {
		await castVote(upDogUrl, downDogUrl)
		await handleGetNewVote()
	}

	if (dogVote.length !== 2) {
		// TODO: better loading ui
		return <div>loading...</div>
	}

	return (
		<>
			<button
				type="button"
				className="dog-button"
				onClick={() => handleCastVote(dogVote[0], dogVote[1])}
			>
				<img
					src={dogVote[0]}
					alt="Dog 1"
					className="dog-image"
				/>
			</button>
			<button
				type="button"
				className="dog-button"
				onClick={() => handleCastVote(dogVote[1], dogVote[0])}
			>
				<img
					src={dogVote[1]}
					alt="Dog 2"
					className="dog-image"
				/>
			</button>
		</>
	)
}

export default DogVote
