import TailSelect from "./TailSelect" 
// import SubwayBox from "./SubwayBox" 
import SubwayBox2 from "./SubwayBox2" 
import { useRef, useState, useEffect } from "react"


import serea from '../db/sarea.json'

export default function Subway() {
  const sel = useRef();
  const [selectedCode, setSelectedCode] = useState(""); 
  const [tdata, setTdata] = useState([]);

  const handleSel = () => {
    const code = sel.current.value;
    console.log("선택된 값:", code);
    setSelectedCode(code); 
  };

  const getDataFetch = async (code) => { 
    
    const apikey = import.meta.env.VITE_DATA_API;
    const baseUrl = 'https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?';
    const url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=12&resultType=JSON&controlnumber=20250723&areaIndex=${code}`; 

    try {
      const resp = await fetch(url);
      const data = await resp.json();
      // 한개데이터만 넘김
      // setTdata(data.response.body.items.item[0]);
      setTdata(data.response.body.items.item);
    } catch (error) {
      console.error("데이터 패치 에러:", error);
      setTdata([]);
    }
  };

  useEffect(() => {
    if (selectedCode) {
      getDataFetch(selectedCode);
    }
  }, [selectedCode]);

  return (
    <div className="flex flex-col w-full px-30">
      <div className="flex justify-between mb-4">
        <div>측정소 선택</div>
        <TailSelect
                    selRef={sel}
                    handleSel={handleSel}
                    dText="--측정소선택--"
                    valueKey="코드"
                    labelKey="측정소"
                    opt={serea}/>

      </div>

      <div>
        {/* {tdata.length > 0 ? (
                            <SubwayBox2 items={tdata} />
          ) : (
        <p className="text-gray-500">측정소를 선택하면 결과가 나타납니다.</p>
)} */}
{Array.isArray(tdata) && tdata.length > 0 ? (
  <SubwayBox2 items={tdata} />
) : (
  <p className="text-gray-500">측정소를 선택하면 결과가 나타납니다.</p>
)}

      </div>
    </div>
  );
}
