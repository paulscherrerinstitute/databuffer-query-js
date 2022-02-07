import { fetchWithTimeout } from '../../http.js'

export const DEFAULT_TIMEOUT = 10000 // milliseconds

/** convenience function for issuing HTTP GET requests */
export const get = async (
	url: RequestInfo,
	timeoutMs: number = DEFAULT_TIMEOUT
): Promise<unknown> => {
	const resp = await fetchWithTimeout(
		url,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		},
		timeoutMs
	)
	return resp.json()
}
