import { CamelCase } from "./case_conversion.ts"
import type { Database } from "./database.ts"

export type Table = {
	[table in keyof Database["public"]["Tables"]]: {
		[action in keyof Database["public"]["Tables"][table]]: CamelCase<
			Database["public"]["Tables"][table][action]
		>
	}
}
