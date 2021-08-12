import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

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

import * as httputil from '../httputil'

const DEFAULT_URL = 'http://localhost:8080'

describe('module parameters-query', () => {
	afterEach(() => {
		sinon.restore()
	})

	describe('query aggregations', () => {
		it('sends out a GET request to the right URL', async () => {
			const fake = sinon.fake()
			sinon.replace(httputil, 'get', fake)
			const expectedUrl = `${DEFAULT_URL}/params/aggregations`
			await queryAggregations(DEFAULT_URL)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['min', 'max', 'mean']
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httputil, 'get', fake)
			const response = await queryAggregations(DEFAULT_URL)
			expect(response).to.be.an('array').with.length(3)
			expect(response).to.deep.equal(fakeAnswer)
		})
	})

	describe('query backends', () => {
		it('sends out a GET request to the right URL', async () => {
			const fake = sinon.fake()
			sinon.replace(httputil, 'get', fake)
			const expectedUrl = `${DEFAULT_URL}/params/backends`
			await queryBackends(DEFAULT_URL)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = [
				'backend1',
				'backend2',
				'backend3',
			]
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httputil, 'get', fake)
			const response = await queryBackends(DEFAULT_URL)
			expect(response).to.be.an('array').with.length(3)
			expect(response).to.deep.equal(fakeAnswer)
		})
	})

	describe('query compression', () => {
		it('sends out a GET request to the right URL', async () => {
			const fake = sinon.fake()
			sinon.replace(httputil, 'get', fake)
			const expectedUrl = `${DEFAULT_URL}/params/compression`
			await queryCompression(DEFAULT_URL)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['none', 'gzip']
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httputil, 'get', fake)
			const response = await queryCompression(DEFAULT_URL)
			expect(response).to.be.an('array').with.length(2)
			expect(response).to.deep.equal(fakeAnswer)
		})
	})

	describe('query config fields', () => {
		it('sends out a GET request to the right URL', async () => {
			const fake = sinon.fake()
			sinon.replace(httputil, 'get', fake)
			const expectedUrl = `${DEFAULT_URL}/params/configfields`
			await queryConfigFields(DEFAULT_URL)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['a', 'b', 'c']
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httputil, 'get', fake)
			const response = await queryConfigFields(DEFAULT_URL)
			expect(response).to.be.an('array').with.length(3)
			expect(response).to.deep.equal(fakeAnswer)
		})
	})

	describe('query event fields', () => {
		it('sends out a GET request to the right URL', async () => {
			const fake = sinon.fake()
			sinon.replace(httputil, 'get', fake)
			const expectedUrl = `${DEFAULT_URL}/params/eventfields`
			await queryEventFields(DEFAULT_URL)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['a', 'b', 'c']
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httputil, 'get', fake)
			const response = await queryEventFields(DEFAULT_URL)
			expect(response).to.be.an('array').with.length(3)
			expect(response).to.deep.equal(fakeAnswer)
		})
	})

	describe('query ordering', () => {
		it('sends out a GET request to the right URL', async () => {
			const fake = sinon.fake()
			sinon.replace(httputil, 'get', fake)
			const expectedUrl = `${DEFAULT_URL}/params/ordering`
			await queryOrdering(DEFAULT_URL)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['none', 'asc', 'desc']
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httputil, 'get', fake)
			const response = await queryOrdering(DEFAULT_URL)
			expect(response).to.be.an('array').with.length(3)
			expect(response).to.deep.equal(fakeAnswer)
		})
	})

	describe('query response formats', () => {
		it('sends out a GET request to the right URL', async () => {
			const fake = sinon.fake()
			sinon.replace(httputil, 'get', fake)
			const expectedUrl = `${DEFAULT_URL}/params/responseformat`
			await queryResponseFormats(DEFAULT_URL)
			expect(fake.callCount).to.equal(1)
			expect(fake.args[0][0]).to.equal(expectedUrl)
		})

		it('parses the response correctly', async () => {
			const fakeAnswer: ParametersResponse = ['a', 'b', 'c']
			const fake = sinon.fake.resolves(fakeAnswer)
			sinon.replace(httputil, 'get', fake)
			const response = await queryResponseFormats(DEFAULT_URL)
			expect(response).to.be.an('array').with.length(3)
			expect(response).to.deep.equal(fakeAnswer)
		})
	})
})
