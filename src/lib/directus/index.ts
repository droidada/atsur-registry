import { createDirectus } from "@directus/sdk";
const directus = createDirectus(process.env.DIRECTUS_API_ENDPOINT);
export default directus;
