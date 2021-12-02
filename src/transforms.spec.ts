import { transformToLinePlotData } from './transforms'
import type { Datapoint } from './transforms'

describe('module transforms', () => {
	describe('transformToLinePlotData', () => {
		it('returns empty datapoints on empty series', () => {
			const input: Datapoint<number>[] = []
			const output = transformToLinePlotData(input, {
				startAt: 100,
				endAt: 130,
				stepSize: 10,
			})
			expect(output).toHaveLength(0)
		})

		it('returns empty datapoints if startAt > endAt', () => {
			const input: Datapoint<number>[] = [
				{ x: 200, y: 1 },
				{ x: 300, y: 2 },
			]
			const output = transformToLinePlotData(input, {
				startAt: 130,
				endAt: 100,
				stepSize: 10,
			})
			expect(output).toHaveLength(0)
		})

		it('returns empty datapoints on input after range', () => {
			const input: Datapoint<number>[] = [
				{ x: 200, y: 1 },
				{ x: 300, y: 2 },
			]
			const output = transformToLinePlotData(input, {
				startAt: 100,
				endAt: 130,
				stepSize: 10,
			})
			expect(output).toHaveLength(0)
		})

		it('repeats last datapoint on input before range', () => {
			const input: Datapoint<number>[] = [
				{ x: 10, y: 1 },
				{ x: 20, y: 2 },
			]
			const output = transformToLinePlotData(input, {
				startAt: 100,
				endAt: 130,
				stepSize: 10,
			})
			const expectedDatapoints = [
				{ x: 100, y: 2 },
				{ x: 110, y: 2 },
				{ x: 120, y: 2 },
				{ x: 130, y: 2 },
			]
			expect(output).toEqual(expectedDatapoints)
		})

		it('uses datapoints on the edges', () => {
			const input: Datapoint<number>[] = [
				{ x: 100, y: 1 },
				{ x: 110, y: 2 },
				{ x: 120, y: 3 },
				{ x: 130, y: 4 },
			]
			const output = transformToLinePlotData(input, {
				startAt: 100,
				endAt: 130,
				stepSize: 10,
			})
			const expectedDatapoints = [
				{ x: 100, y: 1 },
				{ x: 110, y: 2 },
				{ x: 120, y: 3 },
				{ x: 130, y: 4 },
			]
			expect(output).toEqual(expectedDatapoints)
		})

		it('works in a complicated case', () => {
			const input: Datapoint<number>[] = [
				{ x: 105, y: 1 },
				{ x: 112, y: 2 },
				{ x: 113, y: 3 },
				{ x: 114, y: 4 },
				{ x: 132, y: 5 },
			]
			const output = transformToLinePlotData(input, {
				startAt: 100,
				endAt: 130,
				stepSize: 10,
			})
			const expectedDatapoints = [
				// no data point for x = 100
				{ x: 110, y: 1 },
				{ x: 120, y: 4 },
				{ x: 130, y: 4 },
			]
			expect(output).toEqual(expectedDatapoints)
		})

		it('works if start and end do not match step size', () => {
			const input: Datapoint<number>[] = [
				{ x: 100, y: 1 },
				{ x: 110, y: 2 },
				{ x: 120, y: 3 },
				{ x: 130, y: 4 },
				{ x: 140, y: 5 },
			]
			const output = transformToLinePlotData(input, {
				startAt: 101,
				endAt: 130,
				stepSize: 7,
			})
			const expectedDatapoints = [
				{ x: 101, y: 1 },
				{ x: 108, y: 1 },
				{ x: 115, y: 2 },
				{ x: 122, y: 3 },
				{ x: 129, y: 3 },
			]
			expect(output).toEqual(expectedDatapoints)
		})
	})
})
