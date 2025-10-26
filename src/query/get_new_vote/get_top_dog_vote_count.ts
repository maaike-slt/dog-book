import { supabase } from "../index.ts"

export default async function getTopDogVoteCount(): Promise<number | null> {
	const { data, error } = await supabase
		.from("dog_history")
		.select("voteCount:vote_count")
		.order("vote_count", { ascending: false })
		.limit(1)
	if (error) {
		// deno-lint-ignore no-console
		console.error(error)
		return null
	}
	return data?.[0]?.voteCount ?? null
}
