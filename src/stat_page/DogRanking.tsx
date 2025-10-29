import type React from "react"
import { useEffect, useState } from "react"
import getDogRanking from "../query/get_dog_ranking.ts"
import { RankingOrder } from "../query/type/ranking_order.ts"

interface DogRankingProps {
	type: RankingOrder
	fetch: boolean
}

const PAGE_SIZE = 10

const DogRanking: React.FC<DogRankingProps> = ({ type, fetch }) => {
	const [dogRanking, setDogRanking] = useState<string[] | null>(null)
	const [page, setPage] = useState(1)
	const loading = dogRanking === null

	useEffect(() => {
		if (!fetch) {
			return
		}

		handleFetchDogRanking()
	}, [fetch])

	async function handleFetchDogRanking() {
		const ranking = await getDogRanking(type, page, PAGE_SIZE)
		setDogRanking(ranking)
	}

	if (loading) {
		{/* TODO: when `loading`, show loader */}
		return <>loading...</>
	}

	const containerClassName = "dog-ranking " +
		(type === RankingOrder.Best ? "dog-ranking-best" : "dog-ranking-worst")

	return (
		<div className={containerClassName}>
			{dogRanking.map((dog) => (
				<img
					key={dog}
					src={dog}
					alt={dog}
					// TODO(maaike): implement ui
					style={{ maxWidth: "10rem" }}
				/>
			))}

			{/* TODO: add pagination controls */}
		</div>
	)
}

export default DogRanking
