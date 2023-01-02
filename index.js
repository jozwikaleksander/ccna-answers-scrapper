// INCLUDING LIBRARIES
const cheerio = require('cheerio');
const request = require('request-promise');
const express = require('express');
var favicon = require('serve-favicon');
const ejs = require('ejs');
ejs.delimiter = '/';
ejs.openDelimiter = '[';
ejs.closeDelimiter = ']';

// App configuration
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
    request("https://itexamanswers.net/ccna-3-v7-modules-9-12-optimize-monitor-and-troubleshoot-networks-exam-answers.html", (error, response, html) => {
        if(!error){ 
          const $ = cheerio.load(html);

          let questions = $("div.thecontent").html();

          if(questions){
            questions = questions.replace(/<p><\/p><div class="message_box announce">.+paragraph -->/gm,"");
            questions = questions.replace(/<!-- Ezoic .+End Ezoic .+ -->/gm,"");
            questions = questions.replace(/<h3>.+<\/h3>/gm,"");
            res.render('index',{questions:questions});
          }
        }
    });
 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});