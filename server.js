// Import required modules
const express = require('express'); // Express web application framework
const dotenv = require('dotenv'); // Loads environment variables from .env file
const morgan = require('morgan'); // HTTP request logger middleware
const bodyparser = require("body-parser"); // Parses incoming request bodies
const path = require('path'); // Provides utilities for working with file and directory paths

const connectDB = require('./server/database/connection'); // Import database connection function

const app = express(); // Create an Express app

// Load environment variables from .env file
dotenv.config({ path: 'config.env' });

const PORT = process.env.PORT || 8080; // Set the port for the app to listen on

// Log incoming requests to the console
app.use(morgan('tiny'));

// Connect to the database
connectDB();

// Parse incoming request bodies
app.use(bodyparser.urlencoded({ extended: true }));

// Set the view engine for rendering HTML templates
app.set("view engine", "ejs");

// Serve static assets (CSS, images, JavaScript) from the "assets" directory
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// load routers
app.use('/', require('./server/routes/router'));

// Start the server and listen for incoming requests on the specified port
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});