import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NearbyService from './components/NearbyService';

ReactDOM.hydrate(<NearbyService nearbyWorkspaces={window.initial_data}/>, document.getElementById('nearby'));
