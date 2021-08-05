/**
 * ChannelNamesResponse defines the structure of the response from the API.
 */
export type ChannelConfigsResponse = ChannelConfigsResponseItem[]

/**
 * ChannelNamesResponseItem defines the structure of a single item of [[ChannelNamesResponse]].
 */
export interface ChannelConfigsResponseItem {
	/**
	 * backend is the name of the backend where the [[channels]] are
	 * available.
	 */
	backend: string

	/**
	 * channels contains a list of the channel names on this item's
	 * [[backend]], that satisfy the query's criteria.
	 */
	channels: ChannelConfig[]
}

/**
 * ChannelConfig holds configuration details about one channel.
 */
export interface ChannelConfig {
	/**
	 * source identifies the data source that was fed into the data provider
	 * identified by [[backend]].
	 */
	source: string

	/**
	 * backend identifies the data providing backend.
	 */
	backend: string

	/**
	 * name identifies the channel on the [[backend]].
	 */
	name: string

	/**
	 * type describes the underlying data type of the entity.
	 */
	type: string

	/**
	 * shape describes the structure of the data points.
	 * Possible values are scalar, array/waveform, 2d array/picture.
	 *
	 * @see [[ConfigFields.SHAPE]]
	 */
	shape: number[]

	/**
	 * unit contains the engineering unit of the values.
	 */
	unit?: string

	/**
	 * description holds additional information on a channel.
	 */
	description?: string
}
