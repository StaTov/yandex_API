import { Outlet} from "react-router-dom"


const Nav = ({ setToken, token }) => {
  

    const handleClick = () => {
        localStorage.removeItem('access_token')
        setToken(null)
    }

    return (
        <div className='container'>
            <nav>
                <div style={{ width: '40px' }}></div>
                <div>Yandex Disk API</div>
                <div style={{ minWidth: '40px' }}>
                    {token && <button onClick={handleClick}>logout</button>}
                </div>
            </nav>
            <Outlet />
        </div>
    )
}

export default Nav;