import fs from 'fs';

async function convertCredentials() {
    try {
        // Baca file credential.json
        const credentials = fs.readFileSync('google-oauth-credential.json', 'utf-8');

        // Konversi ke base64
        const base64Credentials = Buffer.from(credentials).toString('base64');

        // Tampilkan hasil
        console.log('\nCopy the following base64 string and paste it into your .env.local and Vercel environment variables:\n');
        console.log('\nEnvironment variable \n');
        console.log('GOOGLE_APPLICATION_CREDENTIALS: ' + base64Credentials);

    } catch (error) {
        console.error('Error:', error);
        console.error('\nMake sure you have a google-oauth-credential.json file in your project root directory.\n');
    }
}

convertCredentials();
