const request = require('request');

const createJsonController = endpoint => async (req, res) => {

  const lastChar = endpoint.slice(-1);
  if (lastChar !== '/') {
    endpoint = endpoint + '/';
  }

  const { id } = req.params;
  const options = {
    'method': 'GET',
    'uri': `${endpoint}${id}`,
  };
  request(options, (error, res2, body) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return error;
    }
    res.json(JSON.parse(body));
  });
};

// Benny
const workspace = createJsonController('http://54.193.132.156:4000/workspace-api/workspace');
const amenities = createJsonController('http://54.219.57.231:4002/amenities-api/amenity');

// Chris
// Can't use createJsonController because this uses req.query
const availability = async (req, res) => {
  const { id } = req.query;
  const options = {
    'method': 'GET',
    'uri': `http://3.140.156.174:3001/api/availability/?id=${id}`,
  };
  request(options, (error, res2, body) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return error;
    }
    res.json(JSON.parse(body));
  });
};
const transit = createJsonController('http://3.140.156.174:3002/api/getNearbyTransitOptions');

// Emmanuel
const address = createJsonController('http://ec2-54-177-170-134.us-west-1.compute.amazonaws.com:5001/api/nearbyworkspaces/address');
const nearbyBuildings = createJsonController('http://ec2-54-177-170-134.us-west-1.compute.amazonaws.com:5001/api/nearbyworkspaces/buildings');
const reviews = createJsonController('http://ec2-184-169-176-177.us-west-1.compute.amazonaws.com/api/reviews/all');
const reviewInfo = createJsonController('http://ec2-184-169-176-177.us-west-1.compute.amazonaws.com/api/reviews/info');

// Josh
const description = createJsonController('http://54.151.43.93:6060/api/workspace-description');
const photos = createJsonController('http://54.151.43.93:6001/api/photos');
const photosByWorkspace = createJsonController('http://54.151.43.93:6001/api/photos/workspace');

module.exports = {
  address,
  amenities,
  availability,
  description,
  nearbyBuildings,
  photos,
  photosByWorkspace,
  reviews,
  reviewInfo,
  transit,
  workspace,
};

