import TailSelect from "../ui/TailSelect" 
import SubwayBox3 from "./SubwayBox3"
// import SubwayBox from "./SubwayBox" 
// import SubwayBox2 from "./SubwayBox2" 
import { useRef, useState, useEffect } from "react"
import serea from '../db/sarea.json'


/*
 수정
 1. json파일 => 배열(코드, 측정소)
 2. url => {today}, {yesterday} 
    날짜,시간대순으로 수정하기
 3. 테이블 형식말고, 1시간 별로 수정하기
 */


export default function Subway() {
  const sel = useRef();
  const [selectedCode, setSelectedCode] = useState(""); 
  const [tdata, setTdata] = useState([]);
  const [sortedData, setSortedData] = useState([]);

  const handleSel = () => {
    const code = sel.current.value;
    console.log("선택된 값:", code);
    setSelectedCode(code); 
  };

  const getDataFetch = async (code) => { 
    
    const apikey = import.meta.env.VITE_DATA_API;
    const today = new Date().toISOString().slice(0,10).replaceAll("-",""); 
    // const today = '2025072524'
    // const yestday = 
    const baseUrl = 'https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?';
    const url = `${baseUrl}serviceKey=${apikey}&pageNo=1&numOfRows=24&resultType=JSON&controlnumber=${today}&areaIndex=${code}`; 
                                                            //최대 24개 totalCount                   //날짜,시간          //측정소
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      // 한개데이터만 넘김
      // setTdata(data.response.body.items.item[0]);
      setTdata(data.response.body.items.item);
      console.log("📦 받아온 원본 데이터:", data.response.body.items.item );
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

  // 날짜,시간순 정렬
  useEffect(()=>{
    let tm = [];
    // tm => ex) 2025072401, 2025072403 ...
    tm = tdata.map(item => item.controlnumber);
    tm.sort();
     // 정렬된 날짜의 테이블을 순회해서 sorted에 저장
     // num : 배열 각 요소 => 정렬된 날짜
    const sorted = tm.map(num => tdata.find(item => item.controlnumber === num));

    // 상태 업데이트
    setSortedData(sorted);
  }, [tdata]);



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
        
        {/* <subwaybox: 최신정보 1줄만 출력하는 테이블>
         {tdata.length > 0 ? (
                            <SubwayBox2 items={tdata} />
          ) : (
        <p className="text-gray-500">측정소를 선택하면 결과가 나타납니다.</p>
         )} */}

      
         {Array.isArray(sortedData) && sortedData.length > 0 ? (
          <SubwayBox3 items={sortedData} />
          ) : (
          <p className="text-gray-500">측정소를 선택하면 결과가 나타납니다.</p>
          )}

      </div>
    </div>
  );
}
