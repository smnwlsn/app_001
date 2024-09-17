import { json } from "@remix-run/node";
import { shopifyRestApiRequest } from "../utils/shopify-api";  // Import your API utility

export const loader = async ({ request }) => {
  // Example: Fetch Products from Shopify REST API
  try {
    const productsData = await shopifyRestApiRequest('/products.json', request);

    return json({
      success: true,
      products: productsData.products,  // Return the product data to the frontend
    });
  } catch (error) {
    return json({ success: false, message: error.message });
  }
};
