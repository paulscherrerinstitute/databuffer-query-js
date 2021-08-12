/**
 * Module apiv0http contains HTTP helpers for convenience.
 */

import { resolve } from 'path'
import { fetchWithTimeout } from '../../http'

/**
 * COMMON_FETCH_OPTIONS provides a base for `fetch` calls for working
 * with the databuffer REST API.
 *
 * Example:
 *
 * fetch(url, { ...COMMON_FETCH_OPTIONS, body: JSON.stringify(payloadData) }).then( ... )
 */
export const COMMON_FETCH_OPTIONS: RequestInit = {
	mode: 'cors',
	cache: 'no-cache',
	credentials: 'omit',
	headers: {
		'Content-Type': 'application/json',
	},
	redirect: 'follow',
	referrer: 'no-referrer',
}

/**
 * post sends a HTTP POST request to a URL.
 *
 * It is a convenience function that does the following:
 *
 * - Automatically uses [[COMMON_FETCH_OPTIONS]]
 * - Applies `JSON.stringify` to the [[body]]
 * - Checks if the Response was a success (`reponse.ok`)
 *
 * @param url The URL to send the POST request to
 * @param body The *optional* payload to be sent with the request
 */
export const post = async (url: string, body?: unknown): Promise<Response> => {
	const options: RequestInit = {
		...COMMON_FETCH_OPTIONS,
		method: 'POST',
	}
	if (body !== undefined) options.body = JSON.stringify(body)
	const resp = await fetchWithTimeout(url, options)
	if (!resp.ok)
		throw new Error(`POST failed: (${resp.status}) ${resp.statusText}`)
	return resp
}

/**
 * get sends a HTTP GET request to a URL.
 *
 * It is a convenience function that does the following:
 *
 * - Automatically uses [[COMMON_FETCH_OPTIONS]]
 * - Checks if the Response was a success (`reponse.ok`)
 *
 * @param url The URL to send the POST request to
 */
export const get = async (url: string): Promise<Response> => {
	const options: RequestInit = {
		...COMMON_FETCH_OPTIONS,
		method: 'GET',
	}
	const resp = await fetchWithTimeout(url, options)
	if (!resp.ok)
		throw new Error(`GET failed: (${resp.status}) ${resp.statusText}`)
	return resp
}
