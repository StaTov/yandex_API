const EmptyPage = () => {
    
    function getToken() {
        window.YaSendSuggestToken("https://dazzling-raindrop-0c8ca0.netlify.app", {
            "kek": true
        });
    };

    getToken();
    return null
}

export default EmptyPage;