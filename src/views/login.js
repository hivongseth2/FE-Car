
import {useState} from 'react' 
import './login.scss'
const Login = () =>{
    const[userName, setUserName] = useState("");
    const[passWord, setPassWord] = useState("");

    const handleOnchangeInput = (e) =>{
        if(e.target.classList.contains("userName")){
            setUserName(e.target.value);
            console.log("Us"+userName)
        }
        else{
            setPassWord(e.target.value)
            console.log("Pw"+passWord)
        };
    }
    return (
        <div className="wrapper">
            <h3>Đăng nhập</h3>
            <form>
                <div className="input-field">
                    <input type="text" placeholder="Tên đăng nhập" className="userName" value={userName} onChange={(e)=>handleOnchangeInput(e)}></input>
                </div>

                <div className="input-field">
                    <input type="password" placeholder="Mật khẩu" className="passWord" value={passWord} onChange={(e)=>handleOnchangeInput(e)}></input>
                </div>

                <div>
                    <p>Bạn chưa có tài khoản? <a href="register.js">Đăng ký</a> </p>
                </div>

                <div>
                    <button type='submit'>Đăng nhập</button>
                    
                </div>
            </form>
        </div>
    );
}



export default Login