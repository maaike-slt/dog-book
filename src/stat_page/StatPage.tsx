import type React from "react"
import { useState } from "react"
import { RankingOrder } from "../query/type/ranking_order.ts"
import BreedRanking from "./BreedRanking.tsx"
import DogRanking from "./DogRanking.tsx"
import NavBtn from "./NavBtn.tsx"
import "./StatPage.css"
import TotalVoteCount from "./TotalVoteCount.tsx"

const StatPage: React.FC = () => {
	const [open, setOpen] = useState(false)

	return (
		<div className={`stat-page ${open ? " stat-page-open" : ""}`}>
			<TotalVoteCount fetch={open} />

			<DogRanking type={RankingOrder.Best} fetch={open} />
			<DogRanking type={RankingOrder.Worst} fetch={open} />

			<BreedRanking type={RankingOrder.Best} fetch={open} />
			<BreedRanking type={RankingOrder.Worst} fetch={open} />

			<NavBtn
				onClickMain={() => setOpen(false)}
				onClickStat={() => setOpen(true)}
			/>
		</div>
	)
}

export default StatPage
