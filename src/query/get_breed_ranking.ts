import { supabase } from "./index.ts"
import { RankingOrder } from "./type/ranking_order.ts"

export default async function getBreedRanking(
	order: RankingOrder,
	page: number,
	pageSize: number,
): Promise<string[]> {
	const ascending = order === RankingOrder.Best
	const { data, error } = await supabase
		.from("breed_ranking")
		.select("breed")
		.order("rank", { ascending })
		.order("dog_count", { ascending })
		.order("breed", { ascending })
		.range((page - 1) * pageSize, (page * pageSize) - 1)

	if (error) {
		// deno-lint-ignore no-console
		console.error("error getting total vote count:", error)
		return []
	}

	return data?.map((row) => row.breed ?? "") ?? []
}
