/**
 * QueryRange specifies the range (X axis) of data to query.
 * This can be either based on the pulse IDs (discrete integers)
 * or on date or timestamp values.
 */
export type QueryRange = QueryRangeByPulse | QueryRangeByDate | QueryRangeByTimestamp;

/**
 * QueryRangeBase specifies common fields for other [[QueryDataRange]] types.
 */
interface QueryRangeBase {
  /**
   * startInclusive defines, if the start value is inclusive.
   * **Default** is `true`.
   */
  startInclusive?: boolean;

  /**
   * startExpansion expands the query start until the first entry before
   * the defined start. Binning aggregations are expanded until the start
   * of the bin of that entry. **Default** is `false`.
   */
  startExpansion?: boolean;

  /**
   * endInclusive defines, if the end value is inclusive.
   * **Default** is `true`.
   */
  endInclusive?: boolean;

  /**
   * endExpansion expands the query end until the first entry after
   * the defined end. Binning aggregations are expanded until the end
   * of the bin of that entry. **Default** is `false`.
   */
  endExpansion?: boolean;
}

/**
 * QueryRangeByPulse specifies the range (X axis) of data to query
 * using pulse IDs.
 */
export interface QueryRangeByPulse extends QueryRangeBase {
  /**
   * startPulseId defines the start of the query range.
   *
   * **DO NOT PROVIDE VALUE `0`!** This may cause problems on the backend.
   */
  startPulseId: number;

  /**
   * endPulseId defines the end of the query range.
   */
  endPulseId: number;
}

/**
 * QueryRangeByDate specifies the range (X axis) of data to query
 * using date time strings.
 */
export interface QueryRangeByDate extends QueryRangeBase {
  /**
   * startDate defines the start of the query range.
   *
   * The server expects an ISO8601 formatted datetime string.
   * If the value does not contain a time zone offset specification,
   * the backend server will use its local time zone.
   */
  startDate: string;

  /**
   * endDate defines the end of the query range.
   *
   * The server expects an ISO8601 formatted datetime string.
   * If the value does not contain a time zone offset specification,
   * the backend server will use its local time zone.
   */
  endDate: string;
}

/**
 * QueryRangeByTime specifies the range (X axis) of data to query
 * using timestamp values.
 */
export interface QueryRangeByTimestamp extends QueryRangeBase {
  /**
   * startSeconds defines the start of the query range.
   *
   * The value is a UNIX timestamp, i.e. the number of seconds since
   * 1970-01-01T00:00:00.000Z (including fractions of seconds).
   */
  startSeconds: number;

  /**
   * endSeconds defines the end of the query range.
   *
   * The value is a UNIX timestamp, i.e. the number of seconds since
   * 1970-01-01T00:00:00.000Z (including fractions of seconds).
   */
  endSeconds: number;
}
