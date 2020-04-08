/**
 * Module for working with the Query REST API.
 *
 * See https://git.psi.ch/sf_daq/ch.psi.daq.databuffer/blob/master/ch.psi.daq.queryrest/Readme.md
 */

import { queryChannelNames } from './query-channel-names'
import type {
	ChannelNamesQuery,
	ChannelNamesResponse,
} from './query-channel-names'
import { queryData } from './query-data'
import type { DataQuery, DataResponse } from './query-data'

export type { DataQuery, DataResponse, ChannelNamesQuery, ChannelNamesResponse }

/**
 * QueryRest provides access to the `ch.psi.daq.queryrest` API.
 * It wraps the separate queries that can be run at the various API endpoints
 * by conveniently "remembering" the base URL (in [[url]]).
 */
export class QueryRest {
	private __url: string
	/**
	 * url is the part of the URL which is common to all endpoints of the API.
	 * It is the starting point of the backend's routing mechanism.
	 */
	public get url(): string {
		return this.__url
	}
	public set url(v: string) {
		this.__url = v
	}

	/**
	 * @param url Initialize [[url]]
	 */
	constructor(url: string) {
		this.__url = url
	}

	/**
	 * queryChannelNames see [[queryChannelNames]].
	 *
	 * @param query defines the query
	 */
	async queryChannelNames(
		query: ChannelNamesQuery
	): Promise<ChannelNamesResponse> {
		return queryChannelNames(this.url, query)
	}
	/**
	 * queryData see [[queryData]].
	 *
	 * @param query defines the query
	 */
	async queryData(query: DataQuery): Promise<DataResponse> {
		return queryData(this.url, query)
	}
}
