
exports.validateEmail = (req, res, next) => {    
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // re.test(String(req.body.recipients).toLowerCase());
    if(req.body.recipients.match(regex)){
        next()
    } else {
        return res
        .status(400)
        .json({
            status: "fail",
            data: {
                message: "invalid e-mail address"
            }
        });
    }
    
}