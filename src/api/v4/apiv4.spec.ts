/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
	DataApiV4BinnedQueryOptions,
	DataApiV4BinnedQueryResult,
	DataApiV4ChannelSearchOptions,
	DataApiV4ChannelSearchResult,
	DataApiV4Client,
	DataApiV4DataApiVersionResult,
	DataApiV4EventsQueryOptions,
	DataApiV4EventsQueryResult,
} from './apiv4'
import { get, DEFAULT_TIMEOUT } from './httputil'
jest.mock('./httputil')
const mockedGet = get as jest.MockedFunction<typeof get>

describe('class DataApiV4Client', () => {
	const BASE_URL = 'https://example.org/data-api/v4'
	let api: DataApiV4Client

	beforeEach(() => {
		api = new DataApiV4Client(BASE_URL)
		mockedGet.mockClear()
	})

	describe('method listBackends', () => {
		const DUMMY_RESPONSE = { backends: ['a', 'b', 'c'] }

		beforeEach(() => {
			mockedGet.mockResolvedValue(DUMMY_RESPONSE)
		})

		it('sends a GET request to the right URL', async () => {
			const expectedUrl = `${BASE_URL}/backends`
			await api.listBackends()
			expect(mockedGet).toHaveBeenCalledTimes(1)
			expect(mockedGet.mock.calls[0][0]).toBe(expectedUrl)
		})

		it('uses DEFAULT_TIMEOUT if not specified', async () => {
			await api.listBackends()
			expect(mockedGet.mock.calls[0][1]).toBe(DEFAULT_TIMEOUT)
		})

		it('overrides DEFAULT_TIMEOUT if specified', async () => {
			await api.listBackends(60000)
			expect(mockedGet.mock.calls[0][1]).toBe(60000)
		})

		it('returns backends', async () => {
			const result = await api.listBackends()
			expect(result).toEqual(DUMMY_RESPONSE)
		})
	})

	describe('method searchChannels', () => {
		const DUMMY_QUERY: DataApiV4ChannelSearchOptions = {
			nameRegex: 'a',
			sourceRegex: 'b',
			descriptionRegex: 'c',
		}
		const DUMMY_RESPONSE: DataApiV4ChannelSearchResult = {
			channels: [
				{ backend: 'be1', name: 'ch1' },
				{ backend: 'be2', name: 'ch2' },
				{ backend: 'be3', name: 'ch3' },
			],
		}
		beforeEach(() => {
			mockedGet.mockResolvedValue(DUMMY_RESPONSE)
		})

		it('sends a GET request to the right URL', async () => {
			const expectedUrlStart = `${BASE_URL}/search/channel?`
			await api.searchChannels(DUMMY_QUERY)
			expect(mockedGet).toHaveBeenCalledTimes(1)
			const actualUrl = mockedGet.mock.calls[0][0] as string
			expect(actualUrl.startsWith(expectedUrlStart)).toBe(true)
		})

		it('uses DEFAULT_TIMEOUT if not specified', async () => {
			await api.searchChannels(DUMMY_QUERY)
			expect(mockedGet.mock.calls[0][1]).toBe(DEFAULT_TIMEOUT)
		})

		it('overrides DEFAULT_TIMEOUT if specified', async () => {
			await api.searchChannels(DUMMY_QUERY, 60000)
			expect(mockedGet.mock.calls[0][1]).toBe(60000)
		})

		it('adds searchOptions to the URL', async () => {
			await api.searchChannels(DUMMY_QUERY)
			const actualUrl = mockedGet.mock.calls[0][0] as string
			const u = new URL(actualUrl)
			const searchParams = new URLSearchParams(u.search)
			expect(searchParams.get('nameRegex')).toBe(DUMMY_QUERY.nameRegex)
			expect(searchParams.get('sourceRegex')).toBe(DUMMY_QUERY.sourceRegex)
			expect(searchParams.get('descriptionRegex')).toBe(
				DUMMY_QUERY.descriptionRegex
			)
		})

		it('returns search results', async () => {
			const results = await api.searchChannels({})
			expect(results).toEqual(DUMMY_RESPONSE)
		})
	})

	describe('method queryEvents', () => {
		const DUMMY_QUERY: DataApiV4EventsQueryOptions = {
			channelBackend: 'b',
			channelName: 'a',
			begDate: '2021-08-05T07:00:00Z',
			endDate: '2021-08-05T09:00:00Z',
		}
		const DUMMY_RESPONSE: DataApiV4EventsQueryResult = {
			tsAnchor: 0,
			tsMs: [],
			tsNs: [],
			values: [],
		}

		beforeEach(() => {
			mockedGet.mockResolvedValue(DUMMY_RESPONSE)
		})

		it('sends a GET request to the right URL', async () => {
			const expectedUrlStart = `${BASE_URL}/events?`
			await api.queryEvents(DUMMY_QUERY)
			expect(mockedGet).toHaveBeenCalledTimes(1)
			const actualUrl = mockedGet.mock.calls[0][0] as string
			expect(actualUrl.startsWith(expectedUrlStart)).toBe(true)
		})

		it('uses DEFAULT_TIMEOUT if not specified', async () => {
			await api.queryEvents(DUMMY_QUERY)
			expect(mockedGet.mock.calls[0][1]).toBe(DEFAULT_TIMEOUT)
		})

		it('overrides DEFAULT_TIMEOUT if specified', async () => {
			await api.queryEvents(DUMMY_QUERY, 60000)
			expect(mockedGet.mock.calls[0][1]).toBe(60000)
		})

		it('adds queryOptions to the URL', async () => {
			await api.queryEvents(DUMMY_QUERY)
			const actualUrl = mockedGet.mock.calls[0][0] as string
			const u = new URL(actualUrl)
			const searchParams = new URLSearchParams(u.search)
			expect(searchParams.get('channelName')).toBe(DUMMY_QUERY.channelName)
			expect(searchParams.get('channelBackend')).toBe(
				DUMMY_QUERY.channelBackend
			)
			expect(searchParams.get('begDate')).toBe(DUMMY_QUERY.begDate)
			expect(searchParams.get('endDate')).toBe(DUMMY_QUERY.endDate)
		})

		it('returns query events', async () => {
			const result = await api.queryEvents(DUMMY_QUERY)
			expect(result).toEqual(DUMMY_RESPONSE)
		})
	})

	describe('method queryBinned', () => {
		const DUMMY_QUERY: DataApiV4BinnedQueryOptions = {
			channelBackend: 'b',
			channelName: 'a',
			begDate: '2021-08-05T07:00:00Z',
			endDate: '2021-08-05T09:00:00Z',
			binCount: 100,
			binningScheme: 'binnedX',
			binnedXcount: 10,
		}
		const DUMMY_RESPONSE: DataApiV4BinnedQueryResult = {
			tsAnchor: 0,
			tsMs: [],
			tsNs: [],
			counts: [],
			avgs: [],
			mins: [],
			maxs: [],
		}

		beforeEach(() => {
			mockedGet.mockResolvedValue(DUMMY_RESPONSE)
		})

		it('sends a GET request to the right URL', async () => {
			const expectedUrlStart = `${BASE_URL}/binned?`
			await api.queryBinned(DUMMY_QUERY)
			expect(mockedGet).toHaveBeenCalledTimes(1)
			const actualUrl = mockedGet.mock.calls[0][0] as string
			expect(actualUrl.startsWith(expectedUrlStart)).toBe(true)
		})

		it('uses DEFAULT_TIMEOUT if not specified', async () => {
			await api.queryBinned(DUMMY_QUERY)
			expect(mockedGet.mock.calls[0][1]).toBe(DEFAULT_TIMEOUT)
		})

		it('overrides DEFAULT_TIMEOUT if specified', async () => {
			await api.queryBinned(DUMMY_QUERY, 60000)
			expect(mockedGet.mock.calls[0][1]).toBe(60000)
		})

		it('adds queryOptions to the URL', async () => {
			await api.queryBinned(DUMMY_QUERY)
			const actualUrl = mockedGet.mock.calls[0][0] as string
			const u = new URL(actualUrl)
			const searchParams = new URLSearchParams(u.search)
			expect(searchParams.get('channelName')).toBe(DUMMY_QUERY.channelName)
			expect(searchParams.get('channelBackend')).toBe(
				DUMMY_QUERY.channelBackend
			)
			expect(searchParams.get('begDate')).toBe(DUMMY_QUERY.begDate)
			expect(searchParams.get('endDate')).toBe(DUMMY_QUERY.endDate)
			expect(searchParams.get('binCount')).toBe(DUMMY_QUERY.binCount.toString())
			expect(searchParams.get('binningScheme')).toBe(DUMMY_QUERY.binningScheme)
			expect(searchParams.get('binnedXcount')).toBe(
				DUMMY_QUERY.binnedXcount?.toString()
			)
		})

		it('returns binned events', async () => {
			const result = await api.queryBinned(DUMMY_QUERY)
			expect(result).toEqual(DUMMY_RESPONSE)
		})
	})

	describe('method queryDataApiVersion', () => {
		const DUMMY_RESPONSE: DataApiV4DataApiVersionResult = {
			data_api_version: {
				major: 4,
				minor: 5,
			},
		}

		beforeEach(() => {
			mockedGet.mockResolvedValue(DUMMY_RESPONSE)
		})

		it('sends a GET request to the right URL', async () => {
			const expectedUrl = `${BASE_URL}/version`
			await api.queryDataApiVersion()
			expect(mockedGet).toHaveBeenCalledTimes(1)
			const actualUrl = mockedGet.mock.calls[0][0] as string
			expect(actualUrl).toEqual(expectedUrl)
		})

		it('uses DEFAULT_TIMEOUT if not specified', async () => {
			await api.queryDataApiVersion()
			expect(mockedGet.mock.calls[0][1]).toBe(DEFAULT_TIMEOUT)
		})

		it('overrides DEFAULT_TIMEOUT if specified', async () => {
			await api.queryDataApiVersion(60000)
			expect(mockedGet.mock.calls[0][1]).toBe(60000)
		})

		it('returns version events', async () => {
			const result = await api.queryDataApiVersion()
			expect(result).toEqual(DUMMY_RESPONSE)
		})
	})
})
