/**
 * COMMON_FETCH_OPTIONS provides a base for `fetch` calls for working
 * with the databuffer REST API.
 *
 * Example:
 *
 * fetch(url, { ...COMMON_FETCH_OPTIONS, body: JSON.stringify(payloadData) }).then( ... )
 */
export const COMMON_FETCH_OPTIONS: RequestInit = {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'omit',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrer: 'no-referrer',
};

/**
 * post sends a HTTP POST request to a URL.
 *
 * It is a convenience function that does the following:
 *
 * - Automatically uses [[COMMON_FETCH_OPTIONS]]
 * - Applies `JSON.stringify` to the [[payload]]
 * - Checks if the Response was a success (`reponse.ok`)
 * - Extracts the payload of the response (`response.json()`)
 * - Adds a type cast for the payload's response
 *
 * @param url The URL to send the POST request to
 * @param payload The *optional* payload of the request
 */
export const post = async <T>(url: string, body?: any): Promise<T> => {
  const options: RequestInit = {
    ...COMMON_FETCH_OPTIONS,
    method: 'POST',
  };
  if (body !== undefined) options.body = JSON.stringify(body);
  return fetchWithTimeout<T>(url, options);
};

export const fetchWithTimeout = async <T>(
  url: string,
  options: RequestInit,
  timeout: number = 30000,
): Promise<T> => {
  const id = setTimeout(() => {
    throw new Error('Request timed out');
  }, timeout);
  try {
    const response = await fetch(url, options);
    clearTimeout(id);
    if (!response.ok) throw new Error(`${response.status}: ${response.statusText}`);
    return (await response.json()) as T;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};
