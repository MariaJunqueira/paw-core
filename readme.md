# Meow Paw

## Server configurations

### Webpack configuration

#### For node.js + express

```javascript
const express = require("express");
const path = require("path");
const app = express();

// Serve any static files
app.use(express.static(path.join(__dirname, "dist")));

// Handle webpack routing, return all requests to the index.html of the app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
```

#### For Apache:

You would use an .htaccess file with a rewrite rule:

```bash
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

#### For Nginx

```bash
location / {
  try_files $uri /index.html;
}
```
