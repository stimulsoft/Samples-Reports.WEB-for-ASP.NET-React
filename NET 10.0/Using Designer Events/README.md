# Using Designer Events

This example illustrates how to use React Designer component.
When click Design button in Viewer, Viewer close & shows Designer:

### Step by step

#### App.tsx
Import the viewer and designer components:

    import { StimulsoftViewer } from 'stimulsoft-viewer-react';
    import { StimulsoftDesigner, StimulsoftDesignerHandle } from 'stimulsoft-designer-react';

Show viewer or designer at once.
When user click Design button `onDesign` event occurs:

    const [showViewer, setShowViewer] = useState(true);

    return showViewer ? (
        <StimulsoftViewer
            requestUrl="/Viewer/{action}"
            action="InitViewer"
            height="100vh"
            onDesign={() => setShowViewer(false)}
        />
    ) : (

Define URL to designer controller, content inside the component is shown while designer loading:

        <StimulsoftDesigner
            requestUrl="/api/designer"
            width="100%"
            height="100%"
        >
            Loading designer...
        </StimulsoftDesigner>
    );

### DesignerController.cs

    namespace Using_Designer_Events.Controllers
    {
      [Produces("application/json")]
      [Route("api/designer")]
      public class DesignerController : Controller
      {
        [HttpGet]
        public IActionResult Get()
        {

Setting the required options on the server side:

          var requestParams = StiReactDesigner.GetRequestParams(this);
          if (requestParams.Action == StiAction.Undefined)
          {
            var options = new StiReactDesignerOptions();
            return StiReactDesigner.DesignerDataResult(requestParams, options);
          }
          return StiReactDesigner.ProcessRequestResult(this);
        }

        [HttpPost]
        public IActionResult Post()
        {
          var requestParams = StiReactDesigner.GetRequestParams(this);
          if (requestParams.ComponentType == StiComponentType.Designer)
          {
            switch (requestParams.Action)
            {
              case StiAction.GetReport:
                return GetReport();

              case StiAction.SaveReport:
                return SaveReport();
            }
          }
          return StiReactDesigner.ProcessRequestResult(this);
        }

Action on load report:

        public IActionResult GetReport()
        {
          var report = StiReport.CreateNewReport();
          var path = StiReactHelper.MapPath(this, "Reports/MasterDetail.mrt");
          report.Load(path);
          return StiReactDesigner.GetReportResult(this, report);
        }

Action on save report:

        public IActionResult SaveReport()
        {
          var report = StiReactDesigner.GetReportObject(this);
          var path = StiReactHelper.MapPath(this, "Reports/MasterDetail.mrt");
          report.Save(path);
          return StiReactDesigner.SaveReportResult(this);
        }
      }
    }

### ViewerController.cs

    public IActionResult InitViewer()
    {
      var requestParams = StiReactViewer.GetRequestParams(this);
      var options = new StiReactViewerOptions();

Enable Design button in viewer options:

      options.Toolbar.ShowDesignButton = true;
      options.Actions.ViewerEvent = "ViewerEvent";
      return StiReactViewer.ViewerDataResult(requestParams, options);
    }
