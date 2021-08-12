import { get } from '../httputil'
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
export const queryAggregations = async (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/aggregations`
	const resp = await get(endpoint)
	return resp.json() as Promise<ParametersResponse>
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
export const queryBackends = async (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/backends`
	const resp = await get(endpoint)
	return resp.json() as Promise<ParametersResponse>
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
export const queryCompression = async (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/compression`
	const resp = await get(endpoint)
	return resp.json() as Promise<ParametersResponse>
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
export const queryConfigFields = async (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/configfields`
	const resp = await get(endpoint)
	return resp.json() as Promise<ParametersResponse>
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
export const queryEventFields = async (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/eventfields`
	const resp = await get(endpoint)
	return resp.json() as Promise<ParametersResponse>
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
export const queryOrdering = async (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/ordering`
	const resp = await get(endpoint)
	return resp.json() as Promise<ParametersResponse>
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
export const queryResponseFormats = async (
	baseUrl: string
): Promise<ParametersResponse> => {
	const endpoint = `${baseUrl}/params/responseformat`
	const resp = await get(endpoint)
	return resp.json() as Promise<ParametersResponse>
}
