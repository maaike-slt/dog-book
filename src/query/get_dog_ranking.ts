import { supabase } from "./index.ts"
import { RankingOrder } from "./type/ranking_order.ts"

export default async function getDogRanking(
	order: RankingOrder,
	page: number,
	pageSize: number,
): Promise<string[]> {
	const best = order === RankingOrder.Best
	const { data, error } = await supabase
		.from("dog_ranking")
		.select("imageUrl:image_url")
		.order("rank", { ascending: !best })
		.order("created_at", { ascending: best })
		.order("image_url", { ascending: best })
		.range((page - 1) * pageSize, (page * pageSize) - 1)

	if (error) {
		// deno-lint-ignore no-console
		console.error("error getting total vote count:", error)
		return []
	}

	return data?.map((row) => row.imageUrl ?? "") ?? []
}
