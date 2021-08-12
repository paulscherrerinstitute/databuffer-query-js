import { post } from '../httputil'
import { ChannelNamesResponse } from './response'

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
 * ChannelNamesQuery defines a query for channel names.
 */
export interface ChannelNamesQuery {
	/**
	 * regex defines the search pattern used to filter channel names.
	 *
	 * If not present or undefined (**default**), no filter will be applied.
	 * Filtering is done using Java's `Pattern`, i.e. `Matcher.find()`.
	 */
	regex?: string

	/**
	 * backends limits the query for channel names to specific backends (data providers).
	 *
	 * If not present or undefined (**default**), all backends will be queried for their channels.
	 */
	backends?: Array<string>

	/**
	 * ordering defines the order of the results returned from the backends.
	 * **Default** is [[Ordering.NONE]].
	 */
	ordering?: Ordering

	/**
	 * reload will force the server to reload cached channel names, if set.
	 * **Default** is `false`.
	 */
	reload?: boolean
}

/**
 * queryChannelNames queries the REST API for channel names.
 *
 * This function does the heavy lifting and actually sends out the request
 * and will return the resulting response through a `Promise`.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 * @param query defines the query to be run
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryChannelNames = async (
	baseUrl: string,
	query: ChannelNamesQuery
): Promise<ChannelNamesResponse> => {
	const endpoint = `${baseUrl}/channels`
	const resp = await post(endpoint, query)
	return resp.json() as Promise<ChannelNamesResponse>
}
