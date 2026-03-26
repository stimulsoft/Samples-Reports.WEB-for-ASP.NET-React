using Microsoft.AspNetCore.Mvc;
using Stimulsoft.Base.Json;
using Stimulsoft.Base.Json.Linq;
using Stimulsoft.Report;
using Stimulsoft.Report.React;
using System;
using System.Text;

namespace Using_Viewer_Parameters.Controllers
{
    [Controller]
    public class ViewerController : Controller
    {
        static ViewerController()
        {
            // How to Activate
            //Stimulsoft.Base.StiLicense.Key = "6vJhGtLLLz2GNviWmUTrhSqnO...";
            //Stimulsoft.Base.StiLicense.LoadFromFile("license.key");
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

            return StiReactViewer.ViewerDataResult(requestParams, options);
        }

        [HttpPost]
        public IActionResult GetReport()
        {
            var reportName = "MasterDetail.mrt";
            var httpContext = new Stimulsoft.System.Web.HttpContext(this.HttpContext);
            var properties = httpContext.Request.Params["properties"]?.ToString();
            if (properties != null)
            {
                var data = Convert.FromBase64String(properties);
                var json = Encoding.UTF8.GetString(data);
                var jsonObject = JsonConvert.DeserializeObject(json) as JToken;
                reportName = jsonObject["reportName"]?.ToString() ?? reportName;
            }

            var report = StiReport.CreateNewReport();
            var path = StiReactHelper.MapPath(this, $"Reports/{reportName}");
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
