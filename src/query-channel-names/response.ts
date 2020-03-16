/**
 * QueryResponse defines the structure of the response from the API.
 */
export type QueryResponse = Array<QueryResponseItem>;

/**
 * QueryResponseItem defines the structure of a single item of [[QueryResponse]].
 */
export interface QueryResponseItem {
  /**
   * backend is the name of the backend where the [[channels]] are
   * available.
   */
  backend: string;

  /**
   * channels contains a list of the channel names on this item's
   * [[backend]], that satisfy the query's criteria.
   */
  channels: Array<string>;
}
