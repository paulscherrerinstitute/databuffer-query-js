export type Datapoint<Y> = { x: number; y: Y }

/**
 * Transform a series of data points into a series of equi-distant
 * data points by "tracing the line".
 *
 * This mimicks drawing a line plot from the original data points,
 * and then creating a new data series by tracing the line and noting
 * an (x/y) pair at fixed intervals (steps of x).
 *
 * @param datapoints The data points to be transformed
 * @param options Controls the transformation
 * @returns The transformed data points
 */
export function transformToLinePlotData<Y>(
	datapoints: Datapoint<Y>[],
	options: { stepSize: number; startAt: number; endAt: number }
): Datapoint<Y>[] {
	const result: Datapoint<Y>[] = []
	if (datapoints.length === 0) return result

	const { startAt, endAt, stepSize } = options

	// indexes into series.datapoints
	let lastIdx = 0
	let nextIdx
	let y = datapoints[lastIdx].y
	let endReached = false
	for (let x = startAt; x <= endAt; x += stepSize) {
		if (datapoints[lastIdx].x > x) continue
		if (!endReached) {
			// move forward, until we cross x or we reach the end
			nextIdx = lastIdx + 1
			while (nextIdx < datapoints.length) {
				if (datapoints[nextIdx].x > x) break
				lastIdx = nextIdx
				y = datapoints[lastIdx].y
				nextIdx++
				if (nextIdx >= datapoints.length) {
					endReached = true
					break
				}
			}
		}
		result.push({ x, y })
	}
	return result
}
