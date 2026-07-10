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

import React, { useRef, useState, useEffect } from 'react';
import { StimulsoftViewer, StimulsoftViewerHandle } from 'stimulsoft-viewer-react';

export const App: React.FC = () => {
    const viewerRef = useRef<StimulsoftViewerHandle>(null);
    const [zoom, setZoom] = useState<number>(100);
    const [currentPage, setCurrentPage] = useState<number>(0);

    // Update zoom and currentPage from the viewer every 200ms
    // (analogue of Angular binding viewer.api.zoom / viewer.api.currentPage)
    useEffect(() => {
        const interval = setInterval(() => {
            if (viewerRef.current) {
                setZoom(viewerRef.current.zoom);
                setCurrentPage(viewerRef.current.currentPage);
            }
        }, 200);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            Zoom is {zoom}<br />
            Current page {currentPage + 1}<br />
            <input
                type="button"
                onClick={() => { if (viewerRef.current) viewerRef.current.zoom = 50; }}
                value="Zoom to 50%"
            />
            <input
                type="button"
                onClick={() => { if (viewerRef.current) viewerRef.current.export('Pdf', { ImageResolution: 200 }); }}
                value="Export to PDF"
            />

            <StimulsoftViewer
                ref={viewerRef}
                requestUrl="/Viewer/{action}"
                action="InitViewer"
                height="100vh"
            />
        </div>
    );
};
