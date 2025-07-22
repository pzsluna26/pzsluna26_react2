import reactLogo from "../assets/react.svg"
import viteLogo from '/vite.svg'
import {Link} from 'react-router-dom'
import {isLogin} from "../atoms/IsLoginAtom"
import { useAtom } from 'jotai' 



export default function Nav() {
  //초기값 = false = 로그아웃
  const [login, setLogin] = useAtom(isLogin);
  
  return (
     <header className="w-full min-h-20 flex justify-between items-center bg-blue-200 ">
          <div className="flex ml-10">
            <img src={reactLogo} alt="React logo" /> +
            <img src={viteLogo} alt="vite logo" />
          </div>
          <div className="text-gray-500 font-bold text-xs">
            <ul className="flex justify-center items-center">
              <Link to = "/Home"><li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">홈으로</li></Link>
              {/* 자바스크립트 && 연산자 = 왼쪽이 true 일때 오른쪽이 실행됨 */}
              { login && <Link to = "/Subway"><li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">지하철 대기정보</li></Link>}
            </ul>
          </div>
          <div className="mr-10 text-xs font-bold p-4 bg-blue-300 text-white rounded-xl">
           { login ? <span className="cursor-pointer"
                           onClick={()=>setLogin(false)}>로그아웃</span> 
                  :  <Link to="/Login" className="cursor-pointer text-white">로그인</Link>
                    }
          </div>
          
        </header>
  )
}
