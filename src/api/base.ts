const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function request(endpoint: string, method: string = 'GET') {
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
    throw Error(response.statusText);
  }
}

const get = (endpoint: string) => {
  return request(endpoint);
};

const swapi = {
  get,
};

export default swapi;
