import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function getGoogleAuth() {
    const auth = new GoogleAuth({
        scopes: SCOPES,
    });

    return auth;
}

export async function getSheetsClient() {
    const auth = await getGoogleAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    return sheets;
}
