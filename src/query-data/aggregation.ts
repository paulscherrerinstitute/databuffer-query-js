/**
 * AggregationSpecification defines the details of the aggregation query.
 *
 * See also the Java source of the backend:
 * [AggregationDescriptor.java](https://git.psi.ch/sf_daq/ch.psi.daq.domain/blob/master/src/main/java/ch/psi/daq/domain/query/operation/AggregationDescriptor.java)
 */
export interface AggregationSpecification {
	/**
	 * aggregationType defines what type of aggregation should be performed.
	 *
	 * **Default**: [[AggregationType.VALUE]]
	 */
	aggregationType?: AggregationType

	/**
	 * aggregations defines the aggregation operations to be peformed.
	 */
	aggregations: AggregationOperation[]

	/**
	 * extrema requests inclusion of extrema.
	 */
	extrema?: Extrema[]

	/**
	 * nrOfBins activates binning and creates evenly spaced bins by time.
	 */
	nrOfBins?: number

	/**
	 * dureationPerBin activates binning and creates bins by duration.
	 * The value must be a valid ISO8601 duration string, e.g.
	 * "PT1S" for 1 second.
	 */
	durationPerBin?: string

	/**
	 * pulsesPerBin activates binning and creates bins by number
	 * of pulses / events.
	 */
	pulsesPerBin?: number
}

/**
 * AggregationType defines how the aggregation should be performed.
 *
 * See the documentation of the API for details and pictures to
 * illustrate the differences.
 *
 * See also the Java source of the backend:
 * [AggregationType.java](https://git.psi.ch/sf_daq/ch.psi.daq.domain/blob/master/src/main/java/ch/psi/daq/domain/query/operation/AggregationType.java)
 */
export enum AggregationType {
	/**
	 * VALUE requests aggregation of all values at a certain point / bin.
	 * (i.e. column wise)
	 */
	VALUE = 'value',

	/**
	 * INDEX requests aggregation of values *within a bin*, according to
	 * their *array index*. (i.e. row wise aggregation).
	 */
	INDEX = 'index',

	/**
	 * EXTREMA requests the extrema (min/max) aggregation.
	 *
	 * TODO: Explain better, how this works on the backend
	 */
	EXTEMA = 'extrema',
}

/**
 * AggregationOperation defines the operation to use.
 *
 * See also the Java source of the backend:
 * [Aggregation.java](https://git.psi.ch/sf_daq/ch.psi.daq.domain/blob/master/src/main/java/ch/psi/daq/domain/query/operation/Aggregation.java)
 */
export enum AggregationOperation {
	/**
	 * COUNT aggregates to the number of items.
	 * `count([1, 2, 3]) = 3`
	 */
	COUNT = 'count',

	/**
	 * KURTOSIS
	 * @see https://en.wikipedia.org/wiki/Kurtosis
	 */
	KURTOSIS = 'kurtosis',

	/**
	 * MAX aggregates to the maximum value.
	 * `max([1, 2, 3]) = 3`
	 */

	MAX = 'max',

	/**
	 * MEAN aggregates to the (arithmetic) mean value.
	 * `mean([1, 2, 3]) = 2`
	 */
	MEAN = 'mean',

	/**
	 * MIN aggregates to the minimum value.
	 * `min([1, 2, 3]) = 1`
	 */
	MIN = 'min',

	/**
	 * SKEWNESS
	 * @see https://en.wikipedia.org/wiki/Skewness
	 */
	SKEWNESS = 'skewness',

	/**
	 * STDDEV aggregates to the standard deviation.
	 * @see https://en.wikipedia.org/wiki/Standard_deviation
	 */
	STDDEV = 'stddev',

	/**
	 * SUM aggregates to the sum.
	 * `sum([1, 2, 3]) = 6`
	 */
	SUM = 'sum',

	/**
	 * VARIANCE aggregates to the variance.
	 * @see https://en.wikipedia.org/wiki/Variance
	 */
	VARIANCE = 'variance',
}

/**
 * Request extrema aggregation.
 *
 * See also the Java source of the backend:
 * [Extrema.java](https://git.psi.ch/sf_daq/ch.psi.daq.domain/blob/master/src/main/java/ch/psi/daq/domain/query/operation/Extrema.java)
 */
export enum Extrema {
	/**
	 * MAX_VALUE requests the global maximum value.
	 */
	MAX_VALUE = 'maxValue',

	/**
	 * MIN_VALUE requests the global minimum value.
	 */
	MIN_VALUE = 'minValue',
}

/**
 * AggregationResult holds the possible fields that can be present
 * in [[Event.value]], if the request was using aggregation (i.e.
 * it included an [[AggregationSpecification]]).
 */
export interface AggregationResult {
	[AggregationOperation.COUNT]?: number
	[AggregationOperation.KURTOSIS]?: number
	[AggregationOperation.MAX]?: number
	[AggregationOperation.MEAN]?: number
	[AggregationOperation.MIN]?: number
	[AggregationOperation.SKEWNESS]?: number
	[AggregationOperation.STDDEV]?: number
	[AggregationOperation.SUM]?: number
	[AggregationOperation.VARIANCE]?: number
}
