import React from "react";
import {
  Grommet,
  Box,
  Button,
  Heading,
  Footer,
  Text,
  ResponsiveContext,
} from "grommet";
import { darkTheme } from "./theme";
import useAstroStore from "./store/astro.store";
import DateTimeSelector from "./ui/DateTimeSelector";
import CountryStateCitySelector from "./components/CountryStateCitySelector";
import LatLonDisplay from "./components/LatLonDisplay";
import ResponseDisplay from "./components/ResponseDisplay";
import AstroChartRenderer from "./components/AstroChartRenderer";
import { fetchChartData } from "./chart.service";
import tzlookup from "tz-lookup";
import { useTime } from "./hooks/useTime";

const Calculator = () => {
  const {
    countries,
    states,
    cities,
    selectedCountry,
    selectedState,
    selectedCity,
    lat,
    lon,
    date,
    time,
    responseData,
    error,
    loading,
    setSelectedCountry,
    setSelectedState,
    setSelectedCity,
    setDate,
    setTime,
    setResponseData,
    setError,
    setLoading,
  } = useAstroStore();

  const { getDateByTimezone } = useTime();

  const handleSubmit = async () => {
    setError(null);
    setResponseData(null);
    setLoading(true);
    const tz = tzlookup(lat, lon);
    const tzDate = getDateByTimezone(date, time, tz);
    console.log(tzDate, tz);
    try {
      const data = await fetchChartData({
        date: tzDate.format("YYYY-MM-DD"),
        time: tzDate.format("HH:mm"),
        lat,
        lon,
      });
      console.log(data);

      //       const data = {
      //     "analysis": "根據您提供的星圖資料，以下是對此人的詳細占星分析，包括各宮位解析、整體運勢、上升點分析，以及當日、當月、當年的運勢建議。此外，還將基於星盤資料推測其MBTI性格類型並推薦合適的配偶類型。\n\n---\n\n## 一、宮位解析\n\n### 第一宮（上升宮）－ 金牛座 23.6°\n**主題**：自我形象、外在表現、個性特質\n\n**分析**：\n上升點位於金牛座，代表此人展現出穩重、實際且耐心的個性。他們注重物質享受和舒適環境，通常給人以可靠和踏實的印象。\n\n### 第二宮－雙子座\n**主題**：財務、價值觀、自我價值\n\n**分析**：\n財務與價值觀方面，此人可能具有多元化的收入來源和靈活的財務管理方式。他們重視知識和交流，並可能在理財上展現出靈活性。\n\n### 第三宮－巨蟹座\n**主題**：溝通、兄弟姐妹、短途旅行\n\n**分析**：\n在溝通和學習方面，此人情感豐富，與兄弟姐妹間可能有深厚的聯繫。短途旅行和日常交流對他們來說具有重要意義。\n\n### 第四宮－獅子座\n**主題**：家庭、家居、根基\n\n**分析**：\n家庭生活中，此人可能追求表現和領導，營造溫暖且充滿活力的家庭氛圍。他們重視家庭中的地位和自我表現。\n\n### 第五宮－處女座\n**主題**：創造力、浪漫、孩子\n\n**分析**：\n在創造力和浪漫關係中，此人注重細節和實際，可能在愛好和創作中展現出高度的組織能力。他們對子女的教育和成長抱有實際的期待。\n\n### 第六宮－天蠍座\n**主題**：工作、健康、服務\n\n**分析**：\n工作和健康方面，此人具備強烈的專注力和轉化能力。他們在職場中可能承擔重要角色，並在健康管理上表現出深入和徹底的態度。\n\n### 第七宮－射手座\n**主題**：伴侶關係、婚姻、合作\n\n**分析**：\n第七宮中有多個行星（太陽、月亮、水星、金星、冥王星），表明伴侶關係對此人極為重要。他們在婚姻中尋求自由、冒險和深層次的聯結，可能會吸引到具有相似特質的伴侶。\n\n### 第八宮－射手座\n**主題**：性、轉化、共同財產\n\n**分析**：\n火星位於第八宮，表明此人在性和財務共享方面具有強烈的動力和熱情。他們可能在財務合夥和深層次的心理轉化中展現出積極主動的態度。\n\n### 第九宮－摩羯座\n**主題**：高等教育、哲學、長途旅行\n\n**分析**：\n天王星和海王星位於此宮，表示此人在學術追求和理念方面具有創新和理想主義的特質。他們可能對長途旅行和高等教育抱有嚴謹而現實的態度。\n\n### 第十宮－水瓶座\n**主題**：事業、地位、目標\n\n**分析**：\n土星位於第十宮，代表在事業和目標達成上具有高度的責任感和紀律性。他們在職場中可能承擔重任，並追求長期穩定的職業發展。\n\n### 第十一宮－雙魚座\n**主題**：友誼、團體、願望\n\n**分析**：\n此人在社交圈和團體活動中可能展現出富有同理心和創意的一面。他們的願望和理想可能帶有一些夢幻和理想主義色彩。\n\n### 第十二宮－白羊座\n**主題**：潛意識、隱秘事務、靈性\n\n**分析**：\n在潛意識和靈性方面，此人可能擁有強烈的內在動力和自發性，他們的內心世界充滿激情和活力。\n\n---\n\n## 二、整體運勢分析\n\n此人的星圖顯示出強烈的第七宮影響，表明伴侶關係在其生活中佔據重要地位。多個行星落在射手座，賦予其樂觀、冒險和自由的特質。他們在追求個人目標的同時，也重視與他人的合作和聯結。天王星和海王星在摩羯座增強了其在職業和理念上的實際性和創新性。\n\n---\n\n## 三、上升點分析\n\n**上升點（Ascendant）**：金牛座 23.6°\n\n**特質**：\n- 穩重、實際且耐心\n- 注重物質享受和舒適環境\n- 給人可靠和踏實的印象\n- 慎重選擇，對變化持保守態度\n\n這種上升點使得此人在外表和初始印象上顯得穩健和可信，並且在面對變化時傾向於尋求穩定和持久的解決方案。\n\n---\n\n## 四、當日、當月、當年運勢建議\n\n### 當日運勢建議\n- **人際關係**：今天適合加強與伴侶或合作夥伴的溝通，表達真實的感受和需求。\n- **工作**：專注於手頭的任務，避免分心，特別是在需要高度專注力的工作上。\n- **健康**：注意飲食均衡，避免過度壓力，適當休息有助於提升精力。\n\n### 當月運勢建議\n- **事業發展**：本月適合制定長期目標，並逐步推進。土星在第十宮支持穩定的職業發展。\n- **財務管理**：多元化收入來源可能帶來財務上的穩定，合理規劃財務有助於達成目標。\n- **感情生活**：伴侶關係有望進一步深化，適合共同參與新的冒險或計劃。\n\n### 當年運勢建議\n- **個人成長**：今年是自我轉化的重要時期，火星在第八宮促進深層次的心理和情感變化。\n- **學習與旅行**：天王星和海王星在第九宮促進學術追求和長途旅行，是拓展視野的好時機。\n- **靈性探索**：利用第十二宮的能量進行靈性探索和自我反思，提升內在智慧和自我認識。\n\n---\n\n## 五、MBTI性格類型推測\n\n基於星圖中太陽、月亮和多個行星位於射手座，搭配金牛座的上升點，此人的MBTI類型可能較接近 **ENFP（外向、直覺、情感、知覺）** 或 **ENTP（外向、直覺、思考、知覺）**。射手座的樂觀、冒險和探索精神與ENFP或ENTP的創新和靈活特質相符。\n\n**推測MBTI類型**：**ENFP**\n\n**特點**：\n- 熱情洋溢，充滿創意\n- 喜愛探索新事物，追求自由\n- 重視人際關係，具有同理心\n- 靈活應變，適應力強\n\n---\n\n## 六、推薦的MBTI配偶類型\n\n基於ENFP的性格特質，以下MBTI類型可能與之高度匹配：\n\n1. **INFJ（內向、直覺、情感、判斷）**\n   - 互補的內向性和平衡ENFP的外向特質\n   - 深層次的情感聯結和理解\n\n2. **INTJ（內向、直覺、思考、判斷）**\n   - 提供穩定和理性的支持\n   - 共同追求長遠目標和理想\n\n3. **ENFJ（外向、直覺、情感、判斷）**\n   - 共享相似的外向和情感需求\n   - 強大的合作和支持能力\n\n4. **ENTP（外向、直覺、思考、知覺）**\n   - 共同的創新和探索精神\n   - 互相激勵，激發更高的創意\n\n**推薦配偶類型**：**INFJ 或 ENFJ**\n\n**理由**：\nINFJ 能提供深度的情感聯結和理解，平衡ENFP的熱情和探索欲；ENFJ 則在情感表達和社交互動上與ENFP高度契合，促進和諧的伴侶關係。\n\n---\n\n以上分析基於提供的星圖數據和占星學理論，希望能夠幫助您更好地了解自己及未來的運勢走向。如有更多需求或具體問題，建議諮詢專業的占星師進行深入解析。",
      //     "data": {
      //         "planets": [
      //             {
      //                 "name": "Sun",
      //                 "longitude": 261.371501110221,
      //                 "latitude": 0.00011825294195384211,
      //                 "distance": 0.9844546910989546,
      //                 "longitudeSpeed": 1.0173817987513616,
      //                 "latitudeSpeed": 0.00004310880997425341,
      //                 "distanceSpeed": -0.00010417461915763525,
      //                 "rflag": 258
      //             },
      //             {
      //                 "name": "Moon",
      //                 "longitude": 261.12550656564395,
      //                 "latitude": 1.6388465041860407,
      //                 "distance": 0.002475318223768385,
      //                 "longitudeSpeed": 14.189683191455021,
      //                 "latitudeSpeed": 1.2411813763912198,
      //                 "distanceSpeed": 0.000023571107637633414,
      //                 "rflag": 258
      //             },
      //             {
      //                 "name": "Mercury",
      //                 "longitude": 249.59739072225722,
      //                 "latitude": 0.21759711009343638,
      //                 "distance": 1.3622735747787482,
      //                 "longitudeSpeed": 1.5306922522058382,
      //                 "latitudeSpeed": -0.1197424682837998,
      //                 "distanceSpeed": 0.009778558869396674,
      //                 "rflag": 258
      //             },
      //             {
      //                 "name": "Venus",
      //                 "longitude": 253.05562603308707,
      //                 "latitude": 0.37587849449623684,
      //                 "distance": 1.6849494492768295,
      //                 "longitudeSpeed": 1.2584305323162779,
      //                 "latitudeSpeed": -0.03949171871067486,
      //                 "distanceSpeed": 0.0014649715100227949,
      //                 "rflag": 258
      //             },
      //             {
      //                 "name": "Mars",
      //                 "longitude": 265.01135169510246,
      //                 "latitude": -0.6806503276397777,
      //                 "distance": 2.44148806686439,
      //                 "longitudeSpeed": 0.7477107794314164,
      //                 "latitudeSpeed": -0.008290066541673533,
      //                 "distanceSpeed": -0.0008268035463246442,
      //                 "rflag": 258
      //             },
      //             {
      //                 "name": "Jupiter",
      //                 "longitude": 216.60710671552388,
      //                 "latitude": 1.1021997446066087,
      //                 "distance": 6.100918953266329,
      //                 "longitudeSpeed": 0.18319858894762578,
      //                 "latitudeSpeed": 0.0015795202913113664,
      //                 "distanceSpeed": -0.011542215890168043,
      //                 "rflag": 258
      //             },
      //             {
      //                 "name": "Saturn",
      //                 "longitude": 325.412776944545,
      //                 "latitude": -1.4399498745375263,
      //                 "distance": 10.173877318506886,
      //                 "longitudeSpeed": 0.07390119873390315,
      //                 "latitudeSpeed": 0.0010995473637609617,
      //                 "distanceSpeed": 0.014932730502930975,
      //                 "rflag": 258
      //             },
      //             {
      //                 "name": "Uranus",
      //                 "longitude": 290.5296460229383,
      //                 "latitude": -0.45496485229216405,
      //                 "distance": 20.483849620081287,
      //                 "longitudeSpeed": 0.05362475162687121,
      //                 "latitudeSpeed": 0.00007821051451168109,
      //                 "distanceSpeed": 0.008526331518146229,
      //                 "rflag": 258
      //             },
      //             {
      //                 "name": "Neptune",
      //                 "longitude": 289.7880162365359,
      //                 "latitude": 0.6180056284740713,
      //                 "distance": 31.043467434022244,
      //                 "longitudeSpeed": 0.0342774896056818,
      //                 "latitudeSpeed": -0.000324203498600435,
      //                 "distanceSpeed": 0.008206276927559254,
      //                 "rflag": 258
      //             },
      //             {
      //                 "name": "Pluto",
      //                 "longitude": 236.43013002707528,
      //                 "latitude": 13.705611972741947,
      //                 "distance": 30.622472702979728,
      //                 "longitudeSpeed": 0.03724919683930522,
      //                 "latitudeSpeed": 0.0021484805134143496,
      //                 "distanceSpeed": -0.007023586134945924,
      //                 "rflag": 258
      //             }
      //         ],
      //         "houses": {
      //             "house": [
      //                 53.60776452806304,
      //                 81.8579305779291,
      //                 109.29632473985288,
      //                 138.22706791548762,
      //                 169.7985879569162,
      //                 202.52712937674698,
      //                 233.60776452806306,
      //                 261.8579305779291,
      //                 289.2963247398529,
      //                 318.2270679154876,
      //                 349.79858795691626,
      //                 22.52712937674698
      //             ],
      //             "ascendant": 53.60776452806304,
      //             "mc": 318.2270679154876,
      //             "armc": 320.66374709633186,
      //             "vertex": 183.08746755662978,
      //             "equatorialAscendant": 53.059628614525074,
      //             "kochCoAscendant": 52.51926663919181,
      //             "munkaseyCoAscendant": 176.6405817634072,
      //             "munkaseyPolarAscendant": 232.5192666391918
      //         },
      //         "signs": [
      //             {
      //                 "name": "Sun",
      //                 "sign": "Sagittarius",
      //                 "house": 7
      //             },
      //             {
      //                 "name": "Moon",
      //                 "sign": "Sagittarius",
      //                 "house": 7
      //             },
      //             {
      //                 "name": "Mercury",
      //                 "sign": "Sagittarius",
      //                 "house": 7
      //             },
      //             {
      //                 "name": "Venus",
      //                 "sign": "Sagittarius",
      //                 "house": 7
      //             },
      //             {
      //                 "name": "Mars",
      //                 "sign": "Sagittarius",
      //                 "house": 8
      //             },
      //             {
      //                 "name": "Jupiter",
      //                 "sign": "Scorpio",
      //                 "house": 6
      //             },
      //             {
      //                 "name": "Saturn",
      //                 "sign": "Aquarius",
      //                 "house": 10
      //             },
      //             {
      //                 "name": "Uranus",
      //                 "sign": "Capricorn",
      //                 "house": 9
      //             },
      //             {
      //                 "name": "Neptune",
      //                 "sign": "Capricorn",
      //                 "house": 9
      //             },
      //             {
      //                 "name": "Pluto",
      //                 "sign": "Scorpio",
      //                 "house": 7
      //             }
      //         ]
      //     }
      // }
      setResponseData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grommet theme={darkTheme} full="min">
      <ResponsiveContext.Consumer>
        {(size) => (
          <Box fill align="center" pad="large">
            <Box
              direction="column"
              gap="large"
              width={size === "small" ? "100%" : "xlarge"}
              align="center"
              background="background"
              round="small"
              pad="medium"
              elevation="medium"
            >
              {/* Heading */}
              <Heading level="2" margin="none" alignSelf="center">
                Astrological Chart Data
              </Heading>

              {/* Input Section */}
              <Box
                width="100%"
                gap="medium"
                pad={{ horizontal: "medium", vertical: "small" }}
                background={size === "small" ? "dark-2" : "background"}
                round="small"
              >
                {/* Date and Time Selector */}
                <DateTimeSelector
                  date={date}
                  time={time}
                  setDate={setDate}
                  setTime={setTime}
                />

                {/* Country, State, City Selector */}
                <CountryStateCitySelector
                  countries={countries}
                  states={states}
                  cities={cities}
                  selectedCountry={selectedCountry}
                  selectedState={selectedState}
                  selectedCity={selectedCity}
                  setSelectedCountry={setSelectedCountry}
                  setSelectedState={setSelectedState}
                  setSelectedCity={setSelectedCity}
                />

                {/* Latitude and Longitude Display */}
                { false && <LatLonDisplay lat={lat} lon={lon} />}

                {/* Submit Button */}
                <Button
                  primary
                  label={loading ? "Loading..." : "Get Chart"}
                  onClick={handleSubmit}
                  disabled={loading}
                  alignSelf="center"
                />
              </Box>

              {/* Output Section */}
              <Box
                width="100%"
                gap="medium"
                background={size === "small" ? "dark-2" : "dark-1"}
                pad="medium"
                round="small"
                elevation="small"
                align="center"
                margin={{ top: "medium" }}
              >
                {/* Chart Renderer */}
                {responseData && (
                  <AstroChartRenderer
                    data={{
                      planets: responseData.data.planets,
                      houses: responseData.data.houses,
                      currentPlanets: responseData.data.currentPlanets,
                      currentHouses: responseData.data.currentHouses,
                    }}
                  />
                )}

                {/* Response Display */}
                <ResponseDisplay
                  loading={loading}
                  error={error}
                  responseData={responseData}
                />
              </Box>
            </Box>

            {/* Footer */}
            <Footer background="background" pad="medium">
              <Text size="small">© 2025 Astrological Insights</Text>
            </Footer>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

export default Calculator;
