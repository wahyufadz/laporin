import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to copy a file
function copyFile(source, destination) {
  try {
    // Check if source file exists
    if (!fs.existsSync(source)) {
      console.error(`Error: Source file ${source} does not exist.`);
      return false;
    }

    // Check if destination file already exists
    if (fs.existsSync(destination)) {
      console.log(`Warning: Destination file ${destination} already exists.`);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      return new Promise((resolve) => {
        rl.question(`Do you want to overwrite ${destination}? (y/n): `, (answer) => {
          rl.close();
          if (answer.toLowerCase() !== 'y') {
            console.log(`Skipping ${destination}`);
            resolve(false);
            return;
          }
          performCopy();
        });

        function performCopy() {
          try {
            fs.copyFileSync(source, destination);
            console.log(`Successfully copied ${source} to ${destination}`);
            resolve(true);
          } catch (err) {
            console.error(`Error copying ${source} to ${destination}:`, err);
            resolve(false);
          }
        }
      });
    } else {
      // Perform the copy
      fs.copyFileSync(source, destination);
      console.log(`Successfully copied ${source} to ${destination}`);
      return true;
    }
  } catch (err) {
    console.error(`Error copying ${source} to ${destination}:`, err);
    return false;
  }
}

// Main function
async function main() {
  console.log('Setting up environment files...');
  
  // Copy .env.example to .env
  const envResult = await copyFile('.env.example', '.env');
  
  // Copy customer-data.example.ts to customer-data.ts
  const customerDataResult = await copyFile(
    path.join('src', 'lib', 'customer-data.example.ts'),
    path.join('src', 'lib', 'customer-data.ts')
  );
  
  if (envResult && customerDataResult) {
    console.log('\nSetup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Edit .env file with your actual WhatsApp number');
    console.log('2. Edit src/lib/customer-data.ts with your actual customer data');
    console.log('3. Make sure both files are in your .gitignore');
    console.log('4. Run your application with: npm run dev');
  } else {
    console.log('\nSetup completed with some issues. Please check the logs above.');
  }
}

// Run the main function
main().catch(err => {
  console.error('An error occurred during setup:', err);
  process.exit(1);
}); 