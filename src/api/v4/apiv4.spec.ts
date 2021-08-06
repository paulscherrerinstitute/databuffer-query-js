import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

import { DataApiV4Client } from './apiv4'
import * as httpRequest from '../../http-request'

describe('class DataApiV4Client', () => {
	const BASE_URL = 'https://example.org/data-api/v4'
	let api: DataApiV4Client

	beforeEach(() => {
		api = new DataApiV4Client(BASE_URL)
	})

	afterEach(() => {
		sinon.restore()
	})

	describe('method listBackends', () => {
		it('sends a GET request to the right URL', async () => {
			const fakeAnswer = { backends: ['a', 'b', 'c'] }
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httpRequest, 'get', fake)
			const expectedUrl = `${BASE_URL}/backends`
			await api.listBackends()
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(expectedUrl)
		})
	})

	describe('method searchChannels', () => {
		it('sends a GET request to the right URL', async () => {
			const fakeAnswer = { channels: [] }
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httpRequest, 'get', fake)
			const expectedUrlStart = `${BASE_URL}/search/channel?`
			await api.searchChannels({})
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.be.a('string')
			const actualUrl = fake.args[0][0] as string
			expect(actualUrl.startsWith(expectedUrlStart))
		})

		it('adds searchOptions to the URL', async () => {
			const fakeAnswer = { channels: [] }
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httpRequest, 'get', fake)
			const expectedUrlStart = `${BASE_URL}/search/channel?`
			await api.searchChannels({
				nameRegex: 'a',
				sourceRegex: 'b',
				descriptionRegex: 'c',
			})
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.be.a('string')
			const actualUrl = fake.args[0][0] as string
			expect(actualUrl.startsWith(expectedUrlStart))
			const u = new URL(actualUrl)
			const searchParams = new URLSearchParams(u.search)
			expect(searchParams.get('nameRegex')).to.equal('a')
			expect(searchParams.get('sourceRegex')).to.equal('b')
			expect(searchParams.get('descriptionRegex')).to.equal('c')
		})
	})

	describe('method queryEvents', () => {
		it('sends a GET request to the right URL', async () => {
			const fakeAnswer = { tsAnchor: 0, tsMs: [], tsNs: [], values: [] }
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httpRequest, 'get', fake)
			const expectedUrlStart = `${BASE_URL}/events?`
			await api.queryEvents({
				channelBackend: 'b',
				channelName: 'a',
				begDate: '2021-08-05T07:00:00Z',
				endDate: '2021-08-05T09:00:00Z',
			})
			const actualUrl = fake.args[0][0] as string
			expect(actualUrl.startsWith(expectedUrlStart))
			const u = new URL(actualUrl)
			const searchParams = new URLSearchParams(u.search)
			expect(searchParams.get('channelName')).to.equal('a')
			expect(searchParams.get('channelBackend')).to.equal('b')
			expect(searchParams.get('begDate')).to.equal('2021-08-05T07:00:00Z')
			expect(searchParams.get('endDate')).to.equal('2021-08-05T09:00:00Z')
		})
	})

	describe('method queryBinned', () => {
		it('sends a GET request to the right URL', async () => {
			const fakeAnswer = {
				tsAnchor: 0,
				tsMs: [],
				tsNs: [],
				counts: [],
				avgs: [],
				mins: [],
				maxs: [],
			}
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httpRequest, 'get', fake)
			const expectedUrlStart = `${BASE_URL}/binned?`
			await api.queryBinned({
				channelBackend: 'b',
				channelName: 'a',
				begDate: '2021-08-05T07:00:00Z',
				endDate: '2021-08-05T09:00:00Z',
				binCount: 100,
				binningScheme: 'binnedX',
				binnedXcount: 10,
			})
			const actualUrl = fake.args[0][0] as string
			expect(actualUrl.startsWith(expectedUrlStart))
			const u = new URL(actualUrl)
			const searchParams = new URLSearchParams(u.search)
			expect(searchParams.get('channelName')).to.equal('a')
			expect(searchParams.get('channelBackend')).to.equal('b')
			expect(searchParams.get('begDate')).to.equal('2021-08-05T07:00:00Z')
			expect(searchParams.get('endDate')).to.equal('2021-08-05T09:00:00Z')
			expect(searchParams.get('binCount')).to.equal('100')
			expect(searchParams.get('binningScheme')).to.equal('binnedX')
			expect(searchParams.get('binnedXcount')).to.equal('10')
		})
	})
})
