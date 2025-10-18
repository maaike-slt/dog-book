import type React from "react"
import { useEffect, useState } from "react"
import castVote from "../query/cast_vote.ts"
import getNewVote from "../query/get_new_vote.ts"
import "./index.css"

const DogVote: React.FC = () => {
	const [dogVote, setDogVote] = useState<string[]>([])
	const [votedIndex, setVotedIndex] = useState<number | null>(null)

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

	function handleCastVote(
		index: number,
	): void {
		setVotedIndex(index)
		const castVoteProcess = castVote(dogVote[index], dogVote[1 - index])
		setTimeout(async () => {
			setVotedIndex(null)
			await castVoteProcess
			await handleGetNewVote()
		}, 500)
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
				onClick={() => handleCastVote(0)}
			>
				<img
					src={dogVote[0]}
					alt="Dog 1"
					className={`dog-image` +
						(votedIndex === null
							? ""
							: (votedIndex === 0
								? " dog-image-up-vote"
								: " dog-image-down-vote"))}
				/>
			</button>
			<button
				type="button"
				className="dog-button"
				onClick={() => handleCastVote(1)}
			>
				<img
					src={dogVote[1]}
					alt="Dog 2"
					className={`dog-image` +
						(votedIndex === null
							? ""
							: (votedIndex === 1
								? " dog-image-up-vote"
								: " dog-image-down-vote"))}
				/>
			</button>
		</>
	)
}

export default DogVote
