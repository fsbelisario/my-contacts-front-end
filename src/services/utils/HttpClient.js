import delay from '../../utils/delay';

class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async get(path) {
    const response = await fetch(`${this.baseURL}${path}`);

    await delay(500);// Delay forçado para simular o Loader

    return response.json();
  }
}

export default HttpClient;
