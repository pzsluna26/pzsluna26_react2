                

export default function TailSelect({ selRef, dText, children }) {
  return (
    <>
      <select className="bg-gray-50 border mx-2 border-gray-300 text-gray-900
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
                        block p-2.5"
              // 초기 선택 없음
              defaultValue={dText}
              // 부모 컴포넌트에서 선택된 값을 읽기 위해 ref 연결
              ref={selRef}
              // 선택 바뀔 때 호출
              >
                 {children}
        </select>
    </>
          )
        }
