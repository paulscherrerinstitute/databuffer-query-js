/**
 * BACKEND_SEPARATOR is the delimiter string between the backend and name parts of a [[Channel.id]].
 */
export const BACKEND_SEPARATOR = '/'

/**
 * Channel is a named value, coming from a named backend.
 */
export interface Channel {
	/**
	 * name holds the name of the value.
	 */
	name: string

	/**
	 * backend holds the name of the backend.
	 */
	backend: string
}

/**
 * channelToId converts a [[Channel]] to its id string.
 *
 * @param channel The channel to convert
 *
 * @returns The full id of the [[Channel]]
 */
export const channelToId = (channel: Channel): string =>
	`${channel.backend}${BACKEND_SEPARATOR}${channel.name}`

/**
 * idToChannel converts an id string into a [[Channel]] object.
 *
 * @param id full [[id]] of the Channel
 *
 * @returns The channel
 */
export const idToChannel = (id: string): Channel => {
	const parts = id.split(BACKEND_SEPARATOR)
	if (parts.length !== 2) {
		throw new Error('Malformed id')
	}
	const [backend, name] = parts
	return { backend, name }
}
