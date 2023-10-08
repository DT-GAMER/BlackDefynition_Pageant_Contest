const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require("mongoose");
const app = express();

const { mongoUserName, password, clusterName, dbName } = process.env;
const mongoDB_URI = `mongodb+srv://${mongoUserName}:${password}@${clusterName}.glawdte.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(`Error connecting to database! `, err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("BlackDefynition Pageant Contest App is online!");
})

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined'));

// Load and use routes
const authRoutes = require('./routes/authRoutes');
const pollRoutes = require('./routes/pollRoutes');
const voteRoutes = require('./routes/voteRoutes');
const userRoutes = require('./routes/userRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/polls', pollRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

// Error handling middleware
const errorHandlers = require('./utils/errorHandlers');


app.use((err, req, res, next) => {
  errorHandlers.handleError(err, res);
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("App started and lisening on port ", port))

