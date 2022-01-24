import {
	array,
	either,
	either4,
	guard,
	integer,
	nonEmptyString,
	number,
	object,
	optional,
	string,
	unknown,
} from 'decoders'

const _aggregationResult = object({
	count: optional(integer),
	kurtosis: optional(number),
	max: optional(number),
	mean: optional(number),
	min: optional(number),
	skewness: optional(number),
	stddev: optional(number),
	sum: optional(number),
	variance: optional(number),
})

/** validation for ParametersResponse */
export const parametersResponseGuard = guard(array(nonEmptyString))

/** validation for DataResponse */
export const dataResponseGuard = guard(
	array(
		object({
			channel: object({
				name: nonEmptyString,
				backend: nonEmptyString,
			}),
			data: array(
				object({
					backend: optional(nonEmptyString),
					channel: optional(nonEmptyString),
					eventCount: optional(integer),
					globalDate: optional(nonEmptyString), // use nonEmptyString; decoders.iso8601 would transform to Date
					globalMillis: optional(number),
					globalSeconds: optional(either(nonEmptyString, number)),
					iocDate: optional(nonEmptyString), // use nonEmptyString; decoders.iso8601 would transform to Date
					iocMillis: optional(number),
					iocSeconds: optional(either(nonEmptyString, number)),
					pulseId: optional(integer),
					severity: optional(integer),
					shape: optional(array(integer)),
					status: optional(number),
					transformedValue: optional(unknown), // this is currently under-spec'ed
					value: optional(
						either4(
							number,
							array(number),
							_aggregationResult,
							array(_aggregationResult)
						)
					),
				})
			),
		})
	)
)

export const channelNamesResponseGuard = guard(
	array(
		object({
			backend: nonEmptyString,
			channels: array(nonEmptyString),
		})
	)
)

export const channelConfigsResponseGuard = guard(
	array(
		object({
			backend: nonEmptyString,
			channels: array(
				object({
					source: nonEmptyString,
					backend: nonEmptyString,
					name: nonEmptyString,
					type: nonEmptyString,
					shape: array(integer),
					unit: optional(string),
					description: optional(string),
				})
			),
		})
	)
)
