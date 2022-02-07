import { AggregationOperation } from './aggregation.js'

/**
 * MappingSpecification allows for mapping response data based on their pulse or global time
 */
export interface MappingSpecification {
	/**
	 * incomplete specifies how to map incomplete data points.
	 * **Default** is [[MappingIncomplete.PROVIDE_AS_IS]].
	 */
	incomplete?: MappingIncomplete

	/**
	 * alignment specifies how to align the data.
	 * **Default** is [[MappingAlignment.BY_PULSE]]
	 */
	alignment?: MappingAlignment

	/**
	 * aggregations holds instructions how to aggregate multiple data points of a bin.
	 * If this is not defined, it will use the global/default aggregations.
	 */
	aggregations?: AggregationOperation[]
}

/**
 * MappingIncomplete specifies how to deal with incomplete data sets of a mapping
 */
export enum MappingIncomplete {
	/** provide the data as recorded */
	PROVIDE_AS_IS = 'provide-as-is',

	/** discard incomplete mappings */
	DROP = 'drop',

	/** fill incomplete mappings with a null string */
	FILL_NULL = 'fill-null',
}

/**
 * MappingAlignment activates a table like alignment of the data in a response
 */
export enum MappingAlignment {
	/** align data points by pulse ID */
	BY_PULSE = 'by-pulse',

	/** align data points by global time */
	BY_TIME = 'by-time',

	/** don't align data points */
	NONE = 'none',
}
