import {
	channelConfigsResponseGuard,
	channelNamesResponseGuard,
	dataResponseGuard,
	parametersResponseGuard,
} from './apiv0decoders'

import type { DataResponseItem } from './query-data/response'

describe('module apiv0decoders', () => {
	describe('parametersResponseGuard', () => {
		it('accepts empty array', () => {
			const input: unknown = []
			expect(parametersResponseGuard(input)).toEqual(input)
		})

		it('accepts array of non empty strings', () => {
			const input = ['a', 'b', 'c']
			expect(parametersResponseGuard(input)).toEqual(input)
		})

		it('rejects empty string in array', () => {
			const input = ['a', 'b', '']
			expect(() => parametersResponseGuard(input)).toThrowError()
		})
	})

	describe('dataResponseGuard', () => {
		const MINIMAL_OK_DATA: DataResponseItem = {
			channel: { backend: 'be', name: 'ch1' },
			data: [
				{
					backend: 'be',
					channel: 'ch1',
					eventCount: 5,
					globalDate: '2022-01-25T07:10:20.345Z', // not sure, if it's really iso8601 compliant
					globalMillis: 1643094620345,
					globalSeconds: 1643094620.345,
					iocDate: '2022-01-25T07:10:20.345Z', // not sure, if it's really iso8601 compliant
					iocMillis: 1643094620345,
					iocSeconds: 1643094620.345,
					pulseId: 99,
					severity: 3,
					shape: [1],
					status: 4,
					transformedValue: {}, // this is currently under-spec'ed
					value: 42,
				},
			],
		}

		it('accepts empty array', () => {
			const input: unknown = []
			expect(dataResponseGuard(input)).toEqual(input)
		})

		it('accepts good values', () => {
			const input = [{ ...MINIMAL_OK_DATA }]
			expect(dataResponseGuard(input)).toEqual(input)
		})

		it('rejects channel.backend empty string', () => {
			const input = [
				{ ...MINIMAL_OK_DATA, channel: { backend: '', name: 'ch1' } },
			]
			expect(() => dataResponseGuard(input)).toThrowError()
		})

		it('rejects channel.backend missing', () => {
			const input = [
				{ ...MINIMAL_OK_DATA, channel: { backend: undefined, name: 'ch1' } },
			]
			expect(() => dataResponseGuard(input)).toThrowError()
		})

		it('rejects channel.name empty string', () => {
			const input = [
				{ ...MINIMAL_OK_DATA, channel: { backend: 'be', name: '' } },
			]
			expect(() => dataResponseGuard(input)).toThrowError()
		})

		it('rejects channel.name missing', () => {
			const input = [
				{ ...MINIMAL_OK_DATA, channel: { backend: 'be', name: undefined } },
			]
			expect(() => dataResponseGuard(input)).toThrowError()
		})

		describe('data', () => {
			let input: DataResponseItem[]

			beforeEach(() => {
				const data = [{ ...MINIMAL_OK_DATA.data[0] }]
				input = [{ ...MINIMAL_OK_DATA, data }]
			})

			it('accepts empty array', () => {
				input[0].data = []
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts backend missing', () => {
				input[0].data[0].backend = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('rejects backend empty string', () => {
				input[0].data[0].backend = ''
				expect(() => dataResponseGuard(input)).toThrowError()
			})

			it('accepts channel missing', () => {
				input[0].data[0].channel = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('rejects channel empty string', () => {
				input[0].data[0].channel = ''
				expect(() => dataResponseGuard(input)).toThrowError()
			})

			it('accepts eventCount missing', () => {
				input[0].data[0].eventCount = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts globalDate missing', () => {
				input[0].data[0].globalDate = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('rejects globalDate empty string', () => {
				input[0].data[0].globalDate = ''
				expect(() => dataResponseGuard(input)).toThrowError()
			})

			it('accepts globalMillis missing', () => {
				input[0].data[0].globalMillis = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts globalSeconds missing', () => {
				input[0].data[0].globalSeconds = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts globalSeconds number', () => {
				input[0].data[0].globalSeconds = 42
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts globalSeconds string', () => {
				input[0].data[0].globalSeconds = '42'
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('rejects globalSeconds empty string', () => {
				input[0].data[0].globalSeconds = ''
				expect(() => dataResponseGuard(input)).toThrowError()
			})

			it('accepts iocDate missing', () => {
				input[0].data[0].iocDate = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('rejects iocDate empty string', () => {
				input[0].data[0].iocDate = ''
				expect(() => dataResponseGuard(input)).toThrowError()
			})

			it('accepts iocMillis missing', () => {
				input[0].data[0].iocMillis = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts iocSeconds missing', () => {
				input[0].data[0].iocSeconds = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts iocSeconds number', () => {
				input[0].data[0].iocSeconds = 42
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts iocSeconds string', () => {
				input[0].data[0].iocSeconds = '42'
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('rejects iocSeconds empty string', () => {
				input[0].data[0].iocSeconds = ''
				expect(() => dataResponseGuard(input)).toThrowError()
			})

			it('accepts pulseId missing', () => {
				input[0].data[0].pulseId = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts severity missing', () => {
				input[0].data[0].severity = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts shape missing', () => {
				input[0].data[0].shape = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts status missing', () => {
				input[0].data[0].status = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts transformedValue missing', () => {
				input[0].data[0].transformedValue = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})

			it('accepts value missing', () => {
				input[0].data[0].value = undefined
				expect(dataResponseGuard(input)).toEqual(input)
			})
		})
	})

	describe('channelNamesResponseGuard', () => {
		const MINIMAL_OK_DATA = {
			backend: 'be',
			channels: ['ch1', 'ch2'],
		}

		it('accepts empty array', () => {
			const input: unknown = []
			expect(channelNamesResponseGuard(input)).toEqual(input)
		})

		it('accepts channels empty array', () => {
			const input = [{ ...MINIMAL_OK_DATA, channels: [] }]
			expect(channelNamesResponseGuard(input)).toEqual(input)
		})

		it('accepts good values', () => {
			const input = [{ ...MINIMAL_OK_DATA }]
			expect(
				channelNamesResponseGuard([{ backend: 'be', channels: ['ch1', 'ch2'] }])
			).toEqual(input)
		})

		it('rejects backend is empty string', () => {
			const input = [{ ...MINIMAL_OK_DATA, backend: '' }]
			expect(() => channelNamesResponseGuard(input)).toThrowError()
		})

		it('rejects backend is missing', () => {
			const input = [{ ...MINIMAL_OK_DATA, backend: undefined }]
			expect(() => channelNamesResponseGuard(input)).toThrowError()
		})

		it('rejects channels has empty string', () => {
			const input = [{ ...MINIMAL_OK_DATA, channels: ['ch1', ''] }]
			expect(() => channelNamesResponseGuard(input)).toThrowError()
		})

		it('rejects channels is missing', () => {
			const input = [{ ...MINIMAL_OK_DATA, channels: undefined }]
			expect(() => channelNamesResponseGuard(input)).toThrowError()
		})
	})

	describe('channelConfigsResponseGuard', () => {
		const MINIMAL_CHANNEL = {
			source: 'tcp://myhost:1234',
			backend: 'be',
			name: 'ch1',
			type: 'uint16',
			shape: [1],
			unit: 'mm',
			description: 'no idea',
		}
		const MINIMAL_OK_DATA = {
			backend: 'be',
			channels: [MINIMAL_CHANNEL],
		}

		it('accepts empty array', () => {
			const input: unknown = []
			expect(() => channelConfigsResponseGuard(input)).not.toThrowError()
		})

		it('accepts channels empty array', () => {
			const input = [{ ...MINIMAL_OK_DATA, channels: [] }]
			expect(channelConfigsResponseGuard(input)).toEqual(input)
		})

		it('accepts good values', () => {
			const input = [{ ...MINIMAL_OK_DATA }]
			expect(channelConfigsResponseGuard(input)).toEqual(input)
		})

		it('rejects source missing', () => {
			const input = [
				{
					...MINIMAL_OK_DATA,
					channels: [{ ...MINIMAL_CHANNEL, source: undefined }],
				},
			]
			expect(() => channelConfigsResponseGuard(input)).toThrowError()
		})

		it('rejects backend missing', () => {
			const input = [
				{
					...MINIMAL_OK_DATA,
					channels: [{ ...MINIMAL_CHANNEL, backend: undefined }],
				},
			]
			expect(() => channelConfigsResponseGuard(input)).toThrowError()
		})

		it('rejects name missing', () => {
			const input = [
				{
					...MINIMAL_OK_DATA,
					channels: [{ ...MINIMAL_CHANNEL, name: undefined }],
				},
			]
			expect(() => channelConfigsResponseGuard(input)).toThrowError()
		})

		it('rejects type missing', () => {
			const input = [
				{
					...MINIMAL_OK_DATA,
					channels: [{ ...MINIMAL_CHANNEL, type: undefined }],
				},
			]
			expect(() => channelConfigsResponseGuard(input)).toThrowError()
		})

		it('rejects shape missing', () => {
			const input = [
				{
					...MINIMAL_OK_DATA,
					channels: [{ ...MINIMAL_CHANNEL, shape: undefined }],
				},
			]
			expect(() => channelConfigsResponseGuard(input)).toThrowError()
		})

		it('accepts unit missing', () => {
			const input = [
				{
					...MINIMAL_OK_DATA,
					channels: [{ ...MINIMAL_CHANNEL, unit: undefined }],
				},
			]
			expect(channelConfigsResponseGuard(input)).toEqual(input)
		})

		it('accepts description missing', () => {
			const input = [
				{
					...MINIMAL_OK_DATA,
					channels: [{ ...MINIMAL_CHANNEL, description: undefined }],
				},
			]
			expect(channelConfigsResponseGuard(input)).toEqual(input)
		})
	})
})
