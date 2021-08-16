import * as decoders from 'decoders'
import { fetchWithTimeout } from '../http'

type VersionInfo = {
	version: string
}
const versionGuard = decoders.guard(
	decoders.object({ version: decoders.string })
)

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
		return undefined
	}
	if (!resp.ok) {
		throw new Error(
			`could not detect version: ${resp.status} ${resp.statusText}`
		)
	}
	try {
		const versionInfo: VersionInfo = versionGuard(await resp.json())
		return versionInfo.version
	} catch (e) {
		throw new Error('received malformed version info')
	}
}
