import React from "react";

interface LatLonDisplayProps {
  lat: number;
  lon: number;
}

const LatLonDisplay: React.FC<LatLonDisplayProps> = ({ lat, lon }) => (
  <div className="flex flex-row gap-4 p-2">
    <span className="text-base">Latitude: {lat}</span>
    <span className="text-base">Longitude: {lon}</span>
  </div>
);

export default LatLonDisplay;
