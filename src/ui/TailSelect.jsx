                                  /*1. 전달받는 props
                            ,         - selRef: select 요소를 참조할 ref (값 읽기용)
                                      - handleSel: 선택 변화 시 실행할 함수
                                      - dText: 드롭다운 기본 안내 텍스트
                                      - valueKey: option의 value로 쓸 키 이름 => scode["코드"] =>  <option value="202191">
                                      - labelKey: 화면에 보일 라벨용 키 이름 => scode["측정소"] => 서면역2호선대합실
                                      - opt: 옵션으로 쓸 JSON 배열 */

export default function TailSelect({ selRef, handleSel, dText, valueKey, labelKey, opt }) {
  return (
    <div>
      <select className="bg-gray-50 border mx-2 border-gray-300 text-gray-900
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                        block p-2.5"
              // 초기 선택 없음
              defaultValue=""
              // 부모 컴포넌트에서 선택된 값을 읽기 위해 ref 연결
              ref={selRef}
              // 선택 바뀔 때 호출
              onChange={handleSel}>
                                    
                        <option value="">{dText}</option>
                    {
                      opt.map((item, idx) => (
                        <option key={idx} value={item[valueKey]}>
                          {item[labelKey]}
                        </option>
                      ))
                    }

                    {/* 
                        - dText : 고정텍스트 / ex) --측정소선택-- 
                        - opt : json 데이터 순회 배열 / scode.json
                        - (item, idx) => (...) :
                            1. item : opt의 각 요소(객체) / ex) { "코드": "202191", "측정소": "서면역2호선대합실" }
                            2. idx : 해당 요소의 인덱스
                        - key={idx} :
                            1. key : 고유id
                            2. idx : 인덱스
                        - value={item[valueKey]} :
                            1. valueKey : prop으로 받은 문자열 / ex) "코드" 
                            2. item[valueKey] : item[valueKey] → "202191"
                        - {item[labelKey]} :
                            1. labelKey : prop으로 받은 문자열 / ex) "측정소"
                            2. item[labelKey] : item[labelKey] → "서면역2호선대합실"
                    */}

        </select>
            </div>
          )
        }
