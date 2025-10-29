import type React from "react"
import { useEffect, useState } from "react"
import getBreedRanking from "../query/get_breed_ranking.ts"
import type { RankingOrder } from "../query/type/ranking_order.ts"

interface BreedRankingProps {
	type: RankingOrder
	fetch: boolean
}

const PAGE_SIZE = 10

const BreedRanking: React.FC<BreedRankingProps> = ({ type, fetch }) => {
	const [breedRanking, setBreedRanking] = useState<string[] | null>(null)
	const [page, setPage] = useState(1)
	const loading = breedRanking === null

	useEffect(() => {
		if (!fetch) {
			return
		}

		handleFetchDogRanking()
	}, [fetch])

	async function handleFetchDogRanking() {
		const ranking = await getBreedRanking(type, page, PAGE_SIZE)
		setBreedRanking(ranking)
	}

	if (loading) {
		{/* TODO: when `loading`, show loader */}
		return <>loading...</>
	}

	return (
		<div className="breed-ranking">
			{breedRanking.map((breed) => <div key={breed}>{breed}</div>)}

			{/* TODO: add pagination controls */}
		</div>
	)
}

export default BreedRanking
