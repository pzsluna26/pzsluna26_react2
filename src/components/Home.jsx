import {useAtom} from "jotai"
import {isLogin} from "../atoms/IsLoginAtom"
import Login from "./Login"

export default function Home() {
  const [login, setLogin] = useAtom(isLogin);
  const id = localStorage.getItem("id");
  return (
    <div className="w-full">
      { 
        login ? (
          <div className="mt-50">{id} 님 로그인이 되었습니다☺️</div>
        ) : (
          <Login />
        )
      }
    </div>
  )
}
