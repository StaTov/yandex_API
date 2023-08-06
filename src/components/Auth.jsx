
const Auth = ({ isLoading }) => {

    return (
        <>
            <div className='container_pageload'>
                <div>{isLoading ? 'загрузка' : 'Авторизация'}</div>
                {isLoading && <div className="circle2"></div>}
                <div id='yaBtn'></div>
            </div>
        </>
    )
}



export default Auth;