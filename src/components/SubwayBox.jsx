// 테이블 하나 출력되는 subwaybox
// 측정값(item)을 받아와서, 항목 이름과 단위(scode.json 참조)와 함께 테이블로 표시
// 1. scode 불러오기
import scode from '../db/scode.json'

export default function SubwayBox({ item, idx }) {

  // 2. item으로 받은 측정값에서 출력할 키 추출
  // 항목 코드 리스트 추출 (['pm10', 'co2', 'co', ...])
  // 이걸 기준으로 <th>와 <td>를 반복 생성
  const keys = Object.keys(scode); 

  return (
    <div className="overflow-x-auto">
      {/* 상단 정보 출력
          선택된 측정소에 대한 부가정보를 출력 (어디서, 언제 측정된 값인지) */}
      <p className="flex justify-start items-start mt-2 text-sm text-gray-500">
        측정소: {item.site} / 지역: {item.city} / 시각: { //2025.07.25.01시
                                                      `${item.controlnumber.slice(0,4)}.
                                                       ${item.controlnumber.slice(4,6)}.
                                                       ${item.controlnumber.slice(6,8)}
                                                       ${item.controlnumber.slice(8,10)}시`
                                                      } 
      </p>
      <table className="border border-gray-400 w-full text-center">
        {/* 3. 테이블 헤더 생성 
            scode에서 각 항목의 이름과 단위를 표로 보여줌
            예: 미세먼지 (㎍/㎥)*/}
        <thead>
          <tr>
            {keys.map(key => (                                      
              <th key={key}  // idx가 짝수일때 연회색, 홀수일때 진회색 => 변수로 잡아서
                  className={`border ${idx %2 == 0 ? "bg-gray-100" : "bg-gray-300"} border-gray-300 p-2 `}>
                {scode[key].name} ({scode[key].unit}) 
              </th>
            ))}
          </tr>
        </thead>
        {/* 4. 테이블 본문 (측정값) 출력
            API로 받아온 item에서 실제 측정값 표시
            값이 없으면 "-"로 출력 */}
        <tbody>
          <tr>
            {keys.map(key => (
              <td key={key} className="border border-gray-300 p-2">
                {item[key] !== undefined ? item[key] : "-"} 
              </td>
            ))}
          </tr>
        </tbody>
      </table>
      
    </div>
  );
}
