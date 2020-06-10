const chai = require('chai');
const chaiHttp = require('chai-http');
chai.should()
const expect = require('chai').expect;
var appRoot = require('app-root-path');
const server = require(appRoot + '/app.js');

// var myModule = require(appRoot + '/lib/my-module.js');



chai.use(chaiHttp);


describe('Email API with body', () => {
    describe('/POST /api/v1/sendMail', () => {
        it('it should test that email was sent', (done) => {
            let test = {
                recipients: "teamfierce@gmail.com",
                subject: "Fierce",
                body: "we are winning"
            }
            chai.request(server)
                .post("/api/v1/sendMail")
                .send(test)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('data')
                    res.body.data.should.have.property('message').eq('mail sent successfully')
                    done();
                })

        })

        it('expect user to have property recepients,suject and body', (done) => {
            let test = {
                recipients: "teamfierce@gmail.com",
                subject: "Fierce",
                body: "we are winning",


            }
            expect(test).to.have.property('recipients')
            expect(test).to.have.property('subject')
            expect(test).to.have.property('body')
            chai.request(server)

                .post("/api/v1/sendMail")
                .send(test)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')

                    done();
                })

        })

        it('mail should not be posted if the body field is empty', (done) => {
            let test = {


            }
            chai.request(server)
                .post("/api/v1/sendMail")
                .send(test)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eq('These fields are required')
                    done();
                })

        })

        it('expect cc and bcc to be array', (done) => {
            let test = {
                recipients: "teamfierce@gmail.com",
                subject: "Fierce",
                body: "we are winning",
                cc: [],
                bcc: []


            }
            expect(test.bcc).to.eql([])
            expect(test.bcc).to.eql([])
            chai.request(server)

                .post("/api/v1/sendMail")
                .send(test)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')

                    done();
                })

        })


    })
})




describe('Email API with Template', () => {
    describe('/POST /api/v1/sendmailwithtemplate', () => {
        it('it should test that email was sent', (done) => {
            let test = {
                recipients: "teamfierce@gmail.com",
                subject: "Fierce",
                body: "<h1>We are winning</h1>"
            }
            chai.request(server)
                .post("/api/v1/sendmailwithtemplate")
                .send(test)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')
                    res.body.should.have.property('data')
                    res.body.data.should.have.property('message').eq('mail sent successfully')
                    done();
                })

        })

        it('expect user to have property recepients,suject and body', (done) => {
            let test = {
                recipients: "teamfierce@gmail.com",
                subject: "Fierce",
                body: "<h1>We are winning</h1>",


            }
            expect(test).to.have.property('recipients')
            expect(test).to.have.property('subject')
            expect(test).to.have.property('body')
            chai.request(server)

                .post("/api/v1/sendmailwithtemplate")
                .send(test)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')

                    done();
                })

        })

        it('mail should not be posted if the body field is empty', (done) => {
            let test = {


            }
            chai.request(server)
                .post("/api/v1/sendmailwithtemplate")
                .send(test)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object')
                    res.body.should.have.property('message').eq('These fields are required')
                    done();
                })

        })

        it('expect cc and bcc to be array', (done) => {
            let test = {
                recipients: "teamfierce@gmail.com",
                subject: "Fierce",
                body: "<h1>We are winning</h1>",
                cc: [],
                bcc: []


            }
            expect(test.bcc).to.eql([])
            expect(test.bcc).to.eql([])
            chai.request(server)

                .post("/api/v1/sendmailwithtemplate")
                .send(test)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object')

                    done();
                })

        })


    })
})
