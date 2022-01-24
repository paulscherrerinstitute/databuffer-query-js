import { queryChannelNames, Ordering } from './index'
import type { ChannelNamesQuery, ChannelNamesResponse } from './index'

import { post } from '../httputil'
jest.mock('../httputil')
const mockedPost = post as jest.MockedFunction<typeof post>

const DEFAULT_URL = 'http://localhost:8080'

describe('query-channel-names', () => {
	beforeEach(() => {
		mockedPost.mockClear()
		mockedPost.mockResolvedValue({
			json: () => Promise.resolve([]),
		} as Response)
	})

	it('sends out a POST request to the right URL', async () => {
		const expectedUrl = `${DEFAULT_URL}/channels`
		const options = {}
		await queryChannelNames(DEFAULT_URL, options)
		expect(mockedPost).toHaveBeenCalledTimes(1)
		expect(mockedPost.mock.calls[0][0]).toBe(expectedUrl)
	})

	it('sends the queryOptions in the body of the request', async () => {
		const queryOptions: ChannelNamesQuery = {
			backends: ['backend1', 'backend2'],
			ordering: Ordering.ASC,
			regex: '^sineg',
			reload: true,
		}
		await queryChannelNames(DEFAULT_URL, queryOptions)
		expect(mockedPost.mock.calls[0][1]).toEqual(queryOptions)
	})

	it('parses the response correctly', async () => {
		const options = {}
		const fakeAnswer: ChannelNamesResponse = [
			{ backend: 'backend1', channels: ['chan11', 'chan12', 'chan13'] },
			{ backend: 'backend2', channels: ['chan21', 'chan22', 'chan23'] },
			{ backend: 'backend3', channels: ['chan31', 'chan32', 'chan33'] },
		]
		mockedPost.mockResolvedValueOnce({
			json: () => Promise.resolve(fakeAnswer),
		} as Response)
		const response = await queryChannelNames(DEFAULT_URL, options)
		expect(Array.isArray(response)).toBe(true)
		expect(response.length).toBe(3)
		expect(response).toEqual(fakeAnswer)
	})
})
