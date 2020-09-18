//Api call function

const getQuote = async ()=>{
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'  //It is to avoid cors issue
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
    }catch(err){
        getQuote()
        console.log(err);
    }
}

getQuote();