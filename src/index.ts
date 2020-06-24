/**
 * Module for working with the Query REST API.
 *
 * See https://git.psi.ch/sf_daq/ch.psi.daq.databuffer/blob/master/ch.psi.daq.queryrest/Readme.md
 */

import { queryChannelConfigs } from './query-channel-configs'
import type {
	ChannelConfigsQuery,
	ChannelConfigsResponse,
} from './query-channel-configs'
import { queryChannelNames } from './query-channel-names'
import type {
	ChannelNamesQuery,
	ChannelNamesResponse,
} from './query-channel-names'
import { queryData, queryDataRaw } from './query-data'
import type { DataQuery, DataResponse } from './query-data'

export type {
	DataQuery,
	DataResponse,
	ChannelNamesQuery,
	ChannelNamesResponse,
	ChannelConfigsQuery,
	ChannelConfigsResponse,
}

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
	 * queryChannelConfigs see [[queryChannelConfigs]].
	 *
	 * @param query defines the query
	 */
	async queryChannelConfigs(
		query: ChannelConfigsQuery
	): Promise<ChannelConfigsResponse> {
		return queryChannelConfigs(this.url, query)
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

	/**
	 * queryDataRaw see [[queryDataRaw]].
	 *
	 * @param query defines the query
	 */
	async queryDataRaw(query: DataQuery): Promise<Response> {
		return queryDataRaw(this.url, query)
	}
}
