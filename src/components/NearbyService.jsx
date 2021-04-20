import React from 'react';
import WorkspaceContainer from './WorkspaceContainer';

const NearbyService = ( {nearbyWorkspaces} ) => {
    return <WorkspaceContainer nearbyWorkspaces={nearbyWorkspaces} />;
};

export default NearbyService;
