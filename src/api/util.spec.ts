import { detectVersion } from './util'
import { fetchWithTimeout } from '../http'
jest.mock('../http')
const mockedFetch = fetchWithTimeout as jest.MockedFunction<
	typeof fetchWithTimeout
>

const DEFAULT_URL = 'http://localhost:8080'

describe('module api/util', () => {
	beforeEach(() => {
		mockedFetch.mockClear()
	})

	describe('detectVersion', () => {
		it('returns version string for API v4 with major and minor', async () => {
			const expectedVersion = '4.2'
			mockedFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				json: () =>
					Promise.resolve({ data_api_version: { major: 4, minor: 2 } }),
			} as Response)
			const actualVersion = await detectVersion(DEFAULT_URL)
			expect(actualVersion).toBe(expectedVersion)
		})

		it('returns version string for API v4 with major version only', async () => {
			const expectedVersion = '4'
			mockedFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				json: () => Promise.resolve({ data_api_version: { major: 4 } }),
			} as Response)
			const actualVersion = await detectVersion(DEFAULT_URL)
			expect(actualVersion).toBe(expectedVersion)
		})

		it('throws if unsupported response format', async () => {
			mockedFetch.mockResolvedValueOnce({
				ok: true,
				status: 200,
				json: () =>
					Promise.resolve({
						new_version_structure: {
							major: 5,
							minor: 2,
							patch: 7,
							text: '5.2.7',
							build: 'experimental',
						},
					}),
			} as Response)
			await expect(detectVersion(DEFAULT_URL)).rejects.toThrow()
		})

		it('returns undefined on HTTP 404', async () => {
			mockedFetch.mockResolvedValueOnce({
				ok: false,
				status: 404,
				statusText: 'not found',
			} as Response)
			const actualVersion = await detectVersion(DEFAULT_URL)
			expect(actualVersion).toBe(undefined)
		})

		it('throws on other HTTP errors', async () => {
			const fakeResponses = [
				{ ok: false, status: 400, statusText: 'bad request' },
				{ ok: false, status: 403, statusText: 'forbidden' },
				{ ok: false, status: 405, statusText: 'method not allowed' },
				{ ok: false, status: 406, statusText: 'not acceptable' },
				{ ok: false, status: 408, statusText: 'request timeout' },
				{ ok: false, status: 500, statusText: 'internal server error' },
				{ ok: false, status: 501, statusText: 'not implemented' },
				{ ok: false, status: 502, statusText: 'bad gateway' },
				{ ok: false, status: 503, statusText: 'service unavailable' },
			]
			for (const r of fakeResponses) {
				mockedFetch.mockResolvedValueOnce(r as Response)
				await expect(detectVersion(DEFAULT_URL)).rejects.toThrow()
			}
		})

		it('throws if URL is falsy', async () => {
			const urls = [null, undefined, '']
			expect.assertions(urls.length)
			for (const u of urls) {
				await expect(detectVersion(u as string)).rejects.toThrow()
			}
		})
	})
})
