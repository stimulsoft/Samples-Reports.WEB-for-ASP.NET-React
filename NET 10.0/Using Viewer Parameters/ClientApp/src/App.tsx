/*
{*******************************************************************}
{                                                                   }
{   Stimulsoft Reports.REACT                                        }
{                                                                   }
{                                                                   }
{   Copyright (C) 2003-2026 Stimulsoft                              }
{   ALL RIGHTS RESERVED                                             }
{                                                                   }
{   The entire contents of this file is protected by U.S. and       }
{   International Copyright Laws. Unauthorized reproduction,        }
{   reverse-engineering, and distribution of all or any portion of  }
{   the code contained in this file is strictly prohibited and may  }
{   result in severe civil and criminal penalties and will be       }
{   prosecuted to the maximum extent possible under the law.        }
{                                                                   }
{   RESTRICTIONS                                                    }
{                                                                   }
{   THIS SOURCE CODE AND ALL RESULTING INTERMEDIATE FILES           }
{   ARE CONFIDENTIAL AND PROPRIETARY                                }
{   TRADE SECRETS OF Stimulsoft                                     }
{                                                                   }
{   CONSULT THE END USER LICENSE AGREEMENT FOR INFORMATION ON       }
{   ADDITIONAL RESTRICTIONS.                                        }
{                                                                   }
{*******************************************************************}
*/

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
