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

import React, { useRef, useState } from 'react';
import { StimulsoftViewer } from 'stimulsoft-viewer-react';
import { StimulsoftDesigner, StimulsoftDesignerHandle } from 'stimulsoft-designer-react';

export const App: React.FC = () => {
    const [showViewer, setShowViewer] = useState(true);
    const designerRef = useRef<StimulsoftDesignerHandle>(null);

    return showViewer ? (
        <StimulsoftViewer
            requestUrl="/Viewer/{action}"
            action="InitViewer"
            height="100vh"
            onDesign={() => setShowViewer(false)}
        />
    ) : (
        <div style={{ height: '100vh' }}>
            <StimulsoftDesigner
                ref={designerRef}
                requestUrl="/api/designer"
                width="100%"
                height="100%"
                onDesignerLoaded={() => {
                    const el = designerRef.current?.containerElement;
                    if (el) el.style.height = '100%';
                }}
            >
                Loading designer...
            </StimulsoftDesigner>
        </div>
    );
};
