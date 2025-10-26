import type React from "react"
import { useEffect, useState } from "react"
import getTotalVoteCount from "../query/get_total_vote_count.ts"

interface TotalVoteCountProps {
	fetch: boolean
}

const TotalVoteCount: React.FC<TotalVoteCountProps> = ({ fetch }) => {
	const [totalVoteCount, setTotalVoteCount] = useState<number | null>(null)
	const loading = totalVoteCount === null

	useEffect(() => {
		if (!fetch) {
			return
		}

		getTotalVoteCount().then((count) => {
			setTotalVoteCount(count)
		})
	}, [fetch])

	return (
		<>
			{/* TODO: when `loading`, show loader */}
			{loading ? "loading..." : `total votes: ${totalVoteCount}`}
		</>
	)
}

export default TotalVoteCount
