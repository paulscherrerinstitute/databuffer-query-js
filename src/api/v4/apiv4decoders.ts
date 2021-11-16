/**
 * Module apiv4decoders contains [decoders](https://github.com/nvie/decoders)
 * used to validate API responses.
 */

import {
	array,
	boolean,
	either3,
	guard,
	integer,
	iso8601,
	nonEmptyString,
	number,
	object,
	optional,
	string,
} from 'decoders'

export const backendsResponseGuard = guard(
	object({
		backends: array(nonEmptyString),
	})
)

export const channelSearchResponseGuard = guard(
	object({
		channels: array(
			object({
				name: nonEmptyString,
				backend: nonEmptyString,
				source: optional(string),
				type: optional(string),
				shape: optional(array(integer)),
				unit: optional(string),
				description: optional(string),
			})
		),
	})
)

// a value can be either one of these:
// - a scalar
// - a 1D array (waveform)
// - a 2D array (image)
const _value = either3(number, array(number), array(array(number)))

export const eventsQueryResponseGuard = guard(
	object({
		finalisedRange: optional(boolean),
		timedOut: optional(boolean),
		tsAnchor: integer,
		tsMs: array(integer),
		tsNs: array(integer),
		values: array(_value),
	})
)

export const binnedQueryResponseGuard = guard(
	object({
		finalisedRange: optional(boolean),
		continueAt: optional(iso8601),
		missingBins: optional(integer),
		tsAnchor: integer,
		tsMs: array(integer),
		tsNs: array(integer),
		avgs: array(_value),
		mins: array(_value),
		maxs: array(_value),
		counts: array(either3(integer, array(integer), array(array(integer)))),
	})
)

export const dataApiVersionResponseGuard = guard(
	object({
		data_api_version: object({
			major: integer,
			minor: optional(integer),
		}),
	})
)
