"use client";

import { useEffect, useRef, useState } from "react";

interface Report {
  id: number;
  type: string;
  location: { lat: number; lng: number };
  description: string;
  timestamp: Date;
  verified: boolean;
  reporter?: string;
}

interface Alert {
  id: number;
  type: string;
  severity: string;
  location: string;
  timestamp: Date;
  description: string;
  verified: boolean;
}

interface InteractiveMapProps {
  reports: Report[];
  alerts: Alert[];
  onReportClick: (report: Report) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ reports, alerts, onReportClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (map.current || typeof window === 'undefined') return; // Initialize map only once and only on client

    console.log('Initializing map...');
    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      console.log('Leaflet loaded successfully');
      // Fix for default markers in Leaflet
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });

      if (mapContainer.current) {
        map.current = L.map(mapContainer.current, {
          center: [13.0827, 80.2707], // Chennai coordinates [lat, lng]
          zoom: 10,
          zoomControl: true,
          attributionControl: true
        });

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map.current);

        map.current.whenReady(() => {
          console.log('Map ready!');
          setMapLoaded(true);
        });
      }
    }).catch((error) => {
      console.error('Failed to load Leaflet:', error);
      setMapError('Failed to load map. Please refresh the page.');
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Dynamically import Leaflet for marker operations
    import('leaflet').then((L) => {
      // Clear existing markers
      map.current!.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.current!.removeLayer(layer);
        }
      });

      // Add report markers
      reports.forEach((report) => {
        const markerColor = report.verified ? '#10B981' : '#F59E0B';
        
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            background-color: ${markerColor};
            width: 20px;
            height: 20px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        const marker = L.marker([report.location.lat, report.location.lng], { icon: customIcon })
          .addTo(map.current!);

        const popup = L.popup({
          closeButton: true,
          closeOnClick: false
        }).setContent(`
          <div class="p-3">
            <h3 class="font-semibold text-gray-900">${report.type.replace('_', ' ').toUpperCase()}</h3>
            <p class="text-sm text-gray-600 mt-1">${report.description}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs text-gray-500">${report.timestamp.toLocaleTimeString()}</span>
              <span class="text-xs ${report.verified ? 'text-green-600' : 'text-yellow-600'}">
                ${report.verified ? 'Verified' : 'Pending'}
              </span>
            </div>
          </div>
        `);

        marker.bindPopup(popup);
        marker.on('click', () => onReportClick(report));
      });

      // Add alert markers
      alerts.forEach((alert) => {
        const alertColor = alert.severity === 'high' ? '#EF4444' : 
                          alert.severity === 'medium' ? '#F59E0B' : '#10B981';
        
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            background-color: ${alertColor};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          "></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12]
        });

        const marker = L.marker([13.0827, 80.2707], { icon: customIcon }) // Default to Chennai for demo
          .addTo(map.current!);

        const popup = L.popup({
          closeButton: true,
          closeOnClick: false
        }).setContent(`
          <div class="p-3">
            <h3 class="font-semibold text-gray-900">${alert.type.replace('_', ' ').toUpperCase()}</h3>
            <p class="text-sm text-gray-600 mt-1">${alert.description}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs text-gray-500">${alert.timestamp.toLocaleTimeString()}</span>
              <span class="text-xs font-semibold ${alert.severity === 'high' ? 'text-red-600' : 
                alert.severity === 'medium' ? 'text-yellow-600' : 'text-green-600'}">
                ${alert.severity.toUpperCase()}
              </span>
            </div>
          </div>
        `);

        marker.bindPopup(popup);
      });
    });

  }, [reports, alerts, mapLoaded, onReportClick]);

  if (mapError) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <div className="text-red-500 text-2xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Loading Error</h3>
          <p className="text-gray-600 mb-4">{mapError}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="w-full h-full" style={{ minHeight: '400px' }} />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button
          onClick={() => {
            if (map.current) {
              map.current.setView([13.0827, 80.2707], 10);
            }
          }}
          className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg shadow-lg text-sm font-medium"
        >
          Chennai
        </button>
        <button
          onClick={() => {
            if (map.current) {
              map.current.setView([19.0760, 72.8777], 10);
            }
          }}
          className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg shadow-lg text-sm font-medium"
        >
          Mumbai
        </button>
        <button
          onClick={() => {
            if (map.current) {
              map.current.setView([22.5726, 88.3639], 10);
            }
          }}
          className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg shadow-lg text-sm font-medium"
        >
          Kolkata
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Legend</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Verified Reports</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Pending Reports</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>High Severity Alerts</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Medium Severity Alerts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
