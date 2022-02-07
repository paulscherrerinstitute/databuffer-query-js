import { dataResponseGuard } from '../apiv0decoders.js'
import { post } from '../httputil.js'
import type { Channel } from '../channel.js'
import type { DataQueryRange } from './range.js'
import type { AggregationSpecification } from './aggregation.js'
import type { DataResponse, DataResponseFormat } from './response.js'
import type { ConfigField, EventField } from './fields.js'
import { MappingSpecification } from './mapping.js'

/**
 * DataQuery defines a query for data points
 */
export interface DataQuery {
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
	range: DataQueryRange

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
	response?: DataResponseFormat

	/**
	 * mapping activates a table-like alignment of the response
	 */
	mapping?: MappingSpecification

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
 * queryData queries the REST API for data.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 * @param query defines the query to be run
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryData = async (
	baseUrl: string,
	query: DataQuery
): Promise<DataResponse> => {
	const endpoint = `${baseUrl}/query`
	const resp = await post(endpoint, query)
	const data = await resp.json()
	// validation is currently broken, see
	// https://github.com/paulscherrerinstitute/databuffer-query-js/issues/27
	//
	// const result = dataResponseGuard(data)
	const result = data as DataResponse
	return result
}

/**
 * queryDataRaw queries the REST API for data and returns the `Response`
 * from the request.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 * @param query defines the query to be run
 *
 * @returns A `Promise` with the unprocessed fetch response.
 */
export const queryDataRaw = async (
	baseUrl: string,
	query: DataQuery
): Promise<Response> => {
	const endpoint = `${baseUrl}/query`
	return post(endpoint, query)
}
