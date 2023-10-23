export enum Roles {
  ARTIST = "artist",
  GALLERY = "gallery",
  COLLECTOR = "collector",
  INSTITUTION = "institution",
}

export const ROLES_TO_IDS = {
  [Roles.ARTIST]: "a83119de-b2d7-45b5-8407-ca5150150a14",
  [Roles.GALLERY]: "44502c52-8d34-42ca-935a-ff45e5d36b0d",
  [Roles.COLLECTOR]: "22e65d8b-7d77-4586-b43d-8487f9573ef7",
  [Roles.INSTITUTION]: "92f17d47-af72-41ed-a00d-6eb6d30e369e",
};

export const ROLE_IDS_TO_ROLES = {
  ["a83119de-b2d7-45b5-8407-ca5150150a14"]: Roles.ARTIST,
  ["44502c52-8d34-42ca-935a-ff45e5d36b0d"]: Roles.GALLERY,
  ["22e65d8b-7d77-4586-b43d-8487f9573ef7"]: Roles.COLLECTOR,
  ["92f17d47-af72-41ed-a00d-6eb6d30e369e"]: Roles.INSTITUTION,
};
