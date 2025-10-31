import * as arctic from "arctic";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUrl = process.env.GOOGLE_REDIRECT_URL;

if (!clientId || !clientSecret || !redirectUrl) {
  throw new Error("Google Credientials is undefined");
}

export const google = new arctic.Google(clientId, clientSecret, redirectUrl);
