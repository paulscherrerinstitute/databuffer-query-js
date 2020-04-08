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
 */
export const fetchWithTimeout = async (
	url: string,
	options: RequestInit,
	timeoutMs: number = 30000
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

		const response =
			(await Promise.race([timerPromise, fetch(url, options)])) as Response
		clearTimeout(timerId)
		if (!response.ok)
			throw new Error(`${response.status}: ${response.statusText}`)
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
 *
 * @typeParam T The type of the request body
 */
export const post = async <T>(url: string, body?: T) => {
	const options: RequestInit = {
		...COMMON_FETCH_OPTIONS,
		method: 'POST',
	}
	if (body !== undefined) options.body = JSON.stringify(body)
	return fetchWithTimeout(url, options)
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
 * @param body The *optional* payload to be sent with the request
 */
export const get = async (url: string) => {
	const options: RequestInit = {
		...COMMON_FETCH_OPTIONS,
		method: 'GET',
	}
	return fetchWithTimeout(url, options)
}
