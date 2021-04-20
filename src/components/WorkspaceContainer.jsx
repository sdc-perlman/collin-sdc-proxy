import React from 'react';
// import axios from 'axios';
import Workspace from './workspace/Workspace';
import Title from './Title';

const nearbyAPI = '/api/nearbyworkspaces';

export default ({ nearbyWorkspaces }) => {
  const [locs, setLocs] = React.useState(nearbyWorkspaces ? nearbyWorkspaces.nearbyWorkspaces : []);
  const [pic, setPic] = React.useState(nearbyWorkspaces ? nearbyWorkspaces.photos : []);

  React.useEffect(async () => {
    if (!locs.length) {
      const splitUrl = window.location.pathname.split('/').filter((el) => el);
      const rawId = splitUrl[splitUrl.length - 1];
      try {
        if (Number.isNaN(rawId)) {
          throw new Error('no id');
        }
        axios.defaults.timeout = 3000;
        const { data: { nearbyWorkspaces, photos } } = await axios.get(`${nearbyAPI}/buildings/${rawId}`);
        setLocs(nearbyWorkspaces);
        setPic(photos);
      } catch (err) {
        console.log(err);
        setLocs(false);
      }
    }
  }, []);

  if (locs === null || locs === false || locs.length === 0) {
    return <></>;
  }

  return (
    <>
      <Title />
      {locs
        .map((location) => (
          <Workspace
            key={location.workspaceId}
            location={location}
            pic={pic}
          />
        ))}
    </>
  );
};
