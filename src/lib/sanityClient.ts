// lib/sanityClient.ts
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Your Sanity dataset
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION, // Use the current date for the API version
  useCdn: true, // Use CDN for fast reads
  allowReconfigure: true, // Allow reconfiguration of the client
});

export default client;
