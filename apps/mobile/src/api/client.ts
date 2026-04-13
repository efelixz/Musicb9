const API_URL = 'http://localhost:8000';

export async function mobileApiFetch(endpoint: string, options: any = {}) {
  // Em um app real usaríamos SecureStore para o token
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  return response.json();
}

export const mobileAuth = {
  login: (credentials: any) => mobileApiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
};
