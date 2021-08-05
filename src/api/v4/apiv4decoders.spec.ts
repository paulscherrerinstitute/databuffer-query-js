import { describe, it } from 'mocha'
import { expect } from 'chai'

import {
	backendsResponseGuard,
	binnedQueryResponseGuard,
	channelSearchResponseGuard,
	eventsQueryResponseGuard,
} from './apiv4decoders'

describe('module apiv4decoders', () => {
	describe('backendsResponseGuard', () => {
		it('works with good data', () => {
			const input = {
				backends: ['a', 'b', 'c'],
			}
			const result = backendsResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('rejects empty object', () => {
			expect(() => backendsResponseGuard({})).to.throw()
		})

		it('rejects empty string in array', () => {
			expect(() =>
				backendsResponseGuard({
					backends: ['a', 'b', ''],
				})
			).to.throw()
		})

		it('removes extra keys in object', () => {
			const expectedOutput = {
				backends: ['a', 'b', 'c'],
			}
			const input = { ...expectedOutput, extra: 'that should not be there' }
			const result = backendsResponseGuard(input)
			expect(result).to.not.haveOwnProperty('extra')
			expect(result).to.deep.equal(expectedOutput)
		})
	})

	describe('channelSearchResponseGuard', () => {
		it('works with empty result (good data)', () => {
			const input = {
				channels: [],
			}
			const result = channelSearchResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('works with minimal result (good data)', () => {
			const input = {
				channels: [{ name: 'a', backend: 'b' }],
			}
			const result = channelSearchResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('works with complete result (good data)', () => {
			const input = {
				channels: [
					{
						name: 'a',
						backend: 'b',
						source: 'c',
						unit: 'd',
						description: 'e',
						shape: [1024, 1024],
					},
				],
			}
			const result = channelSearchResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('rejects empty object', () => {
			expect(() => channelSearchResponseGuard({})).to.throw()
		})

		it('rejects channels[].backend missing', () => {
			expect(() =>
				channelSearchResponseGuard({
					channels: [{ name: 'a' }],
				})
			).to.throw()
		})

		it('rejects channels[].backend empty', () => {
			expect(() =>
				channelSearchResponseGuard({
					channels: [{ name: 'a', backend: '' }],
				})
			).to.throw()
		})

		it('rejects channels[].name missing', () => {
			expect(() =>
				channelSearchResponseGuard({
					channels: [{ backend: 'b' }],
				})
			).to.throw()
		})

		it('rejects channels[].name empty', () => {
			expect(() =>
				channelSearchResponseGuard({
					channels: [{ name: '', backend: 'b' }],
				})
			).to.throw()
		})

		it('approves channels[].shape empty', () => {
			const input = {
				channels: [{ name: 'a', backend: 'b', shape: [] }],
			}
			const result = channelSearchResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('rejects channels[].shape[] not integer', () => {
			expect(() =>
				channelSearchResponseGuard({
					channels: [{ name: '', backend: 'b', shape: [1.0] }],
				})
			).to.throw()
		})

		it('removes extra keys in object', () => {
			const expectedOutput = {
				channels: [{ name: 'a', backend: 'b' }],
			}
			const input = { ...expectedOutput, extra: 'that should not be there' }
			const result = channelSearchResponseGuard(input)
			expect(result).to.not.haveOwnProperty('extra')
			expect(result).to.deep.equal(expectedOutput)
		})
	})

	describe('eventsQueryResponseGuard', () => {
		it('works with empty result (good data)', () => {
			const input = {
				tsAnchor: 1628166956,
				tsMs: [],
				tsNs: [],
				values: [],
			}
			const result = eventsQueryResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('works with complete result (good data, scalar)', () => {
			const input = {
				tsAnchor: 1628166956,
				tsMs: [100, 1000, 10000],
				tsNs: [200, 2000, 20000],
				values: [123.456, 234.567, 345.678],
			}
			const result = eventsQueryResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('works with complete result (good data, 1d array)', () => {
			const input = {
				tsAnchor: 1628166956,
				tsMs: [100, 1000, 10000],
				tsNs: [200, 2000, 20000],
				values: [
					[123.456, 234.567, 345.678],
					[234.567, 345.678, 456.789],
					[345.678, 456.789, 567.89],
				],
			}
			const result = eventsQueryResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('works with complete result (good data, 2d array)', () => {
			const input = {
				tsAnchor: 1628166956,
				tsMs: [100, 1000, 10000],
				tsNs: [200, 2000, 20000],
				values: [
					[
						[123.456, 234.567, 345.678],
						[234.567, 345.678, 456.789],
					],
					[
						[234.567, 345.678, 456.789],
						[345.678, 456.789, 567.89],
					],
					[
						[345.678, 456.789, 567.89],
						[456.789, 567.89, 678.901],
					],
				],
			}
			const result = eventsQueryResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('rejects empty object', () => {
			expect(() => eventsQueryResponseGuard({})).to.throw()
		})

		it('rejects tsAnchor missing', () => {
			expect(() =>
				eventsQueryResponseGuard({
					// tsAnchor: 1628166956,
					tsMs: [100, 1000, 10000],
					tsNs: [200, 2000, 20000],
					values: [123.456, 234.567, 345.678],
				})
			).to.throw()
		})

		it('rejects tsMs missing', () => {
			expect(() =>
				eventsQueryResponseGuard({
					tsAnchor: 1628166956,
					// tsMs: [100, 1000, 10000],
					tsNs: [200, 2000, 20000],
					values: [123.456, 234.567, 345.678],
				})
			).to.throw()
		})

		it('rejects tsNs missing', () => {
			expect(() =>
				eventsQueryResponseGuard({
					tsAnchor: 1628166956,
					tsMs: [100, 1000, 10000],
					// tsNs: [200, 2000, 20000],
					values: [123.456, 234.567, 345.678],
				})
			).to.throw()
		})

		it('rejects values missing', () => {
			expect(() =>
				eventsQueryResponseGuard({
					tsAnchor: 1628166956,
					tsMs: [100, 1000, 10000],
					tsNs: [200, 2000, 20000],
					// values: [123.456, 234.567, 345.678],
				})
			).to.throw()
		})
	})

	describe('binnedQueryResponseGuard', () => {
		const MINIMAL_OK_DATA = {
			tsAnchor: 1628166956,
			tsMs: [100, 1000, 10000],
			tsNs: [200, 2000, 20000],
			counts: [10, 20, 30],
			avgs: [123.456, 234.567, 345.678],
			mins: [123.456, 234.567, 345.678],
			maxs: [123.456, 234.567, 345.678],
		}

		it('works with empty result (good data)', () => {
			const input = {
				tsAnchor: 1628166956,
				tsMs: [],
				tsNs: [],
				counts: [],
				avgs: [],
				mins: [],
				maxs: [],
			}
			const result = binnedQueryResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('works with complete result (good data, scalar)', () => {
			const input = { ...MINIMAL_OK_DATA }
			const result = binnedQueryResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('works with complete result (good data, 1d array)', () => {
			const input = {
				tsAnchor: 1628166956,
				tsMs: [100, 1000, 10000],
				tsNs: [200, 2000, 20000],
				counts: [
					[10, 20, 30],
					[20, 30, 40],
					[30, 40, 50],
				],
				avgs: [
					[123.456, 234.567, 345.678],
					[234.567, 345.678, 456.789],
					[345.678, 456.789, 567.89],
				],
				mins: [
					[123.456, 234.567, 345.678],
					[234.567, 345.678, 456.789],
					[345.678, 456.789, 567.89],
				],
				maxs: [
					[123.456, 234.567, 345.678],
					[234.567, 345.678, 456.789],
					[345.678, 456.789, 567.89],
				],
			}
			const result = binnedQueryResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('works with complete result (good data, 2d array)', () => {
			const input = {
				tsAnchor: 1628166956,
				tsMs: [100, 1000, 10000],
				tsNs: [200, 2000, 20000],
				counts: [
					[
						[10, 20, 30],
						[20, 30, 40],
					],
					[
						[20, 30, 40],
						[30, 40, 50],
					],
					[
						[30, 40, 50],
						[40, 50, 60],
					],
				],
				avgs: [
					[
						[123.456, 234.567, 345.678],
						[234.567, 345.678, 456.789],
					],
					[
						[234.567, 345.678, 456.789],
						[345.678, 456.789, 567.89],
					],
					[
						[345.678, 456.789, 567.89],
						[456.789, 567.89, 678.901],
					],
				],
				mins: [
					[
						[123.456, 234.567, 345.678],
						[234.567, 345.678, 456.789],
					],
					[
						[234.567, 345.678, 456.789],
						[345.678, 456.789, 567.89],
					],
					[
						[345.678, 456.789, 567.89],
						[456.789, 567.89, 678.901],
					],
				],
				maxs: [
					[
						[123.456, 234.567, 345.678],
						[234.567, 345.678, 456.789],
					],
					[
						[234.567, 345.678, 456.789],
						[345.678, 456.789, 567.89],
					],
					[
						[345.678, 456.789, 567.89],
						[456.789, 567.89, 678.901],
					],
				],
			}
			const result = binnedQueryResponseGuard(input)
			expect(result).to.deep.equal(input)
		})

		it('rejects empty object', () => {
			expect(() => binnedQueryResponseGuard({})).to.throw()
		})

		it('rejects tsAnchor missing', () => {
			const input = { ...MINIMAL_OK_DATA } as { [k: string]: unknown }
			delete input.tsAnchor
			expect(() => binnedQueryResponseGuard(input)).to.throw()
		})

		it('rejects tsMs missing', () => {
			const input = { ...MINIMAL_OK_DATA } as { [k: string]: unknown }
			delete input.tsMs
			expect(() => binnedQueryResponseGuard(input)).to.throw()
		})

		it('rejects tsNs missing', () => {
			const input = { ...MINIMAL_OK_DATA } as { [k: string]: unknown }
			delete input.tsNs
			expect(() => binnedQueryResponseGuard(input)).to.throw()
		})

		it('rejects counts missing', () => {
			const input = { ...MINIMAL_OK_DATA } as { [k: string]: unknown }
			delete input.counts
			expect(() => binnedQueryResponseGuard(input)).to.throw()
		})

		it('rejects avgs missing', () => {
			const input = { ...MINIMAL_OK_DATA } as { [k: string]: unknown }
			delete input.avgs
			expect(() => binnedQueryResponseGuard(input)).to.throw()
		})

		it('rejects mins missing', () => {
			const input = { ...MINIMAL_OK_DATA } as { [k: string]: unknown }
			delete input.mins
			expect(() => binnedQueryResponseGuard(input)).to.throw()
		})

		it('rejects maxs missing', () => {
			const input = { ...MINIMAL_OK_DATA } as { [k: string]: unknown }
			delete input.maxs
			expect(() => binnedQueryResponseGuard(input)).to.throw()
		})
	})
})
