import { supabase } from "./index.ts"
import { RankingOrder } from "./type/ranking_order.ts"

export default async function getBreedRanking(
	order: RankingOrder,
	page: number,
	pageSize: number,
): Promise<string[]> {
	const best = order === RankingOrder.Best
	const { data, error } = await supabase
		.from("breed_ranking")
		.select("breed")
		.order("rank", { ascending: !best })
		.order("dog_count", { ascending: !best })
		.order("breed", { ascending: best })
		.range((page - 1) * pageSize, (page * pageSize) - 1)

	if (error) {
		// deno-lint-ignore no-console
		console.error("error getting breed ranking:", error)
		return []
	}

	return data?.map((row) => row.breed ?? "") ?? []
}
