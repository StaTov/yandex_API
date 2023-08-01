
export const yandexInit = (setLoading, setToken) => {
    return window.YaAuthSuggest.init({
        client_id: 'f95e552af1594dd585f6ec1aca8cc1f3',
        response_type: 'token',
        redirect_uri: 'http://localhost:3000/empty'
    },
        'http://localhost:3000', {
        view: 'button',
        parentId: 'yaBtn',
        buttonView: 'main',
        buttonTheme: 'light',
        buttonSize: 'm',
        buttonBorderRadius: 0
    }
    )
        .then(function (result) {
            setLoading(false)
            return result.handler()
        })
        .then(function (data) {
            localStorage.setItem('access_token', data.access_token)
            setToken(data.access_token)
            console.log('Сообщение с токеном: ', data);
        ;
        })
        .catch(function (error) {
            console.log('Что-то пошло не так: ', error);
            ;
        });
};

