import { useState, useEffect } from "react";
import { yandexInit } from "../utils/helper";
import { useNavigate } from "react-router-dom";


const Auth = ({ token, setToken }) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      
        if (!token) {
            setLoading(true)
            yandexInit(setLoading, setToken)
        } else {
            navigate('/api')
        }
    }, [navigate, setToken, token])

    setToken(localStorage.getItem('access_token'))

    if (!token) {
        return (
            <>
                <div className='container_pageload'>
                    <div>{loading ? 'загрузка' : 'Авторизация'}</div>
                    {loading && <div className="circle2"></div>}
                    <div id='yaBtn'></div>
                </div>
            </>
        )
    }
    navigate('/api')
    return null;
}

export default Auth;