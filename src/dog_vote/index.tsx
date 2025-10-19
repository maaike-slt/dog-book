import type React from "react"
import { useEffect, useState } from "react"
import Loader from "../Loader.tsx"
import castVote from "../query/cast_vote.ts"
import getNewVote from "../query/get_new_vote.ts"
import DogVoteBtn from "./DogVoteBtn.tsx"

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
		return <Loader />
	}

	return (
		<>
			<DogVoteBtn
				dogUrl={dogVote[0]}
				onClick={() => handleCastVote(0)}
				isVoted={votedIndex === null ? null : (votedIndex === 0)}
			/>
			<DogVoteBtn
				dogUrl={dogVote[1]}
				onClick={() => handleCastVote(1)}
				isVoted={votedIndex === null ? null : (votedIndex === 1)}
			/>
		</>
	)
}

export default DogVote
