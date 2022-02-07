/**
 * Module for working with the Query REST API.
 *
 * See https://git.psi.ch/sf_daq/ch.psi.daq.databuffer/blob/master/ch.psi.daq.queryrest/Readme.md
 */

import { queryChannelConfigs } from './query-channel-configs/index.js'
import type {
	ChannelConfigsQuery,
	ChannelConfigsResponse,
} from './query-channel-configs/index.js'
import { queryChannelNames } from './query-channel-names/index.js'
import type {
	ChannelNamesQuery,
	ChannelNamesResponse,
} from './query-channel-names/index.js'
import { queryData, queryDataRaw } from './query-data/index.js'
import type { DataQuery, DataResponse } from './query-data/index.js'
import {
	queryAggregations,
	queryBackends,
	queryCompression,
	queryConfigFields,
	queryEventFields,
	queryOrdering,
	queryResponseFormats,
} from './query-parameters/index.js'
import type { ParametersResponse } from './query-parameters/index.js'

export type {
	DataQuery,
	DataResponse,
	ChannelNamesQuery,
	ChannelNamesResponse,
	ChannelConfigsQuery,
	ChannelConfigsResponse,
	ParametersResponse,
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
	 * queryAggregations see [[ queryBackends ]]
	 */
	async queryAggregations(): Promise<ParametersResponse> {
		return queryAggregations(this.url)
	}

	/**
	 * queryBackends see [[ queryBackends ]]
	 */
	async queryBackends(): Promise<ParametersResponse> {
		return queryBackends(this.url)
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
	 * queryCompression see [[ queryBackends ]]
	 */
	async queryCompression(): Promise<ParametersResponse> {
		return queryCompression(this.url)
	}

	/**
	 * queryConfigFields see [[ queryBackends ]]
	 */
	async queryConfigFields(): Promise<ParametersResponse> {
		return queryConfigFields(this.url)
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

	/**
	 * queryEventFields see [[ queryBackends ]]
	 */
	async queryEventFields(): Promise<ParametersResponse> {
		return queryEventFields(this.url)
	}

	/**
	 * queryOrdering see [[ queryBackends ]]
	 */
	async queryOrdering(): Promise<ParametersResponse> {
		return queryOrdering(this.url)
	}

	/**
	 * queryResponseFormats see [[ queryBackends ]]
	 */
	async queryResponseFormats(): Promise<ParametersResponse> {
		return queryResponseFormats(this.url)
	}
}
