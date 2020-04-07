import { QueryRest } from '../src'
import * as qChNames from '../src/query-channel-names'
import * as qData from '../src/query-data'

jest.mock('../src/query-channel-names')
jest.mock('../src/query-data')

const DEFAULT_URL = 'http://localhost:8080'

describe('class QueryRest', () => {
	it('uses the URL of the constructor', () => {
		const qr = new QueryRest(DEFAULT_URL)
		expect(qr.url).toEqual(DEFAULT_URL)
	})

	it('can set the URL as a property', () => {
		const qr = new QueryRest(DEFAULT_URL)
		qr.url = 'http://api.example.com'
		expect(qr.url).toEqual('http://api.example.com')
	})

	describe('queryChannelNames', () => {
		it('uses this.url', async () => {
			expect.hasAssertions()
			const qr = new QueryRest(DEFAULT_URL)
			await qr.queryChannelNames({})
			expect(qChNames.queryChannelNames).toBeCalledTimes(1)
			expect(
				(qChNames.queryChannelNames as jest.Mock).mock.calls[0][0]
			).toEqual(DEFAULT_URL)
		})

		it('passes queryOptions', async () => {
			expect.hasAssertions()
			const qr = new QueryRest(DEFAULT_URL)
			const options: qChNames.QueryOptions = {
				backends: ['backend1', 'backend2'],
				ordering: qChNames.Ordering.ASC,
				regex: '^sineg',
				reload: true,
			}
			await qr.queryChannelNames(options)
			expect(qChNames.queryChannelNames).toBeCalledTimes(1)
			expect(
				(qChNames.queryChannelNames as jest.Mock).mock.calls[0][1]
			).toEqual(options)
		})
	})

	describe('queryData', () => {
		it('uses this.url', async () => {
			expect.hasAssertions()
			const qr = new QueryRest(DEFAULT_URL)
			await qr.queryChannelNames({})
			expect(qChNames.queryChannelNames).toBeCalledTimes(1)
			expect(
				(qChNames.queryChannelNames as jest.Mock).mock.calls[0][0]
			).toEqual(DEFAULT_URL)
		})

		it('passes queryRequest', async () => {
			expect.hasAssertions()
			const qr = new QueryRest(DEFAULT_URL)
			const options: qData.QueryRequest = {
				channels: [
					{ backend: 'backend1', name: 'chan1' },
					{ backend: 'backend2', name: 'chan2' },
				],
				configFields: [qData.ConfigField.GLOBAL_MILLIS, qData.ConfigField.TYPE],
				eventFields: [
					qData.EventField.GLOBAL_MILLIS,
					qData.EventField.PULSE_ID,
					qData.EventField.VALUE,
				],
				range: {
					startPulseId: 1,
					endPulseId: 2,
				},
			}
			await qr.queryData(options)
			expect(qData.queryData).toBeCalledTimes(1)
			expect((qData.queryData as jest.Mock).mock.calls[0][1]).toEqual(options)
		})
	})
})
