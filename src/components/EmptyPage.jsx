const EmptyPage = () => {
    
    function todo() {
        window.YaSendSuggestToken("http://localhost:3000", {
            "kek": true
        });
    };

    todo();
    return (
        <>
        </>
    )
}

export default EmptyPage;