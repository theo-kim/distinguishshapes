/**
 * Created by Suhan on 07/06/2017.
 */
var json = require('hbs-json');
var hbs = require('hbs');
hbs.registerHelper('json', json);

const path = require('path');
const express = require("express");
const session = require("express-session");
const db = require("./db");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
const sessionOptions = {
    secret: 'secret for signing session id',
    saveUninitialized: false,
    resave: false
};
app.set('view engine', 'hbs');

app.use(session(sessionOptions));
// hbs setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
const mongoose = require('mongoose');
const Click = mongoose.model('Click');
const Bonus = mongoose.model('Bonus');
const Admininfo = mongoose.model('Admininfo');

app.get('/welcome',function (req,res) {
    Admininfo.find({}, function(err, result){
        // res.render('index',{'result':result});
        res.render('welcome',{'result':result});
    });


});

//changes

// app.get('/',function (req,res) {
//     res.sendFile('index_old.html');
// });
app.get('/',function (req,res) {
    Click.find({}, function(err, result1) {

        Admininfo.find({}, function (err, result) {
            res.render('index', {'result': result,'result1':result1});
        });
    });
});
app.get('/database',function (req,res) {

    app.set('view engine', 'hbs');
    "use strict";

    Click.find({}, function(err, result1){
        //init(result,'workid');
        console.log("Players Result",result1);
        //res.render('result', {result:result.reverse(),result1:result1});
        // res.render('database.html', { result:result });
        res.render('result2', {result1:result1.sort().reverse()});
    });



});
app.post('/userdata',function(req,res){
    console.log("app post",req.body.user);
    //myName = req.body.myName;
    Click.find({user:req.body.user}, function(err, result){
        if(result.length!=0){

            console.log(result[0].data,req.body.data,"update data of the same user");

            result[0].data = req.body.data;

            result[0].save((err) => {
                if(err) {
                    console.log(err);
                    res.send('an error has occurred, please check the server output');
                }
                else{
                    res.redirect('/');
                }
            });
        }
        else {
            console.log("new click to db");
            const click1 = new Click({
                user: req.body.user,
                data: req.body.data
            });
            click1.save((err) => {
                if(err) {
                    console.log(err);
                    res.send('an error has occurred, please check the server output');

                }
                else{
                    res.redirect('/');
                }
            });

        }
    })

})
// app.get('/database',function (req,res) {
//
//     app.set('view engine', 'hbs');
//     "use strict";
//     Bonus.find({}, function(err, result1){
//
//         Click.find({}, function(err, result){
//             init(result,'workid');
//
//             //console.log("Players Result",result);
//         res.render('result', {result:result.reverse(),result1:result1});
//         // res.render('database.html', { result:result });
//
//     });
//     });
//
//
// })
app.get('/result',function (req,res) {

    app.set('view engine', 'hbs');
    "use strict";
    Click.find({}, function(err, result){
        let rst = result;
        console.log("Players Result",rst);
        res.render('result2', {result:rst});
        // res.render('database.html', { result:result });


    });})
app.get('/resultjson',function (req,res) {
    app.set('view engine', 'hbs');
    "use strict";
    Click.find({}, function(err, result){

        let rst = result;
        res.send(rst);
        // res.render('database.html', { result:result });

    });})
app.get('/bonusjson',function (req,res) {
    app.set('view engine', 'hbs');
    "use strict";
    Bonus.find({}, function(err, result){

        let rst = result;
        res.send(rst);
        // res.render('database.html', { result:result });

    });})

app.get('/admin',function (req,res) {
    app.set('view engine', 'hbs');
    "use strict";
    Admininfo.find({}, function(err, result){
        res.render('admin',{'result':result});
    });
    //res.render('admin');

})

app.post('/delete',function (req,res) {
    console.log('deleting ready')

    Click.remove({},function () {
        console.log('delete all clicks')
    })
    res.send('good');
})

app.post('/admininfo',function (req,res) {
    console.log('test')

    Admininfo.find({}, function(err, result){
        if (result.length==0){
            const Admininfo_1 = new Admininfo({
                data: req.body.shapes,
            });
            Admininfo_1.save((err) => {
                if(err) {
                    console.log(err);
                    res.send('an error has occurred, please check the server output');

                }
                else{
                    res.redirect('/');
                }
            });
        }else {
            console.log(result)
            result[0].data = req.body.shapes;
            result[0].save((err) => {
                if (err) {
                    console.log(err);
                    res.send('an error has occurred, please check the server output');

                }
                else {
                    res.redirect('/');
                }
            });
        }
        });


        });



app.get('/grantbonus',function (req,res) {
    app.set('view engine', 'html');
    "use strict";
    Bonus.find({}, function(err, result){
        console.log("grantbonusresult",result)
        for (let i=0;i<result.length;i++){
            let x = result[i];
            console.log('this is x',x.user)
            Click.find({user:x.user}, function(err, result1){
                if(result1.length!=0){
                    //console.log("is this?",result1[0])
                let obj =JSON.parse(result1[0].data);
                obj.bonused = 'has been bonused already';
                result1[0].data = JSON.stringify(obj);
                //res.render('bonus.hbs', { result:result,result1:result1 });
                result1[0].save((err) => {
                    if(err) {
                        console.log(err);
                        res.send('an error has occurred, please check the server output');

                    }
                    //res.send("good");

                });
                }});

        }

       });
})
app.post('/result/bonus',function (req,res) {
    const bonus1 = new Bonus({
        user: req.body.user,
        data: req.body.data
    });
    bonus1.save((err) => {
        if(err) {
            console.log(err);
            res.send('an error has occurred, please check the server output');

        }
        else{
            res.redirect('/');
        }
    });
})
app.post('/givebonus',function (req,res) {
    Click.find({}, function(err, result){
        //res.send(rst);
        // res.render('database.html', { result:result });
        //console.log(result.toString())
     init(result,'bonus');
    })
    res.end();
});

app.post('/result/feedback',function (req,res) {
    Click.find({user:req.body.user}, function(err, result){
        //res.send(rst);
        // res.render('database.html', { result:result });
        //console.log(result.toString())
        if(result.length!=0){

            console.log(result[0].data,req.body.data,"update data of the same user");

            let feedback = req.body.data;
            let obj = JSON.parse(result[0].data);
            obj.zfeedback = feedback;
            result[0].data = JSON.stringify(obj);

            result[0].save((err) => {
                if(err) {
                    console.log(err);
                    res.send('an error has occurred, please check the server output');
                }
            });
        }
    })
    res.end();
});
app.post('/result/post', function(req, res) {
    console.log("app post",req.body.user);
    //myName = req.body.myName;
    Click.find({user:req.body.user}, function(err, result){
        if(result.length!=0){

            console.log(result[0].data,req.body.data,"update data of the same user");

            result[0].data = req.body.data;

            result[0].save((err) => {
                if(err) {
                    console.log(err);
                    res.send('an error has occurred, please check the server output');

                }
                else{
                    res.redirect('/');
                }
            });
        }
        else {
            console.log("new click to db");
            const click1 = new Click({
                user: req.body.user,
                data: req.body.data
            });
            click1.save((err) => {
                if(err) {
                    console.log(err);
                    res.send('an error has occurred, please check the server output');

                }
                else{
                    res.redirect('/');
                }
            });

        }
    })

});



function init(new_json, which) {
    //let userlist = document.querySelectorAll('.user');
    //console.log('userlist',userlist)

    //loadJSON(function (response) {
    //let json = document.querySelector('#json').innerHTML;
    //console.log('json',json)

//        $.getJSON( 'https://sortingfunds.herokuapp.com/resultjson', function(response) {


    // Parse JSON string into object
    var actual_JSON = new_json;
    //console.log('json',actual_JSON)


    var config = {
        access: 'AKIAIM5RDWIKG2R3D2HA',
        secret: '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',
        //real or test
        sandbox: true
    }

    var mturk = require('mturk-api');
//var uuid = require('node-uuid');
    //var hitId = "3WRKFXQBOB7JZHEK66NBSH4AF6KYI0";
    var hitId = "3P4C70TRMRHL3R1QX3YIDXPYRW4GLE";


    var counter = 0;
    mturk.createClient(config).then(function (api) {
        console.log("starting")

        // api.req('SearchHITs', { PageSize: 100 }).then(function(res){
        //   console.log(res.SearchHITsResult[0].HIT)
        //
        // }).catch(console.error)



        // let pagesize = 10;
        // api.req('GetAssignmentsForHIT',{HITId:hitId,PageNumber:1}).then(function(res){
        //     let totalresult = res.GetAssignmentsForHITResult[0].TotalNumResults;
        //     let pages = parseInt(totalresult/pagesize)+2;
        //     for (let o=1;o<pages;o++) {
        //     //let o=1;
        //         console.log("o is",o);
        //         api.req('GetAssignmentsForHIT',{HITId:hitId,PageNumber:o}).then(function(res) {
        //             console.log("what's this", res.GetAssignmentsForHITResult)
        //
        //             for (let i = 0; i < pagesize; i++) {
        //                 //let i=0
        //                 let assignment = res.GetAssignmentsForHITResult[0].Assignment;
        //                 if(assignment[i]!=undefined){
        //
        //                 let workerid = assignment[i].WorkerId
        //                 let answer = (assignment[i].Answer)
        //                 let A_id = assignment[i].AssignmentId
        //                 let usercode = answer.slice(answer.indexOf('<FreeText>') + 10, answer.indexOf('</FreeText>'))
        //
        //                 if(which = "workid"){
        //
        //                     Click.find({user:usercode}, function(err, result){
        //                         if(result.length!=0){
        //                             let obj = JSON.parse(result[0].data)
        //
        //                             if(obj['workid']!=workerid){
        //
        //                                 console.log("equals",obj.workid==workerid)
        //                                 console.log('oldone',obj['workid'])
        //                                 obj.workid = workerid;
        //                                 console.log("obj",obj.workid)
        //
        //                                 result[0].data = JSON.stringify(obj);
        //
        //                                 result[0].save((err) => {
        //                                     //console.log(result[0].data,"update data of the same user");
        //                                     console.log("addingworkid")
        //
        //                                     if(err) {
        //                                         console.log(err);
        //                                         res.send('an error has occurred, please check the server output');
        //
        //                                     }
        //                                 });
        //                             }
        //                         }
        //                         // res.render('database.html', { result:result });
        //                         //console.log(totalresult, workerid, usercode, assignment)
        //                         // if(result.length==0){
        //                         //     if(getbonus(usercode)){
        //                         //         grantbonus(workerid, A_id, getbonus(usercode), "Thanks for finishing the test", usercode);
        //                         //     }
        //                         // }
        //
        //                     });
        //                 }
        //                 if(which = "bonus"){
        //
        //                     Bonus.find({user:usercode}, function(err, result){
        //                         // res.render('database.html', { result:result });
        //                         //console.log(totalresult, workerid, usercode, assignment)
        //                         setTimeout(function () {
        //
        //                             if(result.length==0){
        //                             setTimeout(function () {
        //                             if(getbonus(usercode)){
        //                                 grantbonus(workerid, A_id, getbonus(usercode), "Thanks for finishing the test", usercode);
        //                             }
        //                         },1000);
        //                         }
        //                         },1000);
        //
        //                     });
        //                 }
        //             }
        //             }});
        //     }
        // }).catch(console.error)






        function Addworkid(usercode,workerid,A_id){
            Click.find({user:usercode}, function(err, result){
                if(result.length!=0){
                    console.log("json data",result[0].data)
                    let obj = JSON.parse((result[0].data).toString())

                    if(obj['workid']!=workerid){

                        console.log("equals",obj.workid==workerid)
                        console.log('oldone',obj['workid'])
                        obj.workid = workerid;
                        console.log("obj",obj.workid)

                        result[0].data = JSON.stringify(obj);

                        result[0].save((err) => {
                            //console.log(result[0].data,"update data of the same user");
                            console.log("addingworkid")

                            if(err) {
                                console.log(err);
                                //res.send('an error has occurred, please check the server output');

                            }
                        });
                    }
                    else {
                        Bonus.find({user:usercode}, function(err, result){
                            console.log('resultbonus',result)
                            // res.render('database.html', { result:result });
                            //console.log(totalresult, workerid, usercode, assignment)
                            //setTimeout(function () {

                            if(result.length==0){
                                console.log("getbonus",usercode,getbonus(usercode));

                                //setTimeout(function () {
                                if(getbonus(usercode)){
                                    console.log("testing",getbonus(usercode))
                                    grantbonus(workerid, A_id, getbonus(usercode), "Thanks for finishing the test", usercode);
                                }
                                //},1000);
                            }
                            //},1000);

                        });
                    }

                }
                //if the workid is already there, and haven't been bonused yet

                // res.render('database.html', { result:result });
                //console.log(totalresult, workerid, usercode, assignment)
                // if(result.length==0){
                //     if(getbonus(usercode)){
                //         grantbonus(workerid, A_id, getbonus(usercode), "Thanks for finishing the test", usercode);
                //     }
                // }

            });

        }
        // function Addbonus(usercode,workerid,A_id){
        //     Bonus.find({user:usercode}, function(err, result){
        //         // res.render('database.html', { result:result });
        //         //console.log(totalresult, workerid, usercode, assignment)
        //         //setTimeout(function () {
        //
        //             if(result.length==0){
        //                 console.log("getbonus",getbonus(usercode));
        //                 //setTimeout(function () {
        //                     if(getbonus(usercode)){
        //                         console.log("testing",getbonus(usercode));
        //                         grantbonus(workerid, A_id, getbonus(usercode), "Thanks for finishing the test", usercode);
        //                     }
        //                 //},1000);
        //             }
        //         //},1000);
        //
        //     });
        // }




        let pagesize = 10;
        api.req('GetAssignmentsForHIT',{HITId:hitId,PageNumber:1}).then(function(res){
            let totalresult = res.GetAssignmentsForHITResult[0].TotalNumResults;
            console.log("what's this", res.GetAssignmentsForHITResult)
            let pages = parseInt(totalresult/pagesize)+1;
            for (let o=1;o<pages;o++) {
                api.req('GetAssignmentsForHIT',{HITId:hitId,PageNumber:o}).then(function(res) {
                    for (let i = 0; i < pagesize; i++) {
                        console.log("this is ", i)

                        let assignment = res.GetAssignmentsForHITResult[0].Assignment;
                        console.log("assign ", assignment.length)

                        let workerid = assignment[i].WorkerId
                        let answer = (assignment[i].Answer)
                        let A_id = assignment[i].AssignmentId
                        let usercode = answer.slice(answer.indexOf('<FreeText>') + 10, answer.indexOf('</FreeText>'))

                        console.log("those info", totalresult, workerid, usercode, assignment)
                        //grantbonus(workerid,A_id,getbonus(usercode),"Thanks for finishing the test");
                        if(which == "workid"){
                            Addworkid(usercode,workerid,A_id)
                            console.log('workid')



                        }
                        if(which == "bonus"){
                            console.log('bonusing')

                            // Bonus.find({user:usercode}, function(err, result) {
                            //     if(result.length==0){
                            //
                            //     Addbonus(usercode, workerid, A_id)
                            //     console.log('bonusing')
                            //     }
                            // })


                        }
                    }
                });
            }
        }).catch(console.error)

        function getbonus(usercode) {
            let bonus = "0";
            //console.log('test',actual_JSON)
            let user = actual_JSON.filter(x => {
                //that's valid x
                return x.user == usercode
            })
            console.log("user[0].data",usercode,user[0])
            if(user.length!=0){
                if(JSON.parse((user[0].data).toString()).totalReturn_beforePayment)


            bonus = parseFloat(JSON.parse((user[0].data).toString()).totalReturn_beforePayment )* (100 - parseFloat(JSON.parse((user[0].data).toString()).totolSortTimes)*parseFloat(JSON.parse((user[0].data).toString()).percent)) / 10000

            return {"Amount": bonus.toFixed(2), "CurrencyCode": "USD"};
            }
            else{
                //return {"Amount": 1.50, "CurrencyCode": "USD"};

                return false;
            }
        }

        function grantbonus(workerid, A_id, bonus, reason, usercode) {

            "use strict";
            api.req('GrantBonus', {
                WorkerId: workerid,
                AssignmentId: A_id,
                BonusAmount: bonus,
                Reason: reason
            }).then(function (res) {
                //Do something
                console.log("grantbonus", res.GrantBonusResult)
                const bonus1 = new Bonus({
                    user: usercode,
                    data: bonus.Amount
                });
                bonus1.save((err) => {
                    if(err) {
                        console.log(err);

                    }
                    else{
                        console.log("save new bonus as "+ bonus1)
                    }
                });
            }).catch(console.error);
            //let req = new XMLHttpRequest();
            //req.open('POST', '/result/bonus', true);
            //req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
            //req.send("user=" + usercode + "&data=" + bonus);
        }


        api.req('GetAccountBalance').then(function (res) {
            //Do something
            console.log(res.GetAccountBalanceResult)
        }).catch(console.error);


    }).catch(console.error);

//        });
}


//app.listen(3000);
if(process.env.PORT == undefined){
    //app.listen(8888);
    app.set('port', (process.env.PORT || 8888));

}
else{
    // app.listen(process.env.PORT);
    app.set('port', (process.env.PORT || 8888));

}



app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


