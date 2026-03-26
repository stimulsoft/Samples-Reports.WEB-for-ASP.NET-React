# Using API Methods

This example illustrates how to execute methods of the StimulsoftViewer component.
The StimulsoftViewer component exposes a ref handle that allows you to manipulate the viewer.

### Step by step

#### App.tsx

    import { StimulsoftViewer, StimulsoftViewerHandle } from 'stimulsoft-viewer-react';

Define reference to StimulsoftViewer:

    const viewerRef = useRef<StimulsoftViewerHandle>(null);

Use the ref to call API methods:

    viewerRef.current.export('Pdf', { ImageResolution: 200 });

#### App.tsx template
Add reference to component, add button that exports report to PDF format with ImageResolution set to 200:

    <input type="button" onClick={() => viewerRef.current.export('Pdf', { ImageResolution: 200 })} value="Export to PDF" />
    <StimulsoftViewer
      ref={viewerRef}
      requestUrl="http://localhost:60801/Viewer/{action}"
      action="InitViewer"
      height="100vh"
    />
