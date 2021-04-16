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

app.get('/api/nearbyworkspaces/buildings/:id', get.nearbyBuildings);
app.post('/api/nearbyworkspaces/buildings/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data: { origin } } = await axios.post(`http://localhost:5001/api/nearbyworkspaces/buildings/${id}`,{
      ...req.body,
    });
    res.status(200)
      .json({ origin });
  } catch (err) {
    console.log(err);
    res.status(err.status || 500)
      .send({ success: false, status: err.status || 500, message: err.message });
  }
});
// const { data: photos } = await axios.get(`http://localhost:5001/api/photos/${workspaceId}?ids=${locationPointers.map((x) => x.workspaceId).join(',')}`);
// app.get('/api/nearbyworkspaces/address/:id', get.address);

// Port 6000 is insecure for chrome, otherwise I would use 6000
const port = process.env.PORT ? process.env.PORT : 6002;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

