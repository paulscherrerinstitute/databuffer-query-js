import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

import { queryData, ConfigField, EventField } from './index'
import type { DataQuery, DataResponse } from './index'

import * as httpRequest from '../http-request'

const DEFAULT_URL = 'http://localhost:8080'

const MINIMAL_OPTIONS: DataQuery = {
	channels: [],
	configFields: [],
	eventFields: [],
	range: {
		startPulseId: 1,
		endPulseId: 2,
	},
}

describe('query-data', () => {
	afterEach(() => {
		sinon.restore()
	})

	it('sends out a POST request to the right URL', async () => {
		const fake = sinon.fake()
		sinon.replace(httpRequest, 'post', fake)
		const expectedUrl = `${DEFAULT_URL}/query`
		await queryData(DEFAULT_URL, MINIMAL_OPTIONS)
		expect(fake.callCount).to.equal(1)
		expect(fake.args[0][0]).to.equal(expectedUrl)
	})

	it('sends the queryOptions in the body of the request', async () => {
		const fake = sinon.fake()
		sinon.replace(httpRequest, 'post', fake)
		const options: DataQuery = {
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
		await queryData(DEFAULT_URL, options)
		expect(fake.callCount).to.equal(1)
		expect(fake.args[0][1]).to.deep.equal(options)
	})

	it('parses the response correctly', async () => {
		const fakeAnswer: DataResponse = [
			{
				channel: { backend: 'backend1', name: 'chan11' },
				data: [
					{ [EventField.VALUE]: [11.0], [EventField.GLOBAL_MILLIS]: 1100 },
					{ [EventField.VALUE]: [11.1], [EventField.GLOBAL_MILLIS]: 1110 },
					{ [EventField.VALUE]: [11.2], [EventField.GLOBAL_MILLIS]: 1120 },
					{ [EventField.VALUE]: [11.3], [EventField.GLOBAL_MILLIS]: 1130 },
				],
			},
			{
				channel: { backend: 'backend2', name: 'chan21' },
				data: [
					{ [EventField.VALUE]: [21.0], [EventField.GLOBAL_MILLIS]: 2100 },
					{ [EventField.VALUE]: [21.1], [EventField.GLOBAL_MILLIS]: 2110 },
					{ [EventField.VALUE]: [21.2], [EventField.GLOBAL_MILLIS]: 2120 },
					{ [EventField.VALUE]: [21.3], [EventField.GLOBAL_MILLIS]: 2130 },
				],
			},
		]
		const fake = sinon.fake.resolves(fakeAnswer)
		sinon.replace(httpRequest, 'post', fake)
		const response = await queryData(DEFAULT_URL, MINIMAL_OPTIONS)
		expect(response).to.be.an('array').with.length(2)
		expect(response).to.deep.equal(fakeAnswer)
	})
})
