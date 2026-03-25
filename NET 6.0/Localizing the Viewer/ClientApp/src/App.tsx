import React from 'react';
import { StimulsoftViewer } from 'stimulsoft-viewer-react';

export const App: React.FC = () => {
    return (
        <StimulsoftViewer
            requestUrl="http://localhost:60802/Viewer/{action}"
            action="InitViewer"
            height="100vh"
        />
    );
};
