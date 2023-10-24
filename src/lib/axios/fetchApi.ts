// import { getServerSession } from "next-auth";
// import { options } from "../../pages/api/auth/[...nextauth]";
// import Cookies from "js-cookie";

// const BASE_URL = "https://directus-admin-service-mr73ptziua-uc.a.run.app/";

// async function refreshToken(refreshToken: string) {
//   const res = await fetch(BASE_URL + "auth/refresh", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       refresh: refreshToken,
//     }),
//   });
//   const data = await res.json();
//   console.log({ data });
//   Cookies.set("token", data.accessToken);
//   return data.accessToken;
// }

// export async function AuthGetApi(url: string) {
//   const session: any = await getServerSession(options);
//   console.log("before: ", session?.user.accessToken);

//   let res = await fetch(BASE_URL + url, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${session?.user?.accessToken || Cookies.get("token")}`,
//     },
//   });

//   if (res.status == 401) {
//     if (session)
//       session.user.accessToken = await refreshToken(
//         Cookies.get("token") || session?.user?.refreshToken
//       );
//     console.log("after: ", session?.user.accessToken);

//     res = await fetch(BASE_URL + url, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${session?.user?.accessToken || Cookies.get("token")}`,
//       },
//     });
//     return await res.json();
//   }

//   return await res.json();
// }
