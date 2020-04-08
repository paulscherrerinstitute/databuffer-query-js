import { get } from '../http-request'
import type { ParametersResponse } from './parameters-response'

/**
 * Query the REST API for available aggregation operations.
 *
 * This function does the heavy lifting and actually sends out the request
 * and will return the resulting response through a `Promise`.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryAggregations = (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/aggregations`
	return get(endpoint) as Promise<ParametersResponse>
}

/**
 * Query the REST API for available backends (data providers).
 *
 * This function does the heavy lifting and actually sends out the request
 * and will return the resulting response through a `Promise`.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryBackends = (baseUrl: string): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/backends`
	return get(endpoint) as Promise<ParametersResponse>
}

/**
 * Query the REST API for available compression formats.
 *
 * This function does the heavy lifting and actually sends out the request
 * and will return the resulting response through a `Promise`.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryCompression = (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/compression`
	return get(endpoint) as Promise<ParametersResponse>
}

/**
 * Query the REST API for available config fields.
 *
 * This function does the heavy lifting and actually sends out the request
 * and will return the resulting response through a `Promise`.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryConfigFields = (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/configfields`
	return get(endpoint) as Promise<ParametersResponse>
}

/**
 * Query the REST API for available event fields.
 *
 * This function does the heavy lifting and actually sends out the request
 * and will return the resulting response through a `Promise`.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryEventFields = (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/eventfields`
	return get(endpoint) as Promise<ParametersResponse>
}

/**
 * Query the REST API for available ordering (sorting) values.
 *
 * This function does the heavy lifting and actually sends out the request
 * and will return the resulting response through a `Promise`.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryOrdering = (baseUrl: string): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/ordering`
	return get(endpoint) as Promise<ParametersResponse>
}

/**
 * Query the REST API for available response formats.
 *
 * This function does the heavy lifting and actually sends out the request
 * and will return the resulting response through a `Promise`.
 *
 * @param baseUrl URL of the REST interfaces startpoint for routing
 *
 * @returns A `Promise` with the results from the query.
 */
export const queryResponseFormats = (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/responseformat`
	return get(endpoint) as Promise<ParametersResponse>
}
