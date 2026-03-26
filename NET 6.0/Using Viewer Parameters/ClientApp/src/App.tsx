import React, { useState, useMemo } from 'react';
import { StimulsoftViewer } from 'stimulsoft-viewer-react';

const reports = ['MasterDetail.mrt', 'EditableReport.mrt'];

export const App: React.FC = () => {
    const [reportName, setReportName] = useState(reports[0]);

    const properties = useMemo(() => ({ reportName }), [reportName]);

    return (
        <div>
            <select onChange={(e) => setReportName(e.target.value)} value={reportName}>
                {reports.map((item) => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>

            <StimulsoftViewer
                requestUrl="/Viewer/{action}"
                action="InitViewer"
                height="100vh"
                properties={properties}
            />
        </div>
    );
};
