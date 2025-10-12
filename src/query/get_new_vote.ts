import { supabase } from "./index.ts"

const dogApiUrl = "https://dog.ceo/api/breeds/image/random"

export default async function getNewVote(): Promise<unknown> {
	const { data: dogData, error } = await supabase
		.from("dog_history")
		.select("*")
		.order("vote_count", { ascending: true })
		.limit(2)
	if (error) {
		// deno-lint-ignore no-console
		console.error(error)
		return []
	}

	const { data: topDog, error: topDogError } = await supabase
		.from("dog_history")
		.select("*")
		.order("vote_count", { ascending: false })
		.limit(1)
	if (topDogError) {
		// deno-lint-ignore no-console
		console.error(topDogError)
		return []
	}

	let tries = 0
	do {
		tries++
	} while (dogData.length < 2 && tries < 3)

	console.debug({ dogData, error })

	return dogData
}
