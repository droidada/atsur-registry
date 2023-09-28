import { createDirectus, rest } from "@directus/sdk";

const directus = createDirectus(
  process.env.NEXT_PUBLIC_DIRECTUS_API_ENDPOINT,
).with(rest());
export default directus;
