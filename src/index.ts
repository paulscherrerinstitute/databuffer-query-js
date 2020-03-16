/**
 * Module for working with the Query REST API.
 *
 * See https://git.psi.ch/sf_daq/ch.psi.daq.databuffer/blob/master/ch.psi.daq.queryrest/Readme.md
 */

import * as qChNames from './query-channel-names';
import * as qData from './query-data';

/**
 * QueryRest provides access to the `ch.psi.daq.queryrest` API.
 * It wraps the separate queries that can be run at the various API endpoints
 * by conveniently "remembering" the base URL (in [[url]]).
 */
export class QueryRest {
  private __url: string;
  /**
   * url is the part of the URL which is common to all endpoints of the API.
   * It is the starting point of the backend's routing mechanism.
   */
  public get url(): string {
    return this.__url;
  }
  public set url(v: string) {
    this.__url = v;
  }

  /**
   * @param url Initialize [[url]]
   */
  constructor(url: string) {
    this.__url = url;
  }

  /**
   * queryChannelNames see [[qChNames.queryChannelNames]].
   *
   * @param options defines the query
   */
  async queryChannelNames(options: qChNames.QueryOptions): Promise<qChNames.QueryResponse> {
    return qChNames.queryChannelNames(this.url, options);
  }
  /**
   * queryData see [[qData.queryData]].
   *
   * @param options defines the query
   */
  async queryData(options: qData.QueryRequest): Promise<qData.QueryResponse> {
    return qData.queryData(this.url, options);
  }
}
