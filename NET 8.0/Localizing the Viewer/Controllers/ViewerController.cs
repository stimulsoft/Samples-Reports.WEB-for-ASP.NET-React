using Microsoft.AspNetCore.Mvc;
using Stimulsoft.Report;
using Stimulsoft.Report.React;

namespace Localization.Controllers
{
    [Controller]
    public class ViewerController : Controller
    {
        static ViewerController()
        {
            // How to Activate
            //Stimulsoft.Base.StiLicense.Key = "6vJhGtLLLz2GNviWmUTrhSqnO...";
            //Stimulsoft.Base.StiLicense.LoadFromFile("stimulsoft.key");
            //Stimulsoft.Base.StiLicense.LoadFromStream(stream);
        }

        [HttpPost]
        public IActionResult InitViewer()
        {
            var requestParams = StiReactViewer.GetRequestParams(this);

            var options = new StiReactViewerOptions();
            options.Actions.GetReport = "GetReport";
            options.Actions.ViewerEvent = "ViewerEvent";
            options.Toolbar.ShowPinToolbarButton = false;
            options.Appearance.ScrollbarsMode = true;
            options.Localization = StiReactHelper.MapPath(this, "Localization/de.xml");

            return StiReactViewer.ViewerDataResult(requestParams, options);
        }

        [HttpPost]
        public IActionResult GetReport()
        {
            var report = StiReport.CreateNewReport();
            var path = StiReactHelper.MapPath(this, $"Reports/MasterDetail.mrt");
            report.Load(path);

            return StiReactViewer.GetReportResult(this, report);
        }

        [HttpPost]
        public IActionResult ViewerEvent()
        {
            return StiReactViewer.ViewerEventResult(this);
        }
    }
}
