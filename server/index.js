require('newrelic');

const path = require('path');
const express = require('express');
const axios = require ('axios');
const morgan = require('morgan');
const cors = require('cors');
const get = require('./controllers.js');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(morgan('dev'));
app.use(cors());

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/buildings/:workspaceId', express.static(path.join(__dirname, '../client/dist')));


// Josh
// app.get('/api/availability', get.availability);
// app.get('/api/getNearbyTransitOptions/:id', get.transit);

// Becky
// app.get('/api/photos/:id', get.photos);
// app.get('/api/photos/workspace/:id', get.photosByWorkspace);

// Dane
// app.get('/api/reviews/all/:id', get.reviews);
// app.get('/api/reviews/info/:id', get.reviewInfo);

// Collin
app.get('/api/nearbyworkspaces/buildings/:id', get.nearbyBuildings);
// const { data: photos } = await axios.get(`http://localhost:5001/api/photos/${workspaceId}?ids=${locationPointers.map((x) => x.workspaceId).join(',')}`);
// app.get('/api/nearbyworkspaces/address/:id', get.address);

// Port 6000 is insecure for chrome, otherwise I would use 6000
const port = process.env.PORT ? process.env.PORT : 6002;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

