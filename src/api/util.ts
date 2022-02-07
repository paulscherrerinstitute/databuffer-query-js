import { fetchWithTimeout } from '../http.js'
import { dataApiVersionResponseGuard } from './v4/apiv4decoders.js'

/**
 * Contact the API provider at base URL `url` and try to read
 * version information from endpoint `/version` with a GET request.
 *
 * @param url base url of the API provider
 * @returns A Promise that resolves to either the version string, or undefined if the version could not be read.
 */
export const detectVersion = async (
	url: RequestInfo
): Promise<string | undefined> => {
	if (!url) throw new Error('need url')
	const resp = await fetchWithTimeout(url + '/version', {
		method: 'GET',
		headers: { Accept: 'application/json' },
	})
	if (resp.status === 404) {
		return undefined // OK, this API provider doesn't provide a /version endpoint
	}
	if (!resp.ok) {
		throw new Error(
			`could not detect version: ${resp.status} ${resp.statusText}`
		)
	}
	const respData: unknown = await resp.json()
	// in turn, try each known API version
	try {
		const tmp = dataApiVersionResponseGuard(respData)
		let v = `${tmp.data_api_version.major}`
		if (tmp.data_api_version.minor) {
			v += `.${tmp.data_api_version.minor}`
		}
		return v
	} catch (e) {
		// decoder throws error --> it's not Data API V4; try next one (if there is any)
	}
	// out of known API versions / providers --> throw error
	throw new Error('could not identify version from API response')
}
