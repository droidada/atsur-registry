import { GoogleAuth } from "google-auth-library";

export default async function getTokenClientAuth() {
  const url = "https://cloud-run-1234-uc.a.run.app";
  const auth = new GoogleAuth();
  let client = await auth.getIdTokenClient(url);
  // const res = await client.request({url});

  try {
    // Create a Google Auth client with the Renderer service url as the target audience.
    if (!client) client = await auth.getIdTokenClient(url);
    // Fetch the client request headers and add them to the service request headers.
    // The client request headers include an ID token that authenticates the request.
    const clientHeaders = await client.getRequestHeaders();

    return clientHeaders["Authorization"];
  } catch (err) {
    throw Error("could not create an identity token: " + err.message);
  }
}
