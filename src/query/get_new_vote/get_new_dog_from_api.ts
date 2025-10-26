const dogApiUrl = "https://dog.ceo/api/breeds/image/random"

export default async function getNewDogFromApi(): Promise<string | null> {
	try {
		const response = await fetch(dogApiUrl)
		const data = await response.json() as {
			message: string
			status: string
		}
		if (data.status !== "success") {
			// deno-lint-ignore no-console
			console.error("Failed to fetch new dog image from API", { data })
			return null
		}
		return data.message
	} catch (e) {
		// deno-lint-ignore no-console
		console.error(e)
		return null
	}
}
