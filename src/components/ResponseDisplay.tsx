import React from "react";

interface ResponseDisplayProps {
  loading: boolean;
  error: string | null;
  responseData: any;
}

const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ loading, error, responseData }) => {
  if (loading) return <span className="loading loading-spinner loading-md"></span>;
  if (error) return <div className="alert alert-error"><span>Error: {error}</span></div>;

  if (responseData && responseData.analysis) {
    const { cusp, planet, aspect, transit, ascendant, horoscope, summary } = responseData.analysis;

    return (
      <div className="flex flex-col gap-6">
        {/* Ascendant Section */}
        <div className="bg-base-200 rounded-lg p-4 mb-4">
          <h3 className="text-xl font-semibold mb-2">Ascendant</h3>
          <p className="leading-relaxed">{ascendant}</p>
        </div>

        {/* Horoscope Overview */}
        <div className="bg-base-200 rounded-lg p-4 mb-4">
          <h3 className="text-xl font-semibold mb-2">Horoscope Overview</h3>
          <p><strong>Day:</strong> {horoscope?.day}</p>
          <p><strong>Month:</strong> {horoscope?.month}</p>
          <p><strong>Year:</strong> {horoscope?.year}</p>
        </div>

        {/* Cusp Table */}
        {cusp && (
          <div className="bg-base-200 rounded-lg p-4 mb-4 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-2">Cusp Analysis</h3>
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  {cusp.headers.map((header: string, index: number) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cusp.data.map((row: any, rowIndex: number) => (
                  <tr key={rowIndex}>
                    <td>{formatHouse(row.house)}</td>
                    <td>{row.startLongitude}</td>
                    <td>{row.zodiacSign}</td>
                    <td>{row.degrees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {cusp.analysis && cusp.analysis.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Analysis:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  {cusp.analysis.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Planetary Positions Table */}
        {planet && (
          <div className="bg-base-200 rounded-lg p-4 mb-4 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-2">Planetary Positions</h3>
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  {planet.headers.map((header: string, index: number) => (
                    <th key={index}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {planet.data.map((row: any, rowIndex: number) => (
                  <tr key={rowIndex}>
                    <td>{row.planet}</td>
                    <td>{row.longitude}</td>
                    <td>{row.zodiacSign}</td>
                    <td>{row.degrees}</td>
                    <td>{formatHouse(row.house)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {planet.analysis && planet.analysis.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Analysis:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  {planet.analysis.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Aspect Table */}
        {aspect && (
          <div className="bg-base-200 rounded-lg p-4 mb-4 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-2">Aspects</h3>
            {aspect.headers.length > 0 && aspect.data.length > 0 ? (
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    {aspect.headers.map((header: string, index: number) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {aspect.data.map((row: any, rowIndex: number) => (
                    <tr key={rowIndex}>
                      <td>{row.planet1}</td>
                      <td>{row.planet2}</td>
                      <td>{row.aspect}</td>
                      <td>{row.angle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No aspect data available.</div>
            )}
            {aspect.analysis && aspect.analysis.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Analysis:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  {aspect.analysis.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Transit Table */}
        {transit && (
          <div className="bg-base-200 rounded-lg p-4 mb-4 overflow-x-auto">
            <h3 className="text-xl font-semibold mb-2">Transits</h3>
            {transit.headers.length > 0 && transit.data.length > 0 ? (
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    {transit.headers.map((header: string, index: number) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {transit.data.map((row: any, rowIndex: number) => (
                    <tr key={rowIndex}>
                      <td>{row.planet}</td>
                      <td>{row.current_longitude}</td>
                      <td>{row.zodiac_sign}</td>
                      <td>{row.degree}</td>
                      <td>{row.corresponding_natal_planet}</td>
                      <td>{row.aspect_type}</td>
                      <td>{row.angle}</td>
                      <td>{row.influence}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No transit data available.</div>
            )}
            {transit.analysis && transit.analysis.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Analysis:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  {transit.analysis.map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Summary Section */}
        <div className="bg-base-200 rounded-lg p-4">
          <h3 className="text-xl font-semibold mb-2">Summary</h3>
          <p className="leading-relaxed">{summary}</p>
        </div>
      </div>
    );
  }

  return <div className="text-base-content">No data to display. Please submit the form.</div>;
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
