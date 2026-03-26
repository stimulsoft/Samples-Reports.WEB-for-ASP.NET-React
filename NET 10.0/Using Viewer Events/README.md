# Using Viewer Events

This example illustrates how to use Stimulsoft React Viewer events.

### Step by step

#### App.tsx

    import { StimulsoftViewer } from 'stimulsoft-viewer-react';

Define event handlers:

    const loaded = (): void => {
        console.log('Report loaded');
    };

    const onExport = (event: any): void => {
        console.log(`Export to: ${event.exportFormat}`);
    };

Pass event handlers as props:

    <StimulsoftViewer
      requestUrl="http://localhost:60801/Viewer/{action}"
      action="InitViewer"
      height="100vh"
      onLoaded={loaded}
      onExport={onExport}
    />
