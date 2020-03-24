import { Channel } from '../channel'
import { post } from '../http-request'

import { QueryRange } from './range'
import { AggregationSpecification } from './aggregation'
import { QueryResponse, QueryResponseFormat } from './response'
import { ConfigField, EventField } from './fields'

/**
 * QueryRequest defines a query for data points
 */
export interface QueryRequest {
	/**
	 * channels defines, which [[Channel]]s will be queried for data.
	 *
	 * If you choose the simple version, and just provide an Array of
	 * strings, the backend will be automatically added for you using a
	 * prioritized list of backends. It will stop at the first match.
	 * For details of the order, check the API docs of project
	 * `ch.psi.daq.queryrest`.
	 */
	channels: Array<string> | Array<Channel>

	/** range defines the amount of data to be retrieved (X axis) */
	range: QueryRange

	/**
	 * ordering allows to ask for a specific ordering.
	 * **Default** is [[Ordering.ASC]].
	 */
	ordering?: Ordering

	/**
	 * configFields holds the config fields that are being requested.
	 * **Default** is not to query config fields.
	 */
	configFields?: Array<ConfigField>

	/**
	 * eventFields holds the event fields that are being requested.
	 * **Default** is a predefined set of fields.
	 */
	eventFields?: Array<EventField>

	/**
	 * aggregation, if set will trigger aggregation.
	 * **Default** is no aggregation.
	 */
	aggregation?: AggregationSpecification

	/**
	 * response instructs the API server to format the response in a certain way.
	 * **Default** is JSON, without compression, following redirects.
	 */
	response?: QueryResponseFormat

	// ### TODO: Value mapping

	// ### TODO: Value transformations
}

/**
 * Ordering defines how the backend should order the
 * results of a query.
 */
export enum Ordering {
	/** ASC sorts results in ascending alpha-numeric order. This is the **default**. */
	ASC = 'asc',

	/** DESC sorts results in descending alpha-numeric order. */
	DESC = 'desc',

	/**
	 * NONE applies no order to the results. Use this, if ordering of
	 * data is not required. It allows for *server-side optimizations*.
	 */
	NONE = 'none',
}

/**
 * Query the REST API for data.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 * @param options defines the query to be run
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryData = (
	baseUrl: string,
	options: QueryRequest
): Promise<QueryResponse> => {
	const endpoint = `${baseUrl}/query`
	return post(endpoint, options) as Promise<QueryResponse>
}
