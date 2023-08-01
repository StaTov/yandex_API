import { useState, useEffect } from "react";
import { yandexInit } from "../utils/helper";
import { useNavigate } from "react-router-dom";


const Auth = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setToken(localStorage.getItem('access_token'))
        if (!token) {
            setLoading(true)
            yandexInit(setLoading, setToken)
        }
    }, [token])

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