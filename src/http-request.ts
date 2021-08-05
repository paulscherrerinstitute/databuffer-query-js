/**
 * COMMON_FETCH_OPTIONS provides a base for `fetch` calls for working
 * with the databuffer REST API.
 *
 * Example:
 *
 * fetch(url, { ...COMMON_FETCH_OPTIONS, body: JSON.stringify(payloadData) }).then( ... )
 */
export const COMMON_FETCH_OPTIONS: RequestInit = {
	method: 'POST',
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
 * fetchWithTimeout extends the general fetch API with the following details:
 *
 * - Provide a timeout
 * - Adds a type cast for the payload's response
 *
 * @param url The URL to send the POST request to.
 * @param options Request options (headers, payload, etc.).
 * @param timeoutMs The timeout (in milliseconds) to wait for a response.
 * @param returnRaw If `true` returns the raw response object. If `false` (default) returns `response.json()`.
 */
export const fetchWithTimeout = async (
	url: string,
	options: RequestInit,
	timeoutMs: number = 30000,
	returnRaw = false
): Promise<unknown> => {
	let timerId
	const abortController = new AbortController()
	options.signal = abortController.signal
	try {
		const timerPromise = new Promise(() => {
			timerId = setTimeout(() => {
				abortController.abort() // upon timeout, abort the pending request
				throw new Error('Request timed out')
			}, timeoutMs)
		})

		const response = (await Promise.race([
			timerPromise,
			fetch(url, options),
		])) as Response
		clearTimeout(timerId)
		if (!response.ok)
			throw new Error(`${response.status}: ${response.statusText}`)
		if (returnRaw) return response
		return await response.json()
	} catch (err) {
		clearTimeout(timerId)
		throw err
	}
}

/**
 * post sends a HTTP POST request to a URL.
 *
 * It is a convenience function that does the following:
 *
 * - Automatically uses [[COMMON_FETCH_OPTIONS]]
 * - Applies `JSON.stringify` to the [[body]]
 * - Checks if the Response was a success (`reponse.ok`)
 * - Extracts the payload of the response (`response.json()`)
 * - Adds a type cast for the payload's response
 *
 * @param url The URL to send the POST request to
 * @param body The *optional* payload to be sent with the request
 * @param returnRaw If `true` returns the raw response object. If `false` (default) returns `response.json()`.
 *
 * @typeParam T The type of the request body
 */
export const post = async <T>(url: string, body?: T, returnRaw = false) => {
	const options: RequestInit = {
		...COMMON_FETCH_OPTIONS,
		method: 'POST',
	}
	if (body !== undefined) options.body = JSON.stringify(body)
	return fetchWithTimeout(url, options, undefined, returnRaw)
}

/**
 * get sends a HTTP GET request to a URL.
 *
 * It is a convenience function that does the following:
 *
 * - Automatically uses [[COMMON_FETCH_OPTIONS]]
 * - Checks if the Response was a success (`reponse.ok`)
 * - Extracts the payload of the response (`response.json()`)
 * - Adds a type cast for the payload's response
 *
 * @param url The URL to send the POST request to
 * @param returnRaw If `true` returns the raw response object. If `false` (default) returns `response.json()`.
 */
export const get = async (url: string, returnRaw = false) => {
	const options: RequestInit = {
		...COMMON_FETCH_OPTIONS,
		method: 'GET',
	}
	return fetchWithTimeout(url, options, undefined, returnRaw)
}

/**
 * objectToGetParams transforms a JS object into a key value representation
 * suitable to pass in the parameters part of a the URL of a HTTP GET request.
 *
 * Example:
 *
 *     const params = { name: 'John Doe', email: 'jdoe@example.org'};
 *     const getParams = objectToGetParams(params);
 *     // getParams === `name=John%20Doe&email=jdoe%40example.org`
 */
export const objectToGetParams = (obj: {
	[k: string]: string | number
}): string => {
	const parts = Object.entries(obj).map(
		entry => `${encodeURIComponent(entry[0])}=${encodeURIComponent(entry[1])}`
	)
	return parts.join('&')
}
