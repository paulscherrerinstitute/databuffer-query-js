import { Channel } from '../channel'
import { EventField } from './fields'
import { AggregationResult } from './aggregation'

/**
 * DataResponse defines the structure of the response from the API.
 */
export type DataResponse = DataResponseItem[]

/**
 * DataResponseItem defines the structure of a single item of [[DataResponse]].
 */
export interface DataResponseItem {
	/**
	 * channel identifies, which channel the [[data]] belongs to.
	 */
	channel: Channel

	/**
	 * data contains the data retrieved from the API.
	 */
	data: Event[]
}

/**
 * Event defines a single point of data returned for a [[Channel]]
 * within a [[DataResponseItem]].
 *
 * @remarks
 * Which fields are present depends on which fields were requested in
 * the original data query.
 */
export interface Event {
	[EventField.BACKEND]?: string
	[EventField.CHANNEL]?: string
	[EventField.EVENT_COUNT]?: number
	[EventField.GLOBAL_DATE]?: string
	[EventField.GLOBAL_MILLIS]?: number
	[EventField.GLOBAL_SECONDS]?: number
	[EventField.IOC_DATE]?: string
	[EventField.IOC_MILLIS]?: number
	[EventField.IOC_SECONDS]?: number
	[EventField.PULSE_ID]?: number
	[EventField.SEVERITY]?: number
	[EventField.SHAPE]?: number[]
	[EventField.STATUS]?: number
	[EventField.TRANSFORMED_VALUE]?: any // ### TODO: specify more correctly
	[EventField.VALUE]?:
		| number
		| number[]
		| AggregationResult
		| AggregationResult[]
}

export interface DataResponseFormat {
	/**
	 * format requests a specific format for the response data.
	 * **Default** is [[DataResponseFormatSpecifier.JSON]].
	 */
	format?: DataResponseFormatType

	/**
	 * compression requests a compressed response.
	 * **Default** is [[DataResponseCompression.NONE]].
	 */
	compression?: DataResponseCompression

	/**
	 * allowRedirect defines if the API server can redirect this query
	 * to another API server for the specific requested backend.
	 * **Default** is `true`.
	 */
	allowRedirect?: boolean
}

/**
 * DataResponseFormatType defines the data format of the response.
 */
export enum DataResponseFormatType {
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
 * DataResponseCompression defines if
 */
export enum DataResponseCompression {
	NONE = 'none',
	GZIP = 'gzip',
}
