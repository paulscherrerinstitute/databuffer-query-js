import { get, objectToGetParams } from '../../http-request'

/**
 * options for a channel search operation
 *
 * Individual options get combined with logical AND, so providing more options
 * makes the query more specific and will yield (possibly) fewer results.
 */
export type DataApiV4ChannelSearchOptions = {
	/** regular expression to search in the `name` field of a channel */
	nameRegex?: string
	/** regular expression to search in the `source` field of a channel */
	sourceRegex?: string
	/** regular expression to search in the `description` field of a channel */
	descriptionRegex?: string
}

/**
 * a single item in the channel search results
 */
export type DataApiV4ChannelSearchResultItem = {
	name: string
	backend: string
	/** where the data was recorded from */
	source?: string
	/** data type, e.g. `Float32`, `int32`, ... */
	type?: string
	/** shape describes if this a scalar or an array (and what are the dimensions) */
	shape?: number[]
	/** the engineering unit, if any */
	unit?: string
	/** the description, if any */
	description?: string
}

/** response for a channel search operation */
export type DataApiV4ChannelSearchResult = {
	channels: DataApiV4ChannelSearchResultItem[]
}

/** options for an events query operation */
export type DataApiV4EventsQueryOptions = {
	/** the backend where the channel is stored */
	channelBackend: string
	/** the name of the channel */
	channelName: string
	/** beginning of the query (time) range as an ISO8601 string */
	begDate: string
	/**
	 * end of the query (time) range as an ISO8601 string
	 *
	 * `endDate` may be a point of time in the future; see DataApiV4EventsQueryResult.finalisedRange.
	 */
	endDate: string
}

/** response for an events query operation */
export type DataApiV4EventsQueryResult = {
	/** indicates if the queried time range is finalised, i.e. no more data will be added. */
	finalisedRange?: boolean
	/** indicates if the query ran into a timeout. */
	timedOut?: boolean
	/** seconds after UNIX epoch. serves as the base for the other offsets. */
	tsAnchor: number
	/** milliseconds offsets to `tsAnchor` */
	tsMs: number[]
	/** nanoseconds offsets to `tsAnchor + tsMs[i]` */
	tsNs: number[]
	/** the values */
	values: number[]
}

/** options for a binned query operation */
export type DataApiV4BinnedQueryOptions = {
	/** the backend where the channel is stored */
	channelBackend: string
	/** the name of the channel */
	channelName: string
	/** beginning of the query (time) range as an ISO8601 string */
	begDate: string
	/**
	 * end of the query (time) range as an ISO8601 string
	 *
	 * `endDate` may be a point of time in the future; see DataApiV4EventsQueryResult.finalisedRange.
	 */
	endDate: string
	/** number of _requested_ bins for this time range. */
	binCount: number
	/** binning scheme for waveforms.
	 *  - `undefined` (default): waveform is first binned to a scalar.
	 *  - `'binnedX': waveform is binned in X direction (along the waveform array)
	 */
	binningScheme?: 'binnedX'
	/** binning for waveforms (if `binningScheme == 'binnedX'`)
	 * - `0`: keep full length
	 * - number `> 0`: bin in X direction to the specified number of bins
	 */
	binnedXcount?: number
}

/** response for a binned query operation */
export type DataApiV4BinnedQueryResult = {
	/** indicates if the queried time range is finalised, i.e. no more data will be added. */
	finalisedRange?: boolean
	/** use this for the next `begDate`. used for paging (indicates a partial result). */
	continueAt?: string
	/** indicates how many more bins there will be to complete the data set. used for paging (indicates a partial result). */
	missingBins?: number
	/** seconds after UNIX epoch. serves as the base for the other offsets. */
	tsAnchor: number
	/** milliseconds offsets to `tsAnchor` */
	tsMs: number[]
	/** nanoseconds offsets to `tsAnchor + tsMs[i]` */
	tsNs: number[]
	/** aggregated values: event counts */
	counts: number[]
	/** aggregated values: averages */
	avgs: number[]
	/** aggregated values: minimums */
	mins: number[]
	/** aggregated values: maximums */
	maxs: number[]
}

/**
 * Client for Data API v4
 *
 * see https://data-api.psi.ch/api/4/documentation/ for details on the API
 */
export class DataApiV4Client {
	constructor(private baseUrl: string) {}

	/** search for channels */
	public async searchChannels(
		searchOptions: DataApiV4ChannelSearchOptions
	): Promise<DataApiV4ChannelSearchResult> {
		const params = objectToGetParams(searchOptions)
		const url = `${this.baseUrl}/search/channel?${params}`
		const result = (await get(url)) as DataApiV4ChannelSearchResult
		// TODO: validate result
		// const _ = someDecoder(result) // throws, if not OK
		return result
	}

	/** list the backends */
	public async listBackends(): Promise<string[]> {
		const url = `${this.baseUrl}/backends`
		const result = (await get(url)) as string[]
		// TODO: validate result
		// const _ = someDecoder(result) // throws, if not OK
		return result
	}

	/** query for data (raw) */
	public async queryEvents(
		queryOptions: DataApiV4EventsQueryOptions
	): Promise<DataApiV4EventsQueryResult> {
		const params = objectToGetParams(queryOptions)
		const url = `${this.baseUrl}/events?${params}`
		const result = (await get(url)) as DataApiV4EventsQueryResult
		// TODO: validate result
		// const _ = someDecoder(result) // throws, if not OK
		return result
	}

	/** query for data (binned) */
	public async queryBinned(
		queryOptions: DataApiV4BinnedQueryOptions
	): Promise<DataApiV4BinnedQueryResult> {
		const params = objectToGetParams(queryOptions)
		const url = `${this.baseUrl}/binned?${params}`
		const result = (await get(url)) as DataApiV4BinnedQueryResult
		// TODO: validate result
		// const _ = someDecoder(result) // throws, if not OK
		return result
	}
}
