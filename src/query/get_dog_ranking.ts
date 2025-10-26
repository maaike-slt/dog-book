import { supabase } from "./index.ts"
import { RankingOrder } from "./type/ranking_order.ts"

export default async function getDogRanking(
	order: RankingOrder,
	page: number,
	pageSize: number,
): Promise<string[]> {
	const { data, error } = await supabase
		.from("dog_history")
		.select("imageUrl:image_url")
		.order("(rating - 1)::real / vote_count::real", {
			ascending: order === RankingOrder.Best,
		})
		.range((page - 1) * pageSize, (page * pageSize) - 1)

	if (error) {
		// deno-lint-ignore no-console
		console.error("error getting total vote count:", error)
		return []
	}

	return data.map((row) => row.imageUrl)
}
