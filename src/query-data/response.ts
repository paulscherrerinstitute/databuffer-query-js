import { Channel } from '../channel'
import { EventField } from './fields'

/**
 * QueryResponse defines the structure of the response from the API.
 */
export type QueryResponse = QueryResponseItem[]

/**
 * QueryResponseItem defines the structure of a single item of [[QueryResponse]].
 */
export interface QueryResponseItem {
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
 * within a [[QueryResponseItem]].
 *
 * @remarks
 * Which fields are present depends on which fields were requested in
 * the original data query.
 */
export interface Event {
	[EventField.GLOBAL_DATE]?: string
	[EventField.GLOBAL_MILLIS]?: number
	[EventField.GLOBAL_SECONDS]?: number
	[EventField.IOC_DATE]?: string
	[EventField.IOC_MILLIS]?: number
	[EventField.IOC_SECONDS]?: number
	[EventField.PULSE_ID]?: number
	[EventField.VALUE]?: number[]

	/** shape defines the number of elements in the value field */
	shape?: number[]
}

export interface QueryResponseFormat {
	/**
	 * format requests a specific format for the response data.
	 * **Default** is [[QueryResponseFormatSpecifier.JSON]].
	 */
	format?: QueryResponseFormatType

	/**
	 * compression requests a compressed response.
	 * **Default** is [[QueryResponseCompression.NONE]].
	 */
	compression?: QueryResponseCompression

	/**
	 * allowRedirect defines if the API server can redirect this query
	 * to another API server for the specific requested backend.
	 * **Default** is `true`.
	 */
	allowRedirect?: boolean
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
