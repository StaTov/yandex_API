import { useNavigate } from "react-router-dom";
import FileLoader from "./FileLoader";


const NavBar = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        localStorage.removeItem('access_token')
        navigate('/')
    }
    return (
        <>
            <nav>
                <div style={{ width: '40px' }}></div>
                <div>Yandex Disk API</div>
                <div>
                    <button onClick={handleClick}>logout</button>
                </div>
            </nav>
            <FileLoader />
        </>
    )
}

export default NavBar;