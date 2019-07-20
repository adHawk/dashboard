"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const request_1 = __importDefault(require("request"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const apiKey = '*****************';
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "frontend")));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('index');
});
app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    request_1.default(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        }
        else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            }
            else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=server.js.map