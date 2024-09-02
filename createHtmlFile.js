const fs = require('fs');
const path = require('path');

// Define the path and content of the HTML file
const filePath = path.join(__dirname, 'build', 'index.html');
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <!-- Scripts are added automatically by CRA during the build process -->
  </body>
</html>
`;

// Create the directory if it does not exist
fs.mkdirSync(path.dirname(filePath), { recursive: true });

// Write the HTML content to the file
fs.writeFileSync(filePath, htmlContent, 'utf8');

console.log('index.html file created');
