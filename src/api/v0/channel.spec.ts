import { describe, it } from 'mocha'
import { expect } from 'chai'

import { Channel, BACKEND_SEPARATOR, channelToId, idToChannel } from './channel'

describe('module Channel', () => {
	describe('channelToId', () => {
		it('works with good values', () => {
			const ch: Channel = { backend: 'my-backend', name: 'my-name' }
			expect(channelToId(ch)).to.equal(`my-backend${BACKEND_SEPARATOR}my-name`)
		})

		it('works correctly with idToChannel', () => {
			const id = 'a/b'
			expect(channelToId(idToChannel(id))).to.equal(id)
		})
	})

	describe('idToChannel', () => {
		it('works with good values', () => {
			const fullId = `a${BACKEND_SEPARATOR}b`
			const ch = idToChannel(fullId)
			expect(ch.backend).to.equal('a')
			expect(ch.name).to.equal('b')
		})

		it('creates an object with right structure', () => {
			const ch = idToChannel('a/b')
			expect(Object.getOwnPropertyNames(ch).sort()).to.deep.equal([
				'backend',
				'name',
			])
		})

		it('throws error on empty string', () => {
			expect(() => {
				idToChannel('')
			}).to.throw()
		})

		it('throws error on string without BACKEND_SEPARATOR', () => {
			expect(() => {
				idToChannel('just-a-plain-string-no-separator')
			}).to.throw('Malformed id')
		})

		it('throws error on string with multiple BACKEND_SEPARATOR', () => {
			expect(() => {
				idToChannel(`too${BACKEND_SEPARATOR}many${BACKEND_SEPARATOR}separators`)
			}).to.throw('Malformed id')
		})

		it('works correctly with channelToId', () => {
			const channel = { backend: 'a', name: 'b' }
			expect(idToChannel(channelToId(channel))).to.deep.equal(channel)
		})
	})
})
