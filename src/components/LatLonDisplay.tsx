import React from "react";
import { Box, Text } from "grommet";

interface LatLonDisplayProps {
  lat: number;
  lon: number;
}

const LatLonDisplay: React.FC<LatLonDisplayProps> = ({ lat, lon }) => (
  <Box direction="row" gap="medium" pad="small">
    <Text>Latitude: {lat}</Text>
    <Text>Longitude: {lon}</Text>
  </Box>
);

export default LatLonDisplay;
