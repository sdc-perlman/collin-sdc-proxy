import express from 'express';
import axios from 'axios';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';

import NearbyService from '../src/components/NearbyService.jsx';

const port = 6002;
const app = express();
app.use(express.static('public'));

app.use('/buildings/:id', (req, res) => {
  const  { id } = req.params;

  fs.readFile('server/index.html', 'utf8', async (err, html) => {
    if(err) {
      console.log(err);
      return res.status(err.status || 500)
        .send({ success: false, status: err.status || 500, message: err.message });
    } else {
      try {
        const { data: initialData } = await axios.get('http://localhost:5001/api/nearbyworkspaces/buildings/' + id);
        const content = renderToString(<NearbyService initialData={initialData} />);
        const nearby = html.replace('<div id="nearby"></div>', `<div id="nearby">${content}</div>`);
        return res.send(nearby.replace(
          '<script defer="defer" id="global"></script>',
          `<script defer="defer" id="global">window.initial_data = ${JSON.stringify(initialData)}</script>`
      ));
      } catch(error) {
        console.log(error);
        res.send(html);
      }

    }
  })
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});