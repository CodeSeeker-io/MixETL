
import {
  google, // The top level object used to access services
  drive_v3, // For every service client, there is an exported namespace
  Auth, // Namespace for auth related types
  Common, // General types used throughout the library
} from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

//Auth client Object
const authClientObject = await auth.getClient();

//Google sheets instance
const googleSheetsInstance = google.sheets({
  version: 'v4',
  auth: authClientObject,
});

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

// spreadsheet id
const spreadsheetId = "YOUR SPREADSHEET ID";
