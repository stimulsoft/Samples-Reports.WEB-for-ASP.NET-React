import React from 'react';
import { StimulsoftViewer } from 'stimulsoft-viewer-react';

export const App: React.FC = () => {
    const loaded = (): void => {
        console.log('Report loaded');
    };

    const onExport = (event: any): void => {
        console.log(`Export to: ${event.format}`);
    };

    return (
        <StimulsoftViewer
            requestUrl="http://localhost:60801/Viewer/{action}"
            action="InitViewer"
            height="100vh"
            onLoaded={loaded}
            onExport={onExport}
        />
    );
};
