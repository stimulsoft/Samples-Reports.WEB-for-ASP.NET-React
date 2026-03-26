# Using Viewer Parameters

This example illustrates how to pass necessary properties from React to server.

### Step by step

#### App.tsx

Transfer parameter *reportName*:

    const reports = ['MasterDetail.mrt', 'EditableReport.mrt'];
    const [reportName, setReportName] = useState(reports[0]);

Define properties:

    const properties = useMemo(() => ({ reportName }), [reportName]);

Pass properties to the viewer:

    <StimulsoftViewer
      requestUrl="http://localhost:60801/Viewer/{action}"
      action="InitViewer"
      height="100vh"
      properties={properties}
    />

#### ViewerController.cs

Check request parameter with name *properties*:

    var reportName = "MasterDetail.mrt";
    var properties = httpContext.Request.Params["properties"]?.ToString();
    if (properties != null)
    {
        var data = Convert.FromBase64String(properties);
        var json = Encoding.UTF8.GetString(data);
        var jsonObject = JsonConvert.DeserializeObject(json) as JToken;
        reportName = jsonObject["reportName"]?.ToString() ?? reportName;
    }
