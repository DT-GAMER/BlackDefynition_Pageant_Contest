const mongoose = require('mongoose');

const { mongoUserName, password, clusterName, dbName } = process.env;
const mongoDB_URI = `mongodb+srv://${mongoUserName}:${password}@${clusterName}.glawdte.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(mongoDB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(`Error connecting to database! `, err));


app.get("/", (req, res) => {
    res.send("BlackDefynition Pageant Contest App is online!");
})

