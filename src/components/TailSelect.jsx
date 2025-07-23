

export default function TailSelect({selRef,handleSel,dText, opv, opt}) {
  return (
    <div>
      <select className="bg-gray-50 border mx-2 border-gray-300 text-gray-900
                         text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                         block p-2.5"
              defaultValue=""
              ref = {selRef}
              onChange={handleSel}>
        <option value="">{dText}</option>
                    {
                        opt.map((item, idx) => (
                                                <option key={idx} value={item[opv]}>
                                                            {item[opv]}
                                                </option>
                                                ))
                     }
                     {/*
                      opt = json데이터 배열 형태 
                      item = map으로 반복해서 모인 객체
                      idx = item의 배열의 인덱스
                            idx =0  => { "코드": "201193", "측정소": "서면역1호선승강장"}  
                      opv = 문자열로 전달되는 key 이름
                            item["측정소"] => "서면역1호선승강장"
                      */}
      </select>
    </div>
  )
}
