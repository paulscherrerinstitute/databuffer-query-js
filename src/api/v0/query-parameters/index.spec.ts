import {
	queryAggregations,
	queryBackends,
	queryCompression,
	queryConfigFields,
	queryEventFields,
	queryOrdering,
	queryResponseFormats,
} from './index'
import type { ParametersResponse } from './index'

import { get } from '../httputil'
jest.mock('../httputil')
const mockedGet = get as jest.MockedFunction<typeof get>

const DEFAULT_URL = 'http://localhost:8080'

describe('module parameters-query', () => {
	beforeEach(() => {
		mockedGet.mockClear()
		mockedGet.mockResolvedValue({ json: () => Promise.resolve([]) } as Response)
	})

	describe('query aggregations', () => {
		it('sends out a GET request to the right URL', async () => {
			const expectedUrl = `${DEFAULT_URL}/params/aggregations`
			await queryAggregations(DEFAULT_URL)
			expect(mockedGet).toHaveBeenCalledTimes(1)
			expect(mockedGet.mock.calls[0][0]).toBe(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['min', 'max', 'mean']
			mockedGet.mockResolvedValueOnce({
				json: () => Promise.resolve(fakeAnswer),
			} as Response)
			const response = await queryAggregations(DEFAULT_URL)
			expect(Array.isArray(response)).toBe(true)
			expect(response.length).toBe(3)
			expect(response).toEqual(fakeAnswer)
		})
	})

	describe('query backends', () => {
		it('sends out a GET request to the right URL', async () => {
			const expectedUrl = `${DEFAULT_URL}/params/backends`
			await queryBackends(DEFAULT_URL)
			expect(mockedGet).toHaveBeenCalledTimes(1)
			expect(mockedGet.mock.calls[0][0]).toBe(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = [
				'backend1',
				'backend2',
				'backend3',
			]
			mockedGet.mockResolvedValueOnce({
				json: () => Promise.resolve(fakeAnswer),
			} as Response)
			const response = await queryBackends(DEFAULT_URL)
			expect(Array.isArray(response)).toBe(true)
			expect(response.length).toBe(3)
			expect(response).toEqual(fakeAnswer)
		})
	})

	describe('query compression', () => {
		it('sends out a GET request to the right URL', async () => {
			const expectedUrl = `${DEFAULT_URL}/params/compression`
			await queryCompression(DEFAULT_URL)
			expect(mockedGet).toHaveBeenCalledTimes(1)
			expect(mockedGet.mock.calls[0][0]).toBe(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['none', 'gzip']
			mockedGet.mockResolvedValueOnce({
				json: () => Promise.resolve(fakeAnswer),
			} as Response)
			const response = await queryCompression(DEFAULT_URL)
			expect(Array.isArray(response)).toBe(true)
			expect(response.length).toBe(2)
			expect(response).toEqual(fakeAnswer)
		})
	})

	describe('query config fields', () => {
		it('sends out a GET request to the right URL', async () => {
			const expectedUrl = `${DEFAULT_URL}/params/configfields`
			await queryConfigFields(DEFAULT_URL)
			expect(mockedGet).toHaveBeenCalledTimes(1)
			expect(mockedGet.mock.calls[0][0]).toBe(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['a', 'b', 'c']
			mockedGet.mockResolvedValueOnce({
				json: () => Promise.resolve(fakeAnswer),
			} as Response)
			const response = await queryConfigFields(DEFAULT_URL)
			expect(Array.isArray(response)).toBe(true)
			expect(response.length).toBe(3)
			expect(response).toEqual(fakeAnswer)
		})
	})

	describe('query event fields', () => {
		it('sends out a GET request to the right URL', async () => {
			const expectedUrl = `${DEFAULT_URL}/params/eventfields`
			await queryEventFields(DEFAULT_URL)
			expect(mockedGet).toHaveBeenCalledTimes(1)
			expect(mockedGet.mock.calls[0][0]).toBe(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['a', 'b', 'c']
			mockedGet.mockResolvedValueOnce({
				json: () => Promise.resolve(fakeAnswer),
			} as Response)
			const response = await queryEventFields(DEFAULT_URL)
			expect(Array.isArray(response)).toBe(true)
			expect(response.length).toBe(3)
			expect(response).toEqual(fakeAnswer)
		})
	})

	describe('query ordering', () => {
		it('sends out a GET request to the right URL', async () => {
			const expectedUrl = `${DEFAULT_URL}/params/ordering`
			await queryOrdering(DEFAULT_URL)
			expect(mockedGet).toHaveBeenCalledTimes(1)
			expect(mockedGet.mock.calls[0][0]).toBe(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['none', 'asc', 'desc']
			mockedGet.mockResolvedValueOnce({
				json: () => Promise.resolve(fakeAnswer),
			} as Response)
			const response = await queryOrdering(DEFAULT_URL)
			expect(Array.isArray(response)).toBe(true)
			expect(response.length).toBe(3)
			expect(response).toEqual(fakeAnswer)
		})
	})

	describe('query response formats', () => {
		it('sends out a GET request to the right URL', async () => {
			const expectedUrl = `${DEFAULT_URL}/params/responseformat`
			await queryResponseFormats(DEFAULT_URL)
			expect(mockedGet).toHaveBeenCalledTimes(1)
			expect(mockedGet.mock.calls[0][0]).toBe(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['a', 'b', 'c']
			mockedGet.mockResolvedValueOnce({
				json: () => Promise.resolve(fakeAnswer),
			} as Response)
			const response = await queryResponseFormats(DEFAULT_URL)
			expect(Array.isArray(response)).toBe(true)
			expect(response.length).toBe(3)
			expect(response).toEqual(fakeAnswer)
		})
	})
})
