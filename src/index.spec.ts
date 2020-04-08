import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

import { QueryRest } from '../src'
import * as qChNames from '../src/query-channel-names'
import * as qData from '../src/query-data'

const DEFAULT_URL = 'http://localhost:8080'

describe('class QueryRest', () => {
	afterEach(() => {
		sinon.restore()
	})

	it('uses the URL of the constructor', () => {
		const qr = new QueryRest(DEFAULT_URL)
		expect(qr.url).to.equal(DEFAULT_URL)
	})

	it('can set the URL as a property', () => {
		const qr = new QueryRest(DEFAULT_URL)
		qr.url = 'http://api.example.com'
		expect(qr.url).to.equal('http://api.example.com')
	})

	describe('queryChannelNames', () => {
		it('uses this.url', async () => {
			const fake = sinon.fake()
			sinon.replace(qChNames, 'queryChannelNames', fake)
			const qr = new QueryRest(DEFAULT_URL)
			await qr.queryChannelNames({})
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(DEFAULT_URL)
		})

		it('passes queryOptions', async () => {
			const qr = new QueryRest(DEFAULT_URL)
			const options: qChNames.QueryOptions = {
				backends: ['backend1', 'backend2'],
				ordering: qChNames.Ordering.ASC,
				regex: '^sineg',
				reload: true,
			}
			const fake = sinon.fake()
			sinon.replace(qChNames, 'queryChannelNames', fake)
			await qr.queryChannelNames(options)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0]).to.be.an('array').with.length(2)
			expect(fake.args[0][1]).to.deep.equal(options)
		})
	})

	describe('queryData', () => {
		it('uses this.url', async () => {
			const fake = sinon.fake()
			sinon.replace(qData, 'queryData', fake)
			const qr = new QueryRest(DEFAULT_URL)
			await qr.queryData({} as qData.QueryRequest)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(DEFAULT_URL)
		})

		it('passes queryRequest', async () => {
			const fake = sinon.fake()
			sinon.replace(qData, 'queryData', fake)
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
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][1]).to.deep.equal(options)
		})
	})
})
