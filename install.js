const { exec } = require('child_process');

console.log('Installing project dependencies...');
exec('npm install', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log('Dependencies installed successfully.');
});
