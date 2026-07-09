using Microsoft.AspNetCore.Mvc;
using Stimulsoft.Report;
using Stimulsoft.Report.React;
using Stimulsoft.Report.Web;
using Stimulsoft.System.Web.UI.WebControls;

namespace Using_Designer_Events.Controllers
{
    [Produces("application/json")]
    [Route("api/designer")]
    public class DesignerController : Controller
    {
        static DesignerController()
        {
            // How to Activate
            //Stimulsoft.Base.StiLicense.Key = "6vJhGtLLLz2GNviWmUTrhSqnO...";
            //Stimulsoft.Base.StiLicense.LoadFromFile("stimulsoft.key");
            //Stimulsoft.Base.StiLicense.LoadFromStream(stream);
        }

        [HttpGet]
        public IActionResult Get()
        {
            // Setting the required options on the server side
            var requestParams = StiReactDesigner.GetRequestParams(this);
            if (requestParams.Action == StiAction.Undefined)
            {
                var options = new StiReactDesignerOptions();
                options.Height = Unit.Percentage(100);
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

        public IActionResult GetReport()
        {
            var report = StiReport.CreateNewReport();
            var path = StiReactHelper.MapPath(this, "Reports/MasterDetail.mrt");
            report.Load(path);

            return StiReactDesigner.GetReportResult(this, report);
        }

        public IActionResult SaveReport()
        {
            var report = StiReactDesigner.GetReportObject(this);

            var path = StiReactHelper.MapPath(this, "Reports/MasterDetail.mrt");
            report.Save(path);

            return StiReactDesigner.SaveReportResult(this);
        }
    }
}
