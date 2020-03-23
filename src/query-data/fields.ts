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
 */
export enum EventFields {
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
	 * VALUE holds the actual value of the [[DataPoint]].
	 *
	 * @remarks
	 * The data stored in the corresponding field depends on the type of
	 * data requested in the query (e.g. waveform channels, pictures,
	 * aggregations, ...)
	 */
	VALUE = 'value',
}
