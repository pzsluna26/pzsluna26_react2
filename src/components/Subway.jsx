import TailSelect from "./TailSelect"
import SubwayBox from "./SubwayBox"
import {useRef, useState, useEffect} from "react"
import serea from '../db/sarea.json'
import scode from '../db/scode.json'


export default function Subway() {
  const sel = useRef();
  const [station, setStation] = useState([]);
  const [tdata, setTdata] = useState();

  const handleSel = () => {
    console.log("선택된 값:", sel.current.value);

    // scode.json 데이터 가져오기
    const selectedCode = sel.current.value;
    const filtered = scode.filter(item => item.코드 === selectedCode);
    setStation(filtered);
  }

  const getDataFetch = async() => {
    const apikey = import.meta.env.VITE_DATA_API ;
    const baseUrl = 'https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?' ;
    const url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=12&resultType=json&controlnumber=20250722&areaIndex=201193`;
                                                                //12개 불러오기
    const resp = await fetch(url) ;
    const data = await resp.json() ;

    setTdata(data.response.body.items.item) ;
  }

  // 지역코드가 바뀔 때 마다 fetch실행
  useEffect(() => {
    getDataFetch();
  } , [selectedCode]) ;

  return (
  <div className="flex flex-col w-full px-30">
    <div className="flex justify-between">
      <div>측정소 선택</div>
      <TailSelect 
        selRef={sel}
        handleSel={handleSel}
        dText="--측정소선택--"
        opv={["측정소"]}
        opt={serea} 
      />
    </div>
    <div>
      {/* SubwayBox로 전달 */}
      {
        tdata.length > 0 &&
        tdata.map((item, idx) => <SubwayBox key={idx} item={item}/>)
      }
    </div>
  </div>
)

}
