import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

import { QueryRest } from './index'
import type { DataQuery, ChannelNamesQuery, ChannelConfigsQuery } from './index'
import * as qChConfigs from './query-channel-configs'
import * as qChNames from './query-channel-names'
import * as qData from './query-data'

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

	describe('queryChannelConfigs', () => {
		it('uses this.url', async () => {
			const fake = sinon.fake()
			sinon.replace(qChConfigs, 'queryChannelConfigs', fake)
			const qr = new QueryRest(DEFAULT_URL)
			await qr.queryChannelConfigs({})
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(DEFAULT_URL)
		})

		it('passes queryOptions', async () => {
			const qr = new QueryRest(DEFAULT_URL)
			const query: ChannelConfigsQuery = {
				backends: ['backend1', 'backend2'],
				ordering: qChConfigs.Ordering.ASC,
				regex: '^sineg',
				sourceRegex: 'LLRF',
			}
			const fake = sinon.fake()
			sinon.replace(qChConfigs, 'queryChannelConfigs', fake)
			await qr.queryChannelConfigs(query)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0]).to.be.an('array').with.length(2)
			expect(fake.args[0][1]).to.deep.equal(query)
		})
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
			const query: ChannelNamesQuery = {
				backends: ['backend1', 'backend2'],
				ordering: qChNames.Ordering.ASC,
				regex: '^sineg',
				reload: true,
			}
			const fake = sinon.fake()
			sinon.replace(qChNames, 'queryChannelNames', fake)
			await qr.queryChannelNames(query)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0]).to.be.an('array').with.length(2)
			expect(fake.args[0][1]).to.deep.equal(query)
		})
	})

	describe('queryData', () => {
		it('uses this.url', async () => {
			const fake = sinon.fake()
			sinon.replace(qData, 'queryData', fake)
			const qr = new QueryRest(DEFAULT_URL)
			await qr.queryData({} as DataQuery)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(DEFAULT_URL)
		})

		it('passes queryRequest', async () => {
			const fake = sinon.fake()
			sinon.replace(qData, 'queryData', fake)
			const qr = new QueryRest(DEFAULT_URL)
			const query: DataQuery = {
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
			await qr.queryData(query)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][1]).to.deep.equal(query)
		})
	})
})
