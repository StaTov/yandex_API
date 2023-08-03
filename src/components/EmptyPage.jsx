const EmptyPage = () => {
    
    function todo() {
        window.YaSendSuggestToken("https://dazzling-raindrop-0c8ca0.netlify.app", {
            "kek": true
        });
    };

    todo();
    return null
}

export default EmptyPage;