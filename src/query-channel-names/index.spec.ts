import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'

import { queryChannelNames, Ordering } from './index'
import type { ChannelNamesQuery, ChannelNamesResponse } from './index'

import * as httpRequest from '../http-request'

const DEFAULT_URL = 'http://localhost:8080'

describe('query-channel-names', () => {
	afterEach(() => {
		sinon.restore()
	})

	it('sends out a POST request to the right URL', async () => {
		const fake = sinon.fake()
		sinon.replace(httpRequest, 'post', fake)
		const expectedUrl = `${DEFAULT_URL}/channels`
		const options = {}
		await queryChannelNames(DEFAULT_URL, options)
		expect(fake.callCount).to.equal(1)
		expect(fake.args[0][0]).to.equal(expectedUrl)
	})

	it('sends the queryOptions in the body of the request', async () => {
		const fake = sinon.fake()
		sinon.replace(httpRequest, 'post', fake)
		const queryOptions: ChannelNamesQuery = {
			backends: ['backend1', 'backend2'],
			ordering: Ordering.ASC,
			regex: '^sineg',
			reload: true,
		}
		await queryChannelNames(DEFAULT_URL, queryOptions)
		expect(fake.callCount).to.equal(1)
		expect(fake.args[0][1]).to.deep.equal(queryOptions)
	})

	it('parses the response correctly', async () => {
		const options = {}
		const fakeAnswer: ChannelNamesResponse = [
			{ backend: 'backend1', channels: ['chan11', 'chan12', 'chan13'] },
			{ backend: 'backend2', channels: ['chan21', 'chan22', 'chan23'] },
			{ backend: 'backend3', channels: ['chan31', 'chan32', 'chan33'] },
		]
		const fake = sinon.fake.resolves(fakeAnswer)
		sinon.replace(httpRequest, 'post', fake)
		const response = await queryChannelNames(DEFAULT_URL, options)
		expect(response).to.be.an('array').with.length(3)
		expect(response).to.deep.equal(fakeAnswer)
	})
})
