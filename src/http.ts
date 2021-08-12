/**
 * Module http contains helpers for dealing with HTTP requests.
 */

/**
 * fetchWithTimeout extends the general fetch API with the following details:
 *
 * - Provide a timeout
 * - Provide a means to cancel the request (with an AbortController)
 *
 * The implementation is based on this post on StackOverflow:
 * https://stackoverflow.com/a/57888548/4320236
 *
 * @param input The URL to send the request to.
 * @param init Request options (headers, payload, etc.).
 * @param timeoutMs The timeout (in milliseconds) to wait for a response.
 * @param externalAbort An abort signal that can trigger canceling the network request.
 */
export const fetchWithTimeout = async (
	input: RequestInfo,
	init: RequestInit,
	timeoutMs: number = 30000,
	externalAbort?: AbortSignal
): Promise<Response> => {
	const abortFetch = new AbortController()
	const opts = { ...init, signal: abortFetch.signal }
	const promise = fetch(input, opts)
	if (externalAbort) {
		externalAbort.addEventListener('abort', () => abortFetch.abort())
	}
	const timerId = setTimeout(() => abortFetch.abort(), timeoutMs)
	return promise.finally(() => clearTimeout(timerId))
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
