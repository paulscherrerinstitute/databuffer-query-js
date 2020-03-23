import {
	queryData,
	QueryRequest,
	QueryResponse,
	ConfigFields,
	EventFields,
} from '../src/query-data'
import { post } from '../src/http-request'

jest.mock('../src/http-request')

const DEFAULT_URL = 'http://localhost:8080'

const MINIMAL_OPTIONS: QueryRequest = {
	channels: [],
	configFields: [],
	eventFields: [],
	range: {
		startPulseId: 1,
		endPulseId: 2,
	},
}

describe('query-data', () => {
	it('sends out a POST request to the right URL', async () => {
		expect.hasAssertions()
		const expectedUrl = `${DEFAULT_URL}/query`
		await queryData(DEFAULT_URL, MINIMAL_OPTIONS)
		expect(post).toHaveBeenCalledTimes(1)
		expect((post as jest.Mock).mock.calls[0][0]).toEqual(expectedUrl)
	})

	it('sends the queryOptions in the body of the request', async () => {
		expect.hasAssertions()
		const options: QueryRequest = {
			channels: [
				{ backend: 'backend1', name: 'chan1' },
				{ backend: 'backend2', name: 'chan2' },
			],
			configFields: [ConfigFields.GLOBAL_MILLIS, ConfigFields.TYPE],
			eventFields: [
				EventFields.GLOBAL_MILLIS,
				EventFields.PULSE_ID,
				EventFields.VALUE,
			],
			range: {
				startPulseId: 1,
				endPulseId: 2,
			},
		}
		await queryData(DEFAULT_URL, options)
		expect(post).toHaveBeenCalledTimes(1)
		expect((post as jest.Mock).mock.calls[0][1]).toEqual(options)
	})

	it('parses the response correctly', async () => {
		expect.hasAssertions()
		const fakeAnswer: QueryResponse = [
			{
				channel: { backend: 'backend1', name: 'chan11' },
				data: [
					{ [EventFields.VALUE]: [11.0], [EventFields.GLOBAL_MILLIS]: 1100 },
					{ [EventFields.VALUE]: [11.1], [EventFields.GLOBAL_MILLIS]: 1110 },
					{ [EventFields.VALUE]: [11.2], [EventFields.GLOBAL_MILLIS]: 1120 },
					{ [EventFields.VALUE]: [11.3], [EventFields.GLOBAL_MILLIS]: 1130 },
				],
			},
			{
				channel: { backend: 'backend2', name: 'chan21' },
				data: [
					{ [EventFields.VALUE]: [21.0], [EventFields.GLOBAL_MILLIS]: 2100 },
					{ [EventFields.VALUE]: [21.1], [EventFields.GLOBAL_MILLIS]: 2110 },
					{ [EventFields.VALUE]: [21.2], [EventFields.GLOBAL_MILLIS]: 2120 },
					{ [EventFields.VALUE]: [21.3], [EventFields.GLOBAL_MILLIS]: 2130 },
				],
			},
		]
		;(post as jest.Mock).mockReturnValue(fakeAnswer)
		const response = await queryData(DEFAULT_URL, MINIMAL_OPTIONS)
		expect(response).toHaveLength(2)
		expect(response).toEqual(fakeAnswer)
	})
})
