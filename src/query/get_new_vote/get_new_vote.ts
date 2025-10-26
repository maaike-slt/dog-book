import { randomBetween } from "@std/random"
import getBreedFromImageUrl from "../get_breed.ts"
import getDogCount from "../get_dog_count.ts"
import { supabase } from "../index.ts"
import getLastDog from "./get_last_dog.ts"
import getNewDogFromApi from "./get_new_dog_from_api.ts"
import getRandomDogImageUrlFromDb from "./get_random_dog_image_url_from_db.ts"
import getTopDogVoteCount from "./get_top_dog_vote_count.ts"

const DOG_COUNT_FETCH_NEW_RATIO = 0.1

export default async function getNewVote(): Promise<string[]> {
	const [lastDog, topDogVoteCount, dogCount] = await Promise.all([
		getLastDog(),
		getTopDogVoteCount(),
		getDogCount(),
	])

	const res = lastDog ? [lastDog] : []

	let tryCount = 0
	while (res.length < 2 && tryCount < 3) {
		tryCount++

		const fetchNew = shouldFetchNew(
			lastDog?.voteCount ?? null,
			topDogVoteCount,
			dogCount,
		)

		if (!fetchNew) {
			const randomDogImageUrl = await getRandomDogImageUrlFromDb(
				res.at(0)?.imageUrl ?? null,
			)
			if (randomDogImageUrl) {
				res.push({ imageUrl: randomDogImageUrl, voteCount: 0 })
				continue
			}
		}

		const newDogImageUrl = await getNewDogFromApi()
		if (
			!newDogImageUrl ||
			res.some((d) => d.imageUrl === newDogImageUrl)
		) {
			continue
		}

		const breed = getBreedFromImageUrl(newDogImageUrl)
		await supabase.from("dog_history").upsert({
			breed,
			image_url: newDogImageUrl,
		})

		res.push({ imageUrl: newDogImageUrl, voteCount: 0 })
	}

	if (res.length !== 2) {
		return []
	}

	const resUrl = res.map((d) => d.imageUrl)

	return randomBetween(0, 1) > 0.5 ? [resUrl[1], resUrl[0]] : resUrl
}

function shouldFetchNew(
	lastDogVoteCount: number | null,
	topDogVoteCount: number | null,
	dogCount: number | null,
): boolean {
	if (lastDogVoteCount === null) {
		return true
	}

	if (!dogCount) {
		return true
	}
	if (
		(lastDogVoteCount / (dogCount * DOG_COUNT_FETCH_NEW_RATIO)) <
			randomBetween(0, 1)
	) {
		return true
	}

	if (!topDogVoteCount) {
		return true
	}
	return (lastDogVoteCount / topDogVoteCount) < randomBetween(0, 1)
}
