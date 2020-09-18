const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

//Api call function
const getQuote = async ()=>{
    loading(); 
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'  //It is to avoid cors issue
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        }else{
            authorText.innerText = data.quoteAuthor
        }
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText
        complete(); //Show the quote after loading
    }catch(err){
        getQuote();
        console.log(err);
    }
}

//Posting quote on twitter
const twitterQuote = () =>{
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    //Opening new tab
    window.open(twitterUrl, '_blank')
}

//Loading function
const loading = () =>{
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Complete function
const complete = () =>{
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', twitterQuote);

getQuote();