import {
	Channel,
	BACKEND_SEPARATOR,
	channelToId,
	idToChannel,
} from '../src/channel'

describe('module Channel', () => {
	describe('channelToId', () => {
		it('works with good values', () => {
			const ch: Channel = { backend: 'my-backend', name: 'my-name' }
			expect(channelToId(ch)).toEqual(`my-backend${BACKEND_SEPARATOR}my-name`)
		})

		it('works correctly with idToChannel', () => {
			const id = 'a/b'
			expect(channelToId(idToChannel(id))).toEqual(id)
		})
	})

	describe('idToChannel', () => {
		it('works with good values', () => {
			const fullId = `a${BACKEND_SEPARATOR}b`
			const ch = idToChannel(fullId)
			expect(ch.backend).toEqual('a')
			expect(ch.name).toEqual('b')
		})

		it('creates an object with right structure', () => {
			const ch = idToChannel('a/b')
			expect(Object.getOwnPropertyNames(ch).sort()).toEqual(['backend', 'name'])
		})

		it('throws error on empty string', () => {
			expect(() => {
				idToChannel('')
			}).toThrow()
		})

		it('throws error on string without BACKEND_SEPARATOR', () => {
			expect(() => {
				idToChannel('just-a-plain-string-no-separator')
			}).toThrow('Malformed id')
		})

		it('throws error on string with multiple BACKEND_SEPARATOR', () => {
			expect(() => {
				idToChannel(`too${BACKEND_SEPARATOR}many${BACKEND_SEPARATOR}separators`)
			}).toThrow('Malformed id')
		})

		it('works correctly with channelToId', () => {
			const channel = { backend: 'a', name: 'b' }
			expect(idToChannel(channelToId(channel))).toEqual(channel)
		})
	})
})
