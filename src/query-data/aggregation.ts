/**
 * AggregationSpecification defines the details of the aggregation.
 */
export interface AggregationSpecification {
	/**
	 * aggregationType defines what type of aggregation should be performed.
	 */
	aggregationType?: AggregationType

	/**
	 * aggregations defines the aggregation operations to be peformed.
	 */
	aggregations: AggregationOperation[]

	/**
	 * extrema requests inclusion of extrema.
	 *
	 * See the API docs for details.
	 */
	// ### TODO improve doc comment
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
}

/**
 * AggregationOperation defines the operation to use.
 */
export enum AggregationOperation {
	/**
	 * MAX aggregates to the maximum value.
	 */
	MAX = 'max',

	/**
	 * MEAN aggregates to the mean value.
	 */
	MEAN = 'mean',

	/**
	 * MIN aggregates to the min value.
	 */
	MIN = 'min',
}

// ### TODO: do this properly
export type Extrema = any
