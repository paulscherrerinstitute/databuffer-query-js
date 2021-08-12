import { describe, it } from 'mocha'
import sinon from 'sinon'

import * as apiv4Module from './apiv4'
import { DataApiV4Client } from './apiv4'

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
			sinon.replace(apiv4Module, 'get', fake)
			const expectedUrl = `${BASE_URL}/backends`
			await api.listBackends()
			expect(fake.callCount).toBe(1)
			expect(fake.args[0][0]).toBe(expectedUrl)
		})
	})

	describe('method searchChannels', () => {
		it('sends a GET request to the right URL', async () => {
			const fakeAnswer = { channels: [] }
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(apiv4Module, 'get', fake)
			const expectedUrlStart = `${BASE_URL}/search/channel?`
			await api.searchChannels({})
			expect(fake.callCount).toBe(1)
			expect(fake.args[0][0]).toBeInstanceOf('string')
			const actualUrl = fake.args[0][0] as string
			expect(actualUrl.startsWith(expectedUrlStart))
		})

		it('adds searchOptions to the URL', async () => {
			const fakeAnswer = { channels: [] }
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(apiv4Module, 'get', fake)
			const expectedUrlStart = `${BASE_URL}/search/channel?`
			await api.searchChannels({
				nameRegex: 'a',
				sourceRegex: 'b',
				descriptionRegex: 'c',
			})
			expect(fake.callCount).toBe(1)
			expect(fake.args[0][0]).toBeInstanceOf('string')
			const actualUrl = fake.args[0][0] as string
			expect(actualUrl.startsWith(expectedUrlStart))
			const u = new URL(actualUrl)
			const searchParams = new URLSearchParams(u.search)
			expect(searchParams.get('nameRegex')).toBe('a')
			expect(searchParams.get('sourceRegex')).toBe('b')
			expect(searchParams.get('descriptionRegex')).toBe('c')
		})
	})

	describe('method queryEvents', () => {
		it('sends a GET request to the right URL', async () => {
			const fakeAnswer = { tsAnchor: 0, tsMs: [], tsNs: [], values: [] }
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(apiv4Module, 'get', fake)
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
			expect(searchParams.get('channelName')).toBe('a')
			expect(searchParams.get('channelBackend')).toBe('b')
			expect(searchParams.get('begDate')).toBe('2021-08-05T07:00:00Z')
			expect(searchParams.get('endDate')).toBe('2021-08-05T09:00:00Z')
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
			sinon.replace(apiv4Module, 'get', fake)
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
			expect(searchParams.get('channelName')).toBe('a')
			expect(searchParams.get('channelBackend')).toBe('b')
			expect(searchParams.get('begDate')).toBe('2021-08-05T07:00:00Z')
			expect(searchParams.get('endDate')).toBe('2021-08-05T09:00:00Z')
			expect(searchParams.get('binCount')).toBe('100')
			expect(searchParams.get('binningScheme')).toBe('binnedX')
			expect(searchParams.get('binnedXcount')).toBe('10')
		})
	})
})
