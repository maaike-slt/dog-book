type SingleSnakeToCamelCase<S extends string> = S extends
	`${infer T}_${infer U}`
	? `${Lowercase<T>}${Capitalize<SingleSnakeToCamelCase<U>>}`
	: S
export type CamelCase<T> = T extends Record<string, unknown> ? {
		[K in keyof T as SingleSnakeToCamelCase<K & string>]: T[K]
	}
	: T
