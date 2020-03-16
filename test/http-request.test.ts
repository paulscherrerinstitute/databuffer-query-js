import { GlobalWithFetchMock } from 'jest-fetch-mock';

import { COMMON_FETCH_OPTIONS, post } from '../src/http-request';

const DEFAULT_URL = 'http://localhost:8080';

describe('http-request', () => {
  it('post sends out a POST request to the right URL', async () => {
    expect.hasAssertions();
    (global as GlobalWithFetchMock).fetch.mockResponse('[]');
    await post(DEFAULT_URL);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect((fetch as jest.Mock).mock.calls[0][0]).toEqual(DEFAULT_URL);
    expect((fetch as jest.Mock).mock.calls[0][1]).toHaveProperty('method', 'POST');
  });

  it('post uses the COMMON_FETCH_OPTIONS', async () => {
    expect.hasAssertions();
    (global as GlobalWithFetchMock).fetch.mockResponse('[]');
    await post(DEFAULT_URL);
    expect(fetch).toHaveBeenCalledTimes(1);
    Object.keys(COMMON_FETCH_OPTIONS).forEach(el => {
      expect((fetch as jest.Mock).mock.calls[0][1]).toHaveProperty(
        el,
        (COMMON_FETCH_OPTIONS as any)[el],
      );
    });
  });

  it('post sends the payload as JSON string in the body of the request', async () => {
    expect.hasAssertions();
    const payload = { just: 'some', test: 'data' };
    (global as GlobalWithFetchMock).fetch.mockResponse('[]');
    await post(DEFAULT_URL, payload);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect((fetch as jest.Mock).mock.calls[0][1]).toHaveProperty('body', JSON.stringify(payload));
  });

  it('post fails on rejected fetch Promise', async () => {
    expect.assertions(3);
    (global as GlobalWithFetchMock).fetch.mockReject(new Error('fake network error'));
    try {
      await post(DEFAULT_URL);
    } catch (e) {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('fake network error');
    }
  });

  it('post fails if !response.ok', async () => {
    expect.assertions(3);
    (global as GlobalWithFetchMock).fetch.mockResponse('', {
      status: 500,
      statusText: 'some status',
    });
    try {
      await post(DEFAULT_URL);
    } catch (e) {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(e).toBeInstanceOf(Error);
      expect(e.message).toBe('500: some status');
    }
  });
});
