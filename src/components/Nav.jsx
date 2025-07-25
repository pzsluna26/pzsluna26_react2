// 로고
import reactLogo from "../assets/react.svg"
import viteLogo from '/vite.svg'

// 라우팅
import {Link} from 'react-router-dom'

// 전역변수(상태공유)
import { useAtom } from 'jotai' 
import {isLogin} from "../atoms/IsLoginAtom"


export default function Nav() {
  //초기값 = false = 로그아웃
  //useAtom 괄호안 '객체' 들어가야함
  const [login, setLogin] = useAtom(isLogin);

  const handleLogout = () => {
    setLogin(false);
    //로컬스토리지에서 없어짐
    localStorage.removeItem("id");
  }
  
  return (
     <header className="w-full min-h-20 flex justify-between items-center bg-blue-200 ">
          <div className="flex ml-10">
            <img src={reactLogo} alt="React logo" /> +
            <img src={viteLogo} alt="vite logo" />
            {/* 이미지 경로로 연결하고싶으면, public폴더사용해야함(import안해도됨)
            <img scr="/vite.sbg" alt="vite"/> */}
          </div>
          <div className="text-gray-500 font-bold text-xs">
            <ul className="flex justify-center items-center">
              <Link to = "/Home"><li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">홈으로</li></Link>
              
              {/* 자바스크립트 && 연산자 = 왼쪽이 true 일때 오른쪽이 실행됨 */}
              { 
                login && <Link to = "/Subway">
                <li className="px-2 hover:bg-amber-100 rounded-xl hover:text-black">지하철 대기정보</li></Link>
              }
              
            </ul>
          </div>
          <div className="mr-10 text-xs font-bold p-4 bg-blue-300 text-white rounded-xl">
           
           { 
            login ? <span className="cursor-pointer"
                            onClick={handleLogout}>로그아웃</span> 
                  :  <Link to="/Login" className="cursor-pointer text-white">로그인</Link>
            }
          </div>
          
        </header>
  )
}
