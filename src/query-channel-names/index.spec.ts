import {
	queryChannelNames,
	QueryOptions,
	Ordering,
	QueryResponse,
} from '../src/query-channel-names'
import { post } from '../src/http-request'

jest.mock('../src/http-request')

const DEFAULT_URL = 'http://localhost:8080'

describe('query-channel-names', () => {
	it('sends out a POST request to the right URL', async () => {
		expect.hasAssertions()
		const expectedUrl = `${DEFAULT_URL}/channels`
		const options = {}
		await queryChannelNames(DEFAULT_URL, options)
		expect(post).toHaveBeenCalledTimes(1)
		expect((post as jest.Mock).mock.calls[0][0]).toEqual(expectedUrl)
	})

	it('sends the queryOptions in the body of the request', async () => {
		expect.hasAssertions()
		const queryOptions: QueryOptions = {
			backends: ['backend1', 'backend2'],
			ordering: Ordering.ASC,
			regex: '^sineg',
			reload: true,
		}
		await queryChannelNames(DEFAULT_URL, queryOptions)
		expect(post).toHaveBeenCalledTimes(1)
		expect((post as jest.Mock).mock.calls[0][1]).toEqual(queryOptions)
	})

	it('parses the response correctly', async () => {
		expect.hasAssertions()
		const options = {}
		const fakeAnswer: QueryResponse = [
			{ backend: 'backend1', channels: ['chan11', 'chan12', 'chan13'] },
			{ backend: 'backend2', channels: ['chan21', 'chan22', 'chan23'] },
			{ backend: 'backend3', channels: ['chan31', 'chan32', 'chan33'] },
		]
		;(post as jest.Mock).mockReturnValue(fakeAnswer)
		const response = await queryChannelNames(DEFAULT_URL, options)
		expect(response).toHaveLength(3)
		expect(response).toEqual(fakeAnswer)
	})
})
