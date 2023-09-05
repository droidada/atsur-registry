import getConfig from "next/config";
import {
  createDirectus,
  rest,
  auth,
  withToken,
  authentication,
} from "@directus/sdk";

const directus = createDirectus(
  // `https://directus-admin-service-mr73ptziua-uc.a.run.app/`
  process.env.NEXT_PUBLIC_API_DOMAIN
)
  .with(rest())
  .with(authentication());

export default directus;
