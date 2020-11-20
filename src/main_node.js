// npm packages frh
const express = require('express');
const app = express();
const df = require('dialogflow-fulfillment');

// app changing format
app.use(express.json());

app.post('/', (req, res) => {

    const agent = new df.WebhookClient({
        request: req,
        response: res,
    });

    function thirdEvent() {
        const email = req.body.queryResult.parameters.email;
        const password = req.body.queryResult.parameters.password;
        const validUsers = [{
                email: 'chrisCarvalho@gmail.com',
                password: 'Chris@123'
            },
            {
                email: 'abhayChoudhary@gmail.com',
                password: 'Abhay@123'
            },
            {
                email: 'pratikbhangale760@gmail.com',
                password: 'Pratik@123'
            },
        ]
        let isValid = false;

        isValid = validUsers.some((user) => {
            return user.email === email && user.password === password;
        })
        if (isValid) {
            agent.context.set('genderAgeVerify', 1);
            agent.add("Validation Successful. Please enter your age or gender");
        } else {
            agent.context.set('infoQuestion', 1);
            agent.add("Validation failed. Please enter your correct email id and password in format email,password");
        }
    }

    function fourthEvent() {
        const toKnowBook = req.body.queryResult.parameters.knowBook;
        if (toKnowBook === '1') {
            agent.context.set('bookTicket', 1);
            agent.add("Please enter details in following format : source,destination,date");
        } else if (toKnowBook === '2') {
            agent.context.set('againInfoQuestion', 1);
            agent.add("Responded successfully. To know more press 1 and to exit press 2");
        } else {
            agent.context.set('toKnowBook', 1);
            agent.add("Enter 1 to book flight and 2 to know information.");
        }
    }

    function fifthEvent() {
        const source = req.body.queryResult.parameters["geo-city"];
        const destination = req.body.queryResult.parameters["geo-city1"];
        const date = req.body.queryResult.parameters["date-time"];

        if (source !== '' && destination !== '' && date !== '') {
            agent.context.set('againInfoQuestion', 1);
            agent.add("Your tickets are booked. To know more press 1 and to exit press 2");
        } else {
            agent.context.set('bookTicket', 1);
            agent.add("Please enter details in following format : source,destination,date");
        }
    }

    function sixthEvent() {
        const userChoice = req.body.queryResult.parameters.againInfoQuestion;
        if (userChoice === '1') {
            agent.context.set('toknowbook', 1);
            agent.add("Press 1 to book flight and 2 to know boooking information.");
        } else if (userChoice === '2') {
            agent.add("Thanks for choosing us.");
        } else {
            agent.context.set('againInfoQuestion', 1);
            agent.add("To know more press 1 and to exit press 2");
        }
    }

    function seventhEvent(){
        const parameters = req.body.queryResult.parameters;
        if ('age' in parameters){
            const age = req.body.queryResult.parameters.age.amount;
            agent.context.set('toKnowBook', 1);
            agent.add("Thanks for successfully entering the age.Press 1 to book flight and 2 to know information.");
        } else if ('gender' in parameters){
            const gender = req.body.queryResult.parameters.gender;
            agent.context.set('toKnowBook', 1);
            agent.add("Thanks for successfully entering the gender.Press 1 to book flight and 2 to know information.");
        } else {
            agent.context.set('genderAgeVerify', 1);
            agent.add("You are entering wrong information. Please write correct information.");
        }
        
    }


    const intentMap = new Map();
    intentMap.set('ThirdIntent', thirdEvent);
    intentMap.set('FourthIntent', fourthEvent);
    intentMap.set('FifthIntent', fifthEvent);
    intentMap.set('SixthIntent', sixthEvent);
    intentMap.set('seventhIntent',seventhEvent);

    agent.handleRequest(intentMap);


})
app.listen(3000);