import React from "react";
import { Box, Text, Heading, Table, TableHeader, TableRow, TableCell, TableBody, Paragraph, ResponsiveContext } from "grommet";

const ResponseDisplay = ({ loading, error, responseData }) => {
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text color="status-critical">Error: {error}</Text>;

  if (responseData && responseData.analysis) {
    const { cusp, planet, aspect, transit, Ascendant, horoscope, summary } = responseData.analysis;

    return (
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box gap="large" pad="medium">
            {/* Ascendant Section */}
            <Box background="dark-2" pad="medium" round="small" margin={{ bottom: "medium" }}>
              <Heading level={3} margin="none">
                Ascendant
              </Heading>
              <Paragraph fill>{Ascendant}</Paragraph>
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
                      {cusp.headers.map((header, index) => (
                        <TableCell key={index} scope="col" border="bottom">
                          <Text>{header}</Text>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {cusp.data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                          <TableCell key={colIndex}>
                            <Text>{value}</Text>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box margin={{ top: "medium" }}>
                  <Heading level={4} margin={{ bottom: "small" }}>
                    Analysis:
                  </Heading>
                  <Box as="ul" pad={{ left: "medium" }} gap="medium">
                    {cusp.analysis.map((item, index) => (
                      <Text as="li" key={index} style={{ lineHeight: "1.8" }}>
                        {item}
                      </Text>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            {/* Planet Table */}
            {planet && (
              <Box background="dark-2" pad="medium" round="small" overflow={{ horizontal: "auto" }} margin={{ bottom: "medium" }}>
                <Heading level={3} margin="none">
                  Planetary Positions
                </Heading>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {planet.headers.map((header, index) => (
                        <TableCell key={index} scope="col" border="bottom">
                          <Text>{header}</Text>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {planet.data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                          <TableCell key={colIndex}>
                            <Text>{value}</Text>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box margin={{ top: "medium" }}>
                  <Heading level={4} margin={{ bottom: "small" }}>
                    Analysis:
                  </Heading>
                  <Box as="ul" pad={{ left: "medium" }} gap="medium">
                    {planet.analysis.map((item, index) => (
                      <Text as="li" key={index} style={{ lineHeight: "1.8" }}>
                        {item}
                      </Text>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            {/* Aspect Table */}
            {aspect && (
              <Box background="dark-2" pad="medium" round="small" overflow={{ horizontal: "auto" }} margin={{ bottom: "medium" }}>
                <Heading level={3} margin="none">
                  Aspects
                </Heading>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {aspect.headers.map((header, index) => (
                        <TableCell key={index} scope="col" border="bottom">
                          <Text>{header}</Text>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aspect.data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                          <TableCell key={colIndex}>
                            <Text>{value}</Text>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box margin={{ top: "medium" }}>
                  <Heading level={4} margin={{ bottom: "small" }}>
                    Analysis:
                  </Heading>
                  <Box as="ul" pad={{ left: "medium" }} gap="medium">
                    {aspect.analysis.map((item, index) => (
                      <Text as="li" key={index} style={{ lineHeight: "1.8" }}>
                        {item}
                      </Text>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            {/* Transit Table */}
            {transit && (
              <Box background="dark-2" pad="medium" round="small" overflow={{ horizontal: "auto" }} margin={{ bottom: "medium" }}>
                <Heading level={3} margin="none">
                  Transits
                </Heading>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {transit.headers.map((header, index) => (
                        <TableCell key={index} scope="col" border="bottom">
                          <Text>{header}</Text>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transit.data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {Object.values(row).map((value, colIndex) => (
                          <TableCell key={colIndex}>
                            <Text>{value}</Text>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Box margin={{ top: "medium" }}>
                  <Heading level={4} margin={{ bottom: "small" }}>
                    Analysis:
                  </Heading>
                  <Box as="ul" pad={{ left: "medium" }} gap="medium">
                    {transit.analysis.map((item, index) => (
                      <Text as="li" key={index} style={{ lineHeight: "1.8" }}>
                        {item}
                      </Text>
                    ))}
                  </Box>
                </Box>
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

export default ResponseDisplay;
