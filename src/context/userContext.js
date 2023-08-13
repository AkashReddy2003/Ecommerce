import { createContext,useContext,useState } from "react";
import axios from 'axios';
import { Alert } from "react-bootstrap";

const UserContext=createContext();

const getUser=()=>{
    let user={};
    if(window.localStorage.getItem('user')!=null){
        user=JSON.parse(window.localStorage.getItem('user'));
    }
    return user;
}

const getAuth=()=>{
    let auth=false;
    if(window.localStorage.getItem('auth')!=null){
        auth=window.localStorage.getItem('auth');
    }
    return auth;
}

export const UserProvider=({children})=>{
    const [user, setUser] = useState(getUser());
    const [auth,setAuth]=useState(getAuth());
    const [prodUpdate,setProdUpdate]=useState(0);
    const BASE_URL="https://ecommerce-backend-ivory.vercel.app/";
    
    const login=async(lemail,lpass)=>{
        await axios.post(BASE_URL+"user/login",{email:lemail,password:lpass}).then((res)=>{
            if(res.data.message=="success"){
                setUser(res.data.user);
                setAuth(true);
                window.localStorage.setItem('auth',true);
                window.localStorage.setItem('user',JSON.stringify(res.data.user));
                console.log(res.data.user.role);

            }else{
               
                alert(res.data.message);
            }
        }).catch((e)=>{
            alert(e.response.data);
            console.log(e);
        })
    }
    const setUse=(user)=>{
        window.localStorage.setItem("user",JSON.stringify(user));
        setUser(user);
    }
    const signup=async(name,email,password,phone,address)=>{
        await axios.post(BASE_URL+"user/signup",{name,email,password,phone,address}).then((res)=>{
            console.log(res.data.user);
            setAuth(true);
            setUser(res.data.user);
            window.localStorage.setItem('auth',true);
            window.localStorage.setItem('user',JSON.stringify(res.data.user));
            
        }).catch((e)=>{
            console.log(e)
        })
    }

    const logout=async()=>{
        setUser({});
        setAuth(false);
        window.localStorage.removeItem('auth');
        window.localStorage.removeItem('user');
    }


    return (
        <UserContext.Provider value={{setUse,auth,signup,login,user,logout,BASE_URL,prodUpdate,setProdUpdate,setUser}}>
          {children}
        </UserContext.Provider>
      );
}



export const useUserContext=()=>{
    return useContext(UserContext)
}

