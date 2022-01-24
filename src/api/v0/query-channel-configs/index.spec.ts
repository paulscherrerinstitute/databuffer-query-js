import { queryChannelConfigs, Ordering } from './index'
import type { ChannelConfigsQuery, ChannelConfigsResponse } from './index'

import { post } from '../httputil'
jest.mock('../httputil')
const mockedPost = post as jest.MockedFunction<typeof post>

const DEFAULT_URL = 'http://localhost:8080'

describe('module query-channel-config', () => {
	beforeEach(() => {
		mockedPost.mockClear()
		mockedPost.mockResolvedValue({
			json: () => Promise.resolve([]),
		} as Response)
	})

	it('sends out a POST request to the right URL', async () => {
		const expectedUrl = `${DEFAULT_URL}/channels/config`
		const options = {}
		await queryChannelConfigs(DEFAULT_URL, options)
		expect(mockedPost).toHaveBeenCalledTimes(1)
		expect(mockedPost.mock.calls[0][0]).toBe(expectedUrl)
	})

	it('sends the queryOptions in the body of the request', async () => {
		const queryOptions: ChannelConfigsQuery = {
			backends: ['backend1', 'backend2'],
			ordering: Ordering.ASC,
			regex: '^sineg',
			sourceRegex: 'LLRF',
		}
		await queryChannelConfigs(DEFAULT_URL, queryOptions)
		expect(mockedPost.mock.calls[0][1]).toEqual(queryOptions)
	})

	it('parses the response correctly', async () => {
		const options = {}
		const fakeAnswer: ChannelConfigsResponse = [
			{
				backend: 'backend1',
				channels: [
					{
						source: 's1',
						backend: 'backend1',
						unit: 'W',
						description: 'foo bar 1',
						type: 'float32',
						shape: [1],
						name: 'chan11',
					},
					{
						source: 's1',
						backend: 'backend1',
						unit: 'A',
						description: 'foo bar 2',
						type: 'float32',
						shape: [1],
						name: 'chan12',
					},
					{
						source: 's1',
						backend: 'backend1',
						unit: 'V',
						description: 'foo bar 3',
						type: 'float32',
						shape: [1],
						name: 'chan13',
					},
				],
			},
			{
				backend: 'backend2',
				channels: [
					{
						source: 's1',
						backend: 'backend2',
						unit: 'kW',
						description: 'foo bar 4',
						type: 'float32',
						shape: [5],
						name: 'chan11',
					},
					{
						source: 's1',
						backend: 'backend1',
						unit: 'mA',
						description: 'foo bar 5',
						type: 'float32',
						shape: [4],
						name: 'chan12',
					},
					{
						source: 's1',
						backend: 'backend1',
						unit: 'mm',
						description: 'foo bar 6',
						type: 'float32',
						shape: [3],
						name: 'chan13',
					},
				],
			},
			{ backend: 'backend3', channels: [] },
		]
		mockedPost.mockResolvedValueOnce({
			json: () => Promise.resolve(fakeAnswer),
		} as Response)
		const response = await queryChannelConfigs(DEFAULT_URL, options)
		expect(Array.isArray(response)).toBe(true)
		expect(response.length).toBe(3)
		expect(response).toEqual(fakeAnswer)
	})
})
