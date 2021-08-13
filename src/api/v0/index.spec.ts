import { QueryRest } from './index'
import type { DataQuery, ChannelNamesQuery, ChannelConfigsQuery } from './index'
// import * as qChConfigs from './query-channel-configs'
// import * as qChNames from './query-channel-names'
// import * as qData from './query-data'
import { queryChannelConfigs, Ordering } from './query-channel-configs'
jest.mock('./query-channel-configs')
const mockedQueryChannelConfigs = queryChannelConfigs as jest.MockedFunction<
	typeof queryChannelConfigs
>
import { queryChannelNames } from './query-channel-names'
const mockedQueryChannelNames = queryChannelNames as jest.MockedFunction<
	typeof queryChannelNames
>
jest.mock('./query-channel-names')
import { queryData, ConfigField, EventField } from './query-data'
const mockedQueryData = queryData as jest.MockedFunction<typeof queryData>
jest.mock('./query-data')

const DEFAULT_URL = 'http://localhost:8080'

describe('class QueryRest', () => {
	beforeEach(() => {
		mockedQueryChannelConfigs.mockClear()
		mockedQueryChannelNames.mockClear()
		mockedQueryData.mockClear()
	})

	it('uses the URL of the constructor', () => {
		const qr = new QueryRest(DEFAULT_URL)
		expect(qr.url).toBe(DEFAULT_URL)
	})

	it('can set the URL as a property', () => {
		const qr = new QueryRest(DEFAULT_URL)
		qr.url = 'http://api.example.com'
		expect(qr.url).toBe('http://api.example.com')
	})

	describe('queryChannelConfigs', () => {
		it('uses this.url', async () => {
			const qr = new QueryRest(DEFAULT_URL)
			await qr.queryChannelConfigs({})
			expect(mockedQueryChannelConfigs).toHaveBeenCalledTimes(1)
			expect(mockedQueryChannelConfigs.mock.calls[0][0]).toBe(DEFAULT_URL)
		})

		it('passes queryOptions', async () => {
			const qr = new QueryRest(DEFAULT_URL)
			const query: ChannelConfigsQuery = {
				backends: ['backend1', 'backend2'],
				ordering: Ordering.ASC,
				regex: '^sineg',
				sourceRegex: 'LLRF',
			}
			await qr.queryChannelConfigs(query)
			expect(mockedQueryChannelConfigs).toHaveBeenCalledTimes(1)
			expect(Array.isArray(mockedQueryChannelConfigs.mock.calls[0])).toBe(true)
			expect(mockedQueryChannelConfigs.mock.calls[0].length).toBe(2)
			expect(mockedQueryChannelConfigs.mock.calls[0][1]).toEqual(query)
		})
	})

	describe('queryChannelNames', () => {
		it('uses this.url', async () => {
			const qr = new QueryRest(DEFAULT_URL)
			await qr.queryChannelNames({})
			expect(mockedQueryChannelNames).toHaveBeenCalledTimes(1)
			expect(mockedQueryChannelNames.mock.calls[0][0]).toBe(DEFAULT_URL)
		})

		it('passes queryOptions', async () => {
			const qr = new QueryRest(DEFAULT_URL)
			const query: ChannelNamesQuery = {
				backends: ['backend1', 'backend2'],
				ordering: Ordering.ASC,
				regex: '^sineg',
				reload: true,
			}
			await qr.queryChannelNames(query)
			expect(mockedQueryChannelNames).toHaveBeenCalledTimes(1)
			expect(Array.isArray(mockedQueryChannelNames.mock.calls[0])).toBe(true)
			expect(mockedQueryChannelNames.mock.calls[0].length).toBe(2)
			expect(mockedQueryChannelNames.mock.calls[0][1]).toEqual(query)
		})
	})

	describe('queryData', () => {
		it('uses this.url', async () => {
			const qr = new QueryRest(DEFAULT_URL)
			await qr.queryData({} as DataQuery)
			expect(mockedQueryData).toHaveBeenCalledTimes(1)
			expect(mockedQueryData.mock.calls[0][0]).toBe(DEFAULT_URL)
		})

		it('passes queryRequest', async () => {
			const qr = new QueryRest(DEFAULT_URL)
			const query: DataQuery = {
				channels: [
					{ backend: 'backend1', name: 'chan1' },
					{ backend: 'backend2', name: 'chan2' },
				],
				configFields: [ConfigField.GLOBAL_MILLIS, ConfigField.TYPE],
				eventFields: [
					EventField.GLOBAL_MILLIS,
					EventField.PULSE_ID,
					EventField.VALUE,
				],
				range: {
					startPulseId: 1,
					endPulseId: 2,
				},
			}
			await qr.queryData(query)
			expect(mockedQueryData).toHaveBeenCalledTimes(1)
			expect(mockedQueryData.mock.calls[0][1]).toEqual(query)
		})
	})
})
