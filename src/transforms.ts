export type Datapoint<Y> = { x: number; y: Y }

/**
 * Transform a series of data points into a series of equi-distant
 * data points by "tracing the line".
 *
 * This mimicks drawing a line plot from the original data points,
 * and then creating a new data series by tracing the line and noting
 * an (x/y) pair at fixed intervals (steps of x).
 *
 * Please note:
 * If there is no data (at the beginning), data points will be created
 * for it with `y = undefined`.
 * As a consequence, the size of the resulting array depends only on
 * the options, not on the input data.
 *
 * @param datapoints The data points to be transformed
 * @param options Controls the transformation
 * @returns The transformed data points
 */
export function transformToLinePlotData<Y>(
	datapoints: Datapoint<Y>[],
	options: { stepSize: number; startAt: number; endAt: number }
): Datapoint<Y | undefined>[] {
	const result: Datapoint<Y | undefined>[] = []
	const { startAt, endAt, stepSize } = options

	if (datapoints.length === 0) {
		for (let x = startAt; x <= endAt; x += stepSize) {
			result.push({ x, y: undefined })
		}
		return result
	}

	// indexes into series.datapoints
	let lastIdx = 0
	let nextIdx
	let y = datapoints[lastIdx].y
	let endReached = false
	for (let x = startAt; x <= endAt; x += stepSize) {
		if (datapoints[lastIdx].x > x) {
			result.push({ x, y: undefined })
			continue
		}
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

export type Correlation<T> = { x: T; y: T }[]

/**
 * Correlate two data series X(t) and Y(t).
 * For every t in the range try to find a datapoint in each X(t) and Y(t) and pair them up.
 *
 * result := { (x,y) | x in X(t) and y in Y(t) for the same value of t }
 *
 * @param seriesX	The data points that will become the X values of the correlation
 * @param seriesY The data points that will become the Y values of the correlation
 * @returns An array of correlated data points
 */
export function correlateDataSeries<T>(
	seriesX: Datapoint<T>[],
	seriesY: Datapoint<T>[]
): Correlation<T> {
	const result: Correlation<T> = []

	// initialize lookup map
	const lookupY = new Map<number, T>()
	for (const pt of seriesY) {
		lookupY.set(pt.x, pt.y)
	}

	// populate correlation
	for (const ptX of seriesX) {
		const t = ptX.x
		const x = ptX.y
		const y = lookupY.get(t)
		if (y === undefined) continue
		result.push({ x, y })
	}

	return result
}
