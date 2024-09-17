import { sessionStorage } from '../shopify.server';  // Import your session storage setup

// Function to get access token from the session
async function getAccessToken(request) {
  const session = await sessionStorage.getSession(request.headers.get('Cookie'));
  const accessToken = session.get('accessToken');
  
  if (!accessToken) {
    throw new Error("No access token found");
  }
  
  return accessToken;
}

// Function to make Shopify REST API requests
export async function shopifyRestApiRequest(endpoint, request) {
  const accessToken = await getAccessToken(request);

  const response = await fetch(`https://htm-dev-store.myshopify.com/admin/api/2024-07${endpoint}`, {
    method: 'GET',
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data from Shopify API");
  }

  const data = await response.json();
  return data;
}
