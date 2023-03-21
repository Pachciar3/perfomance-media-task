const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(endpoint: string, method: string = 'GET') {
  try {
    const config: RequestInit = {
      method,
      headers: {
        'Content-type': 'application/json',
      },
    };
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, config);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Bad response code: ${response.status}`);
    }
  } catch (e) {
    console.error(e);
    throw new Error(`Error from ${request.name}: ${e}`);
  }
}

const get = (endpoint: string) => {
  return request(endpoint);
};

const swapi = {
  get,
};

export default swapi;
