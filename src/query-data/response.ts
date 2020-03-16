import { Channel } from '../channel';
import { EventFields } from './fields';

/**
 * QueryResponse defines the structure of the response from the API.
 */
export type QueryResponse = QueryResponseItem[];

/**
 * QueryResponseItem defines the structure of a single item of [[QueryResponse]].
 */
export interface QueryResponseItem {
  /**
   * channel identifies, which channel the [[data]] belongs to.
   */
  channel: Channel;

  /**
   * data contains the data retrieved from the API.
   */
  data: DataPoint[];
}

/**
 * DataPoint defines a single point of data returned for a [[Channel]]
 * within a [[QueryResponseItem]].
 *
 * @remarks
 * Which fields are present depends on which fields were requested in
 * the original data query.
 */
export interface DataPoint {
  [EventFields.GLOBAL_DATE]?: string;
  [EventFields.GLOBAL_MILLIS]?: number;
  [EventFields.GLOBAL_SECONDS]?: number;
  [EventFields.IOC_DATE]?: string;
  [EventFields.IOC_MILLIS]?: number;
  [EventFields.IOC_SECONDS]?: number;
  [EventFields.PULSE_ID]?: number;
  [EventFields.VALUE]?: number[];

  /** shape defines the number of elements in the value field */
  shape?: number[];
}

export interface QueryResponseFormat {
  /**
   * format requests a specific format for the response data.
   * **Default** is [[QueryResponseFormatSpecifier.JSON]].
   */
  format?: QueryResponseFormatType;

  /**
   * compression requests a compressed response.
   * **Default** is [[QueryResponseCompression.NONE]].
   */
  compression?: QueryResponseCompression;

  /**
   * allowRedirect defines if the API server can redirect this query
   * to another API server for the specific requested backend.
   * **Default** is `true`.
   */
  allowRedirect?: boolean;
}

/**
 * QueryResponseFormatType defines the data format of the response.
 */
export enum QueryResponseFormatType {
  /**
   * JSON requests the response in JSON format.
   */
  JSON = 'json',

  /**
   * CSV requests the response in CSV format.
   *
   * @remarks
   * Notea that CSV does not support `index` and `extrema` aggregations.
   */
  CSV = 'csv',
}

/**
 * QueryResponseCompression defines if
 */
export enum QueryResponseCompression {
  NONE = 'none',
  GZIP = 'gzip',
}
