
export const yandexInit = (setToken) => {
    return window.YaAuthSuggest.init({
        client_id: 'f95e552af1594dd585f6ec1aca8cc1f3',
        response_type: 'token',
        redirect_uri: 'https://dazzling-raindrop-0c8ca0.netlify.app/empty'
    },
        'https://dazzling-raindrop-0c8ca0.netlify.app', {
        view: 'button',
        parentId: 'yaBtn',
        buttonView: 'main',
        buttonTheme: 'light',
        buttonSize: 'm',
        buttonBorderRadius: 0
    }
    )
        .then(function (result) {
            return result.handler()
        })
        .then(function (data) {
            localStorage.setItem('access_token', data.access_token)
            setToken(data.access_token);
        })
        .catch(function (error) {
            console.log('Что-то пошло не так: ', error);
            ;
        });
};

