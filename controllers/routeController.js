const nodemailer = require('nodemailer');
require('dotenv').config()

let email;
let name;
let amount;
//generates random id;
let tr_id = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
let currentDate = new Date();
let cDay = currentDate.getDate();
let cMonth = currentDate.getMonth() + 1;
let cYear = currentDate.getFullYear();
let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

module.exports.homeGET = (req,res)=>{
    res.render('index.ejs',{title:process.env.TITLE})
}


module.exports.donate = (req,res)=>{
    email = req.body.email
    name = req.body.name
    amount = req.body.amount
    console.log("")
    console.log("")
    console.log("")
    console.log("=================== The Sparks Foundation - Internship ===========================")
    console.log(`                          Donor Name : ${name}`)
    console.log(`                               Email : ${email}`)
    console.log(`                              Amount : ${amount}`)
    console.log("==================================================================================")
    res.render('donate.ejs',{amount:amount})
}

module.exports.success = (req, res) => {


        // Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        }
    });

    // Message object
    let message = {
        from: 'Paypal',
        to: email,
        subject: 'Payment Success Notification ✔',
        text: 'Hello to myself!',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        <style type="text/css">
        
            body
            {
                background:#f2f2f2;
            }
        
            .payment
            {
                border:1px solid #f2f2f2;
                height:280px;
                border-radius:20px;
                background:#fff;
            }
           .payment_header
           {
               background:rgba(255,102,0,1);
               padding:20px;
               border-radius:20px 20px 0px 0px;
               
           }
           
           .check
           {
               margin:0px auto;
               width:50px;
               height:50px;
               border-radius:100%;
               background:#fff;
               text-align:center;
           }
           
           .check i
           {
               vertical-align:middle;
               line-height:50px;
               font-size:30px;
           }
        
            .content 
            {
                text-align:center;
            }
        
            .content  h1
            {
                font-size:25px;
                padding-top:25px;
            }
        
            .content a
            {
                width:200px;
                height:35px;
                color:#fff;
                border-radius:30px;
                padding:5px 10px;
                background:rgba(255,102,0,1);
                transition:all ease-in-out 0.3s;
            }
        
            .content a:hover
            {
                text-decoration:none;
                background:#000;
            }
            .left{
                text-align: left;
            }
           
            </style>
        </head>
        <body>
            <div class="container">
                <div class="row">
                   <div class="col-md-6 mx-auto mt-5">
                      <div class="payment">
                         <div class="payment_header">
                            <div class="check"><i class="fa fa-check" aria-hidden="true"></i></div>
                         </div>
                         <div class="content">
                            <h1>Payment Success !</h1>
                            <h4 style="font-weight:bold;">Hey ${name}! </h4>
                            <h1>$ ${amount} Donated</h5>
                            <h1 style="color: rgb(66, 56, 56);font-size: small;font-weight: bold;">THE SPARK FOUNDATION</h1>
                         </div>
                         
                      </div>
                   </div>
                </div>
             </div>
             </br>
             </br>
             </br>
             </br>
             <h4>Transanction Details</h4>
             <div class="left"> 
             <p>Amount : $ ${amount} </p>
             <p>Status : Success </p>
             <p>ID     : ${tr_id()} </p>
             <p>Transanction Date : ${"<b>" + cDay + "/" + cMonth + "/" + cYear + "</b>"} </p>
             <p>Time : ${time}</p>
             </div>
        </body>
        </html>`
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
    });
});

res.render('success.ejs',{name:name,email:email})
};

