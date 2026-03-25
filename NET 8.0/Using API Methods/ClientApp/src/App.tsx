import React, { useRef, useState, useEffect } from 'react';
import { StimulsoftViewer, StimulsoftViewerHandle } from 'stimulsoft-viewer-react';

export const App: React.FC = () => {
    const viewerRef = useRef<StimulsoftViewerHandle>(null);
    const [zoom, setZoom] = useState<number>(100);
    const [currentPage, setCurrentPage] = useState<number>(0);

    // Обновляем zoom и currentPage из viewer каждые 200ms
    // (аналог Angular binding viewer.api.zoom / viewer.api.currentPage)
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
                requestUrl="http://localhost:60801/Viewer/{action}"
                action="InitViewer"
                height="100vh"
            />
        </div>
    );
};
