"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current) return; // Initialize map only once

    // Set your Mapbox token here
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "pk.eyJ1Ijoic2FnYXJwbGF0Zm9ybSIsImEiOiJjbG9yZ2V0ZXN0In0.example";

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [80.2707, 13.0827], // Chennai coordinates
      zoom: 10,
      pitch: 45,
      bearing: 0
    });

    map.current.on("load", () => {
      setMapLoaded(true);
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());

    // Add report markers
    reports.forEach((report) => {
      const marker = new mapboxgl.Marker({
        color: report.verified ? '#10B981' : '#F59E0B',
        scale: 1.2
      })
        .setLngLat([report.location.lng, report.location.lat])
        .addTo(map.current!);

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
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

      marker.setPopup(popup);
      marker.getElement().addEventListener('click', () => onReportClick(report));
    });

    // Add alert markers
    alerts.forEach((alert) => {
      const alertColor = alert.severity === 'high' ? '#EF4444' : 
                        alert.severity === 'medium' ? '#F59E0B' : '#10B981';
      
      const marker = new mapboxgl.Marker({
        color: alertColor,
        scale: 1.5
      })
        .setLngLat([80.2707, 13.0827]) // Default to Chennai for demo
        .addTo(map.current!);

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false
      }).setHTML(`
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

      marker.setPopup(popup);
    });

  }, [reports, alerts, mapLoaded, onReportClick]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <button
          onClick={() => map.current?.flyTo({ center: [80.2707, 13.0827], zoom: 10 })}
          className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg shadow-lg text-sm font-medium"
        >
          Chennai
        </button>
        <button
          onClick={() => map.current?.flyTo({ center: [72.8777, 19.0760], zoom: 10 })}
          className="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg shadow-lg text-sm font-medium"
        >
          Mumbai
        </button>
        <button
          onClick={() => map.current?.flyTo({ center: [88.3639, 22.5726], zoom: 10 })}
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
