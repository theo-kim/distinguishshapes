/**
 * Created by Suhan on 07/06/2017.
 */
/**
 * Created by Suhan on 25/03/2017.
 */
var mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
// my schema goes here!
const Click = new mongoose.Schema({
    user: String,
    data: String
});
const Admininfo = new mongoose.Schema({
    data: String,
});
const Bonus = new mongoose.Schema({
    user: String,
    data: String
});
const Past = new mongoose.Schema({
    user: String,
    data: String
});
//URLSlugs('<user>');
// Link.plugin(URLSlugs('title'));
mongoose.model('Click', Click);
mongoose.model('Bonus', Bonus);
mongoose.model('Admininfo', Admininfo);
mongoose.model('Past', Past);

// mongoose.model('Link', Link);
mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost/funds');

mongoose.connect('mongodb://suhan1996:112496@ds161262.mlab.com:61262/heroku_c0q14znc');

//mongodb://<dbuser>:<dbpassword>@ds161262.mlab.com:61262/heroku_c0q14znc