import { get, DEFAULT_TIMEOUT } from './httputil'

import { fetchWithTimeout } from '../../http'
jest.mock('../../http')
const mockedFetchWithTimeout = fetchWithTimeout as jest.MockedFunction<
	typeof fetchWithTimeout
>

describe('module httputil', () => {
	describe('function get', () => {
		beforeEach(() => {
			mockedFetchWithTimeout.mockClear()
			mockedFetchWithTimeout.mockResolvedValueOnce({
				json: () =>
					Promise.resolve({
						name: 'John',
						email: 'jdoe@example.org',
					}),
			} as Response)
		})

		it('uses correct URL', async () => {
			const url = 'http://example.org/test'
			await get(url)
			expect(mockedFetchWithTimeout).toHaveBeenCalledTimes(1)
			expect(mockedFetchWithTimeout.mock.calls[0][0]).toBe(url)
		})

		it('uses method GET', async () => {
			const url = 'http://example.org/test'
			await get(url)
			const fetchOpts = mockedFetchWithTimeout.mock.calls[0][1]
			expect(fetchOpts).toBeDefined()
			expect(fetchOpts.method).toBe('GET')
		})

		it('sets correct accept header', async () => {
			const url = 'http://example.org/test'
			await get(url)
			const fetchOpts = mockedFetchWithTimeout.mock.calls[0][1]
			expect(fetchOpts).toBeDefined()
			expect(fetchOpts.headers).toBeDefined()
			expect(fetchOpts.headers).toHaveProperty('Accept')
			expect((fetchOpts.headers as Record<string, string>).Accept).toBe(
				'application/json'
			)
		})

		it('uses DEFAULT_TIMEOUT by default', async () => {
			const url = 'http://example.org/test'
			await get(url)
			const timeout = mockedFetchWithTimeout.mock.calls[0][2]
			expect(timeout).toBe(DEFAULT_TIMEOUT)
		})

		it('will override DEFAULT_TIMEOUT if specified', async () => {
			const url = 'http://example.org/test'
			await get(url, 60000)
			const timeout = mockedFetchWithTimeout.mock.calls[0][2]
			expect(timeout).toBe(60000)
		})

		it('returns the json from the response', async () => {
			const url = 'http://example.org/test'
			const result = await get(url)
			expect(result).toEqual({ name: 'John', email: 'jdoe@example.org' })
		})
	})
})
