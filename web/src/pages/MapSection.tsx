


import React, { useEffect, useRef, useState } from 'react';
import { Viewer, Ion, Cartesian3, Math as CesiumMath } from 'cesium';
import "cesium/Build/Cesium/Widgets/widgets.css";

const MapSection: React.FC = () => {
  const cesiumContainer = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Viewer | null>(null);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    if (!cesiumContainer.current) return;

    
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2YTRiZjBlOC1hN2FkLTQyNTktOTk1ZS02MWVhZDQyYjUzOWEiLCJpZCI6MzQxNjE4LCJpYXQiOjE3NTc5ODE3MTF9.VJIXDbz8LVzRzK3AVc5DYvbRxohwJuXo77sMexeCuP0';

    
    const viewer = new Viewer(cesiumContainer.current, {
      terrainProvider: undefined,
      animation: false,
      timeline: false,
      baseLayerPicker: false,
      fullscreenButton: true,
      vrButton: false,
      geocoder: false,
      homeButton: false,
      infoBox: false,
      selectionIndicator: false,
      navigationHelpButton: false,
      scene3DOnly: true,
    });

    viewerRef.current = viewer;
    viewer.scene.screenSpaceCameraController.zoomFactor = 2.0;

    
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(29.1263, 40.1933, 1500),
      orientation: {
        heading: CesiumMath.toRadians(0.0),
        pitch: CesiumMath.toRadians(-45.0),
        roll: 0.0,
      },
      duration: 2
    });


    return () => {
      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy();
      }
      viewerRef.current = null;
    };
  }, []);

  
  const handleGoToBoulevard = () => {
    if (!viewerRef.current) return;

    setIsFlying(true);

    
    viewerRef.current.camera.flyTo({
      destination: Cartesian3.fromDegrees(29.1263, 40.1933, 1500), 
      orientation: {
        heading: CesiumMath.toRadians(0.0),
        pitch: CesiumMath.toRadians(-45.0), 
      },
      duration: 3,
      complete: () => {
        setIsFlying(false);
      }
    });
  };

  return (
    <div className="w-full h-full relative">
      {/* Cesium Container */}
      <div 
        ref={cesiumContainer} 
        className="w-full h-full"
        style={{ minHeight: '100%' }} 
      />

      {/* Bulvara Git Butonu */}
      <button
        onClick={handleGoToBoulevard}
        disabled={isFlying}
        className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 z-50 flex items-center gap-2"
      >
        {isFlying ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Uçuyor...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Bulvara Git</span>
          </>
        )}
      </button>

      {/* Konum Bilgisi */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg text-sm z-50">
        <div className="font-semibold">📍 Naim Süleymanoğlu Bulvarı</div>
        <div className="text-xs text-gray-300 mt-1">Bursa, Türkiye</div>
      </div>
    </div>
  );
};

export default MapSection;