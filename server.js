const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const contestRoutes = require('./routes/contestRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const loggerMiddleware = require('./middleware/loggerMiddleware');


const app = express();
const mongoose = require('mongoose');

const { mongoUserName, password, clusterName, dbName } = process.env;
const mongoDB_URI = `mongodb+srv://${mongoUserName}:${password}@${clusterName}.glawdte.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(`Error connecting to database! `, err));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("BlackDefynition Pageant Contest App is online!");
})


// Middleware
app.use(cors());
app.use(loggerMiddleware); // Use logger middleware for logging requests and responses
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));


// Routes
app.use('/auth', authRoutes);
app.use('/contest', authMiddleware, contestRoutes);
app.use('/admin', authMiddleware, adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

