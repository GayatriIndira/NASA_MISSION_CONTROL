const http = require('http');
require('dotenv').config();
const app = require('./app');

const { mongoConnect } = require('./services/mongo');

const { loadPlanetsData } = require('./models/planetsModel');

const { loadLaunchData} = require('./models/launchesModel');

const PORT = process.env.PORT || 5001;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log("Listening to port 5000");
    });
}

startServer();