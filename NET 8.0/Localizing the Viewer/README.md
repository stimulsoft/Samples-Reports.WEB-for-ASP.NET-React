# Localizing the Viewer

This example illustrates how to localize the viewer. To select localization, it is enough to set the path to the localization XML file as the value of the Localization option.

### Step by step

#### ViewerController.cs

    public IActionResult InitViewer()
    {
       var requestParams = StiReactViewer.GetRequestParams(this);
       var options = new StiReactViewerOptions();
       options.Actions.ViewerEvent = "ViewerEvent";

Set the path to the localization XML file as the value of the Localization option:

       options.Localization = StiReactHelper.MapPath(this, "Localization/de.xml");
       return StiReactViewer.ViewerDataResult(requestParams, options);
    }
