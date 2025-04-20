import React from "react";
import { Box, Text, Heading, Table, TableHeader, TableRow, TableCell, TableBody, Paragraph, ResponsiveContext } from "grommet";

interface ResponseDisplayProps {
  loading: boolean;
  error: string | null;
  responseData: any;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ loading, error, responseData }) => {
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="status-critical">Error: {error}</Text>;

  if (responseData && responseData.analysis) {
    const { cusp, planet, aspect, transit, ascendant, horoscope, summary } = responseData.analysis;

    return (
      <ResponsiveContext.Consumer>
        {(size: string) => (
          <Box gap="large" pad="medium">
            {/* Ascendant Section */}
            <Box background="dark-2" pad="medium" round="small" margin={{ bottom: "medium" }}>
              <Heading level={3} margin="none">
                Ascendant
              </Heading>
              <Paragraph fill>{ascendant}</Paragraph>
            </Box>

            {/* Horoscope Overview */}
            <Box background="dark-2" pad="medium" round="small" margin={{ bottom: "medium" }}>
              <Heading level={3} margin="none">
                Horoscope Overview
              </Heading>
              <Paragraph fill>
                <strong>Day:</strong> {horoscope?.day}
              </Paragraph>
              <Paragraph fill>
                <strong>Month:</strong> {horoscope?.month}
              </Paragraph>
              <Paragraph fill>
                <strong>Year:</strong> {horoscope?.year}
              </Paragraph>
            </Box>

            {/* Cusp Table */}
            {cusp && (
              <Box background="dark-2" pad="medium" round="small" overflow={{ horizontal: "auto" }} margin={{ bottom: "medium" }}>
                <Heading level={3} margin="none">
                  Cusp Analysis
                </Heading>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {cusp.headers.map((header: string, index: number) => (
                        <TableCell key={index} scope="col" border="bottom">
                          <Text>{header}</Text>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cusp.data.map((row: any, rowIndex: number) => {
                      return (
                        <TableRow key={rowIndex}>
                          <TableCell><Text>{formatHouse(row.house)}</Text></TableCell>
                          <TableCell><Text>{row.startLongitude}</Text></TableCell>
                          <TableCell><Text>{row.zodiacSign}</Text></TableCell>
                          <TableCell><Text>{row.degrees}</Text></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {cusp.analysis && cusp.analysis.length > 0 && (
                  <Box margin={{ top: "medium" }}>
                    <Heading level={4} margin={{ bottom: "small" }}>
                      Analysis:
                    </Heading>
                    <Box as="ul" pad={{ left: "medium" }} gap="medium">
                      {cusp.analysis.map((item: string, index: number) => (
                        <Text as="li" key={index} style={{ lineHeight: "1.8" }}>
                          {item}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            {/* Planetary Positions Table */}
            {planet && (
              <Box background="dark-2" pad="medium" round="small" overflow={{ horizontal: "auto" }} margin={{ bottom: "medium" }}>
                <Heading level={3} margin="none">
                  Planetary Positions
                </Heading>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {planet.headers.map((header: string, index: number) => (
                        <TableCell key={index} scope="col" border="bottom">
                          <Text>{header}</Text>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {planet.data.map((row: any, rowIndex: number) => {
                      return (
                        <TableRow key={rowIndex}>
                          <TableCell><Text>{row.planet}</Text></TableCell>
                          <TableCell><Text>{row.longitude}</Text></TableCell>
                          <TableCell><Text>{row.zodiacSign}</Text></TableCell>
                          <TableCell><Text>{row.degrees}</Text></TableCell>
                          <TableCell><Text>{formatHouse(row.house)}</Text></TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {planet.analysis && planet.analysis.length > 0 && (
                  <Box margin={{ top: "medium" }}>
                    <Heading level={4} margin={{ bottom: "small" }}>
                      Analysis:
                    </Heading>
                    <Box as="ul" pad={{ left: "medium" }} gap="medium">
                      {planet.analysis.map((item: string, index: number) => (
                        <Text as="li" key={index} style={{ lineHeight: "1.8" }}>
                          {item}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            {/* Aspect Table */}
            {aspect && (
              <Box background="dark-2" pad="medium" round="small" overflow={{ horizontal: "auto" }} margin={{ bottom: "medium" }}>
                <Heading level={3} margin="none">
                  Aspects
                </Heading>
                {aspect.headers.length > 0 && aspect.data.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {aspect.headers.map((header: string, index: number) => (
                          <TableCell key={index} scope="col" border="bottom">
                            <Text>{header}</Text>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {aspect.data.map((row: any, rowIndex: number) => {
                        return (
                          <TableRow key={rowIndex}>
                            <TableCell><Text>{row.planet1}</Text></TableCell>
                            <TableCell><Text>{row.planet2}</Text></TableCell>
                            <TableCell><Text>{row.aspect}</Text></TableCell>
                            <TableCell><Text>{row.angle}</Text></TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <Paragraph>No aspect data available.</Paragraph>
                )}
                {aspect.analysis && aspect.analysis.length > 0 && (
                  <Box margin={{ top: "medium" }}>
                    <Heading level={4} margin={{ bottom: "small" }}>
                      Analysis:
                    </Heading>
                    <Box as="ul" pad={{ left: "medium" }} gap="medium">
                      {aspect.analysis.map((item: string, index: number) => (
                        <Text as="li" key={index} style={{ lineHeight: "1.8" }}>
                          {item}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            {/* Transit Table */}
            {transit && (
              <Box background="dark-2" pad="medium" round="small" overflow={{ horizontal: "auto" }} margin={{ bottom: "medium" }}>
                <Heading level={3} margin="none">
                  Transits
                </Heading>
                {transit.headers.length > 0 && transit.data.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {transit.headers.map((header: string, index: number) => (
                          <TableCell key={index} scope="col" border="bottom">
                            <Text>{header}</Text>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transit.data.map((row: any, rowIndex: number) => {
                        return (
                          <TableRow key={rowIndex}>
                            <TableCell><Text>{row.planet}</Text></TableCell>
                            <TableCell><Text>{row.current_longitude}</Text></TableCell>
                            <TableCell><Text>{row.zodiac_sign}</Text></TableCell>
                            <TableCell><Text>{row.degree}</Text></TableCell>
                            <TableCell><Text>{row.corresponding_natal_planet}</Text></TableCell>
                            <TableCell><Text>{row.aspect_type}</Text></TableCell>
                            <TableCell><Text>{row.angle}</Text></TableCell>
                            <TableCell><Text>{row.influence}</Text></TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <Paragraph>No transit data available.</Paragraph>
                )}
                {transit.analysis && transit.analysis.length > 0 && (
                  <Box margin={{ top: "medium" }}>
                    <Heading level={4} margin={{ bottom: "small" }}>
                      Analysis:
                    </Heading>
                    <Box as="ul" pad={{ left: "medium" }} gap="medium">
                      {transit.analysis.map((item: string, index: number) => (
                        <Text as="li" key={index} style={{ lineHeight: "1.8" }}>
                          {item}
                        </Text>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            )}

            {/* Summary Section */}
            <Box background="dark-2" pad="medium" round="small">
              <Heading level={3} margin="none">
                Summary
              </Heading>
              <Paragraph fill style={{ lineHeight: "1.8" }}>
                {summary}
              </Paragraph>
            </Box>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }

  return <Text>No data to display. Please submit the form.</Text>;
};

/**
 * Helper function to format house names for display.
 * Converts "firstHouse" to "First House", etc.
 */
const formatHouse = (house: string) => {
  if (!house) return "";
  return house
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, (str: string) => str.toUpperCase()) // Capitalize first letter
    .trim();
};

export default ResponseDisplay;
