// api/leaderboard.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets.readonly']
  );

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: 'Leaderboard!A1:F100',
    });

    res.status(200).json({ values: response.data.values });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
