/**
 * ConfigFields are fields being retrieved about the configuiration
 * of a [[Channel]] on a backend.
 */
export enum ConfigFields {
	/**
	 * GLOBAL_DATE holds the global time as a ISO8601 date time string.
	 */
	GLOBAL_DATE = 'globalDate',

	/**
	 * GLOBAL_MILLIS holds the global time as the number of milliseconds
	 * since the Unix epoch (1970-01-01T00:00:00.000Z).
	 */
	GLOBAL_MILLIS = 'globalMillis',

	/**
	 * GLOBAL_SECONDS holds the global time as a Unix timestamp, i.e.
	 * the number of seconds (including fractions) since the Unix epoch
	 * (1970-01-01T00:00:00.000+Z).
	 */
	GLOBAL_SECONDS = 'globalSeconds',

	/**
	 * IOC_DATE holds the local time on the IOC as a ISO8601 date time string.
	 */
	IOC_DATE = 'iocDate',

	/**
	 * IOC_MILLIS holds the local time on the IOC as the number of milliseconds
	 * since the Unix epoch (1970-01-01T00:00:00.000Z).
	 */
	IOC_MILLIS = 'iocMillis',

	/**
	 * IOC_SECONDS holds the local time on the IOC as a Unix timestamp, i.e.
	 * the number of seconds (including fractions) since the Unix epoch
	 * (1970-01-01T00:00:00.000+Z).
	 */
	IOC_SECONDS = 'iocSeconds',

	/**
	 * PULSE_ID holds the numeric ID of a pulse.
	 *
	 * @remarks
	 * This field only is meaningful for pulse aware (beam synchronous)
	 * backends. Currently these are the backends 'sf-databuffer' and
	 * 'sf-imagebuffer' (both for PSI's SwissFEL facility).
	 */
	PULSE_ID = 'pulseId',

	/**
	 * TODO
	 */
	TYPE = 'type',
}

/**
 * EventFields are fields being retrieved about the events that
 * make up a [[DataPoint]].
 *
 * See also the Java source of the backend:
 * https://git.psi.ch/sf_daq/ch.psi.daq.domain/blob/master/src/main/java/ch/psi/daq/domain/query/operation/EventField.java
 */
export enum EventFields {
	/**
	 * BACKEND holds the name of the backend where the event originated.
	 */
	BACKEND = 'backend',

	/**
	 * CHANNEL holds the name of the channel on the backend.
	 */
	CHANNEL = 'channel',

	/**
	 * EVENT_COUNT holds how many discrete DataPoints went into the bin
	 * and thereby made the DataPoint for this bin.
	 *
	 * For non-aggregated queries, this will always be 1.
	 *
	 * @see AggregationSpecification
	 */
	EVENT_COUNT = 'eventCount',

	/**
	 * GLOBAL_DATE holds the global time as a ISO8601 date time string.
	 */
	GLOBAL_DATE = 'globalDate',

	/**
	 * GLOBAL_MILLIS holds the global time as the number of milliseconds
	 * since the Unix epoch (1970-01-01T00:00:00.000Z).
	 */
	GLOBAL_MILLIS = 'globalMillis',

	/**
	 * GLOBAL_SECONDS holds the global time as a Unix timestamp, i.e.
	 * the number of seconds (including fractions) since the Unix epoch
	 * (1970-01-01T00:00:00.000+Z).
	 */
	GLOBAL_SECONDS = 'globalSeconds',

	/**
	 * IOC_DATE holds the local time on the IOC as a ISO8601 date time string.
	 */
	IOC_DATE = 'iocDate',

	/**
	 * IOC_MILLIS holds the local time on the IOC as the number of milliseconds
	 * since the Unix epoch (1970-01-01T00:00:00.000Z).
	 */
	IOC_MILLIS = 'iocMillis',

	/**
	 * IOC_SECONDS holds the local time on the IOC as a Unix timestamp, i.e.
	 * the number of seconds (including fractions) since the Unix epoch
	 * (1970-01-01T00:00:00.000+Z).
	 */
	IOC_SECONDS = 'iocSeconds',

	/**
	 * PULSE_ID holds the numeric ID of a pulse.
	 *
	 * @remarks
	 * This field only is meaningful for pulse aware (beam synchronous)
	 * backends. Currently these are the backends 'sf-databuffer' and
	 * 'sf-imagebuffer' (both for PSI's SwissFEL facility).
	 */
	PULSE_ID = 'pulseId',

	/**
	 * SEVERITY holds the severity of the event.
	 */
	SEVERITY = 'severity',

	/**
	 * SHAPE provides information about the data in the [[value]] of the
	 * [[DataPoint]]. It will be:
	 * - `[1]` for scalars
	 * - `[num]` for waveforms
	 * - `[numX, numY]` for 2D images
	 */
	SHAPE = 'shape',

	/**
	 * STATUS holds the status of the event.
	 */
	STATUS = 'status',

	/**
	 * TRANSFORMED_VALUE holds the value after the transformation, if the query
	 * asked for a transformation operation.
	 */
	TRANSFORMED_VALUE = 'transformedValue',

	/**
	 * TYPE holds the underlying data type e.g. `int32`.
	 */
	TYPE = 'type',

	/**
	 * VALUE holds the actual value of the [[DataPoint]].
	 *
	 * @remarks
	 * The data stored in the corresponding field depends on the type of
	 * data requested in the query (e.g. waveform channels, pictures,
	 * aggregations, ...)
	 *
	 * @see shape
	 */
	VALUE = 'value',
}
