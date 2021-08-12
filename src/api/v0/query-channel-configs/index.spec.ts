import { queryChannelConfigs, Ordering } from './index'
import type { ChannelConfigsQuery, ChannelConfigsResponse } from './index'

import * as httputil from '../httputil'

const DEFAULT_URL = 'http://localhost:8080'

describe('module query-channel-config', () => {
	afterEach(() => {
		sinon.restore()
	})

	it('sends out a POST request to the right URL', async () => {
		const fake = sinon.fake()
		sinon.replace(httputil, 'post', fake)
		const expectedUrl = `${DEFAULT_URL}/channels/config`
		const options = {}
		await queryChannelConfigs(DEFAULT_URL, options)
		expect(fake.callCount).toBe(1)
		expect(fake.args[0][0]).toBe(expectedUrl)
	})

	it('sends the queryOptions in the body of the request', async () => {
		const fake = sinon.fake()
		sinon.replace(httputil, 'post', fake)
		const queryOptions: ChannelConfigsQuery = {
			backends: ['backend1', 'backend2'],
			ordering: Ordering.ASC,
			regex: '^sineg',
			sourceRegex: 'LLRF',
		}
		await queryChannelConfigs(DEFAULT_URL, queryOptions)
		expect(fake.callCount).toBe(1)
		expect(fake.args[0][1]).toEqual(queryOptions)
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
		const fake = sinon.fake.resolves(fakeAnswer)
		sinon.replace(httputil, 'post', fake)
		const response = await queryChannelConfigs(DEFAULT_URL, options)
		expect(response).to.be.an('array').toHaveLength(3)
		expect(response).toEqual(fakeAnswer)
	})
})
