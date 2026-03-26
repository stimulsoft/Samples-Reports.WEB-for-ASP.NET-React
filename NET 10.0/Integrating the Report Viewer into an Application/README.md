# Integrating the Report Viewer into an Application

This example illustrates loading of the report with React Viewer.

### Step by step

#### App.tsx

Import and add *StimulsoftViewer* component:

    import { StimulsoftViewer } from 'stimulsoft-viewer-react';

Define URL template to server controller:

    requestUrl="http://localhost:60801/Viewer/{action}"

Define controller action that handle viewer initial request:

    action="InitViewer"

Define viewer height:

    height="100vh"

#### ViewerController.cs

Define action that handle viewer initial request:

    public IActionResult InitViewer()
    {
        var requestParams = StiReactViewer.GetRequestParams(this);
Define React viewer options:

        var options = new StiReactViewerOptions();

Define ViewerEvent that will handle viewer request:

        options.Actions.ViewerEvent = "ViewerEvent";

Get the initial data for React Viewer:

        return StiReactViewer.ViewerDataResult(requestParams, options);
    }

Define action that handle viewer requests:

    public IActionResult ViewerEvent()
    {
        return StiReactViewer.ViewerEventResult(this);
    }
