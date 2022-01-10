const express = require ('express')
const bodyParser= require('body-parser')
const axios = require ('axios')
const ejs = require('ejs')

const app= express()
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'))
app.set('view engine','ejs')

app.get("/",(req,res)=>{ 
    res.render("homePage")
}) 
   
app.post('/',(req,res)=>{      
    const movieName= req.body.movieName 
    const url = " http://www.omdbapi.com/?apikey=598e69bd&t="+movieName

    axios.get(url).then((response)=>{     
        if(response.data.Response === "True"){
        
            const {Title,Plot,Poster,Genre,Director,Language,Awards,Rated}=response.data

            res.render('success', {
                movieTitle : Title, 
                moviePlot : Plot, 
                moviePoster : Poster,
                imdbRating : typeof response.data.Ratings[0] === 'undefined'? "N/A" :response.data.Ratings[0].Value ,
                rottenRating : typeof response.data.Ratings[1] === 'undefined'? "N/A" :response.data.Ratings[1].Value ,
                metacriticRating: typeof response.data.Ratings[2] === 'undefined'? "N/A" :response.data.Ratings[2].Value ,
                genre : Genre,
                director : Director,
                language : Language,
                awards : Awards,
                rated : Rated
            });

        } else{
            res.render('failure');
        }

})

})

app.post("/back",(req,res)=>[
    res.redirect("/")
])

app.listen(process.env.PORT || 3000, ()=>{
console.log("listening at 3000")
})

