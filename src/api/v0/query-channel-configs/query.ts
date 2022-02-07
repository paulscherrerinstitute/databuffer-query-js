import { channelConfigsResponseGuard } from '../apiv0decoders.js'
import { post } from '../httputil.js'
import type { ChannelConfigsResponse } from './response.js'

/**
 * Ordering defines how the backend should order the results of a query.
 */
export enum Ordering {
	/** NONE applies no order to the results. This is the **default**. */
	NONE = 'none',

	/** ASC sorts results in ascending alpha-numeric order. */
	ASC = 'asc',

	/** DESC sorts results in descending alpha-numeric order. */
	DESC = 'desc',
}

/**
 * ChannelConfigsQuery defines a query for channel configurations.
 */
export interface ChannelConfigsQuery {
	/**
	 * regex defines the search pattern for filtering on the
	 * `name` field.
	 * @see [[ChannelConfig]]
	 *
	 * If not present or undefined (**default**), no filter will be applied.
	 * Filtering is done using Java's `Pattern`, i.e. `Matcher.find()`.
	 */
	regex?: string

	/**
	 * backends limits the query for to specific backends (data providers).
	 *
	 * If not present or undefined (**default**), all backends will be queried.
	 */
	backends?: string[]

	/**
	 * ordering defines the order of the results returned from the backends.
	 * **Default** (if not present) is [[Ordering.NONE]].
	 */
	ordering?: Ordering

	/**
	 * sourceRegex defines the search pattern for filtering on the
	 * `source` field.
	 * @see [[ChannelConfig]]
	 *
	 * If not present or undefined (**default**), no filter will be applied.
	 * Filtering is done using Java's `Pattern`, i.e. `Matcher.find()`.
	 */
	sourceRegex?: string
}

/**
 * queryChannelConfigs queries the REST API for channel configurations.
 *
 * This function does the heavy lifting and actually sends out the request
 * and will return the resulting response through a `Promise`.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 * @param query defines the query to be run
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryChannelConfigs = async (
	baseUrl: string,
	query: ChannelConfigsQuery
): Promise<ChannelConfigsResponse> => {
	const endpoint = `${baseUrl}/channels/config`
	const resp = await post(endpoint, query)
	const data = await resp.json()
	// validation is currently broken, see
	// https://github.com/paulscherrerinstitute/databuffer-query-js/issues/27
	//
	// const result = channelConfigsResponseGuard(data)
	const result = data as ChannelConfigsResponse
	return result
}
