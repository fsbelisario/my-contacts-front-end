import delay from '../../utils/delay';

import APIError from '../../errors/APIError';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  get(path) {
    return this.makeRequest(path, { method: 'GET' });
  }

  post(path, body) {
    return this.makeRequest(path, {
      method: 'GET',
      body,
    });
  }

  async makeRequest(path, options) {
    await delay(500);// Delay forçado para simular o Loader

    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    });

    const contentType = response.headers.get('Content-Type');

    let responseBody = null;

    if (contentType.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
