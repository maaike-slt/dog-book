import { supabase } from "./index.ts"

export default async function castVote(
	upDogUrl: string,
	downDogUrl: string,
): Promise<void> {
	const { error } = await supabase.rpc("cast_vote", {
		up_dog_url: upDogUrl,
		down_dog_url: downDogUrl,
	})

	if (error) {
		// deno-lint-ignore no-console
		console.error("error casting vote:", error)
	}
}
