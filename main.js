/*(async () => {

    let URL1 = 'https://restcountries.eu/rest/v2/all';
    let countries = await fetch(URL1);
    countries = await countries.json();

    let URL2 = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    let rates = await fetch(URL2);
    rates = await rates.json();

    console.log(rates);
 
    for(let item of countries){

        let cc = item.currencies[0].code;

        for(let oneRate of rates){
            if(oneRate.cc == cc){
                item.rate = oneRate.rate;
                item.exchangedate = oneRate.exchangedate;
                item.txt = oneRate.txt
                break;
            }
        }
    }

    console.log(countries);
    
    countries = countries.filter(item => item.rate).sort((a, b) => a.currencies[0].code > b.currencies[0].code ? 1 : -1).map( field => `
    
        <div class="alert alert-primary row" role="alert">
            
            <div class="col-md-4 col-6">
                <img src="${field.flag}" class="img-thumbnail" alt="Flag of ${field.name}">
            </div>
        
            <div class="text col-6">
                <h4>${field.name} (${field.currencies[0].code} — ${field.txt}) </h4> 
                <p>Курс: ${field.rate} на ${field.exchangedate}</p>
            </div>
        </div>
    
    `);


    let countryCard = document.querySelector('#special');
    countryCard.innerHTML = countries.join(' ');

})()*/


Vue.createApp({
    data(){
        return{
            countriesBase: [],
            search: '',
            sort: 'none'
        }
    },
    computed: {
        countriesList(){
            let res = this.countriesBase.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()));
            if(this.sort  !== 'none'){
                if(this.sort){
                    res.sort((a, b) => a.name > b.name? 1 : -1);
                }else {
                    res.sort((a, b) => a.name > b.name? -1 : 1);
                }
                
            return res;
            }
        }
    },
    async mounted(){
        let URL1 = 'https://restcountries.com/v2/all';
        let countries = await fetch(URL1);
        countries = await countries.json();
        
    
        let URL2 = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
        let rates = await fetch(URL2);
        rates = await rates.json();

        for(let item of countries){


               let cc = item.currencies[0].code;
        
                for(let oneRate of rates){
                    if(oneRate.cc == cc){
                        item.rate = oneRate.rate;
                        item.exchangedate = oneRate.exchangedate;
                        item.txt = oneRate.txt;
                        break;
                    }
                }
        }

        countries = countries.filter(i => i.rate);

        console.log(countries);
        
        this.countriesBase = countries;
    }

}).mount('#app');



