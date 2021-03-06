var crypto = require('crypto');

exports.encode = function(payload, secret){
    algorithm = 'HS256';

    var header = {
        typ: 'JWT',
        alg: algorithm
    };

    var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));

    return jwt + '.' + sign(jwt, secret);
}

function base64Encode(str){
    return new Buffer(str).toString('base64');
}

function sign(str, key) {
    return crypto.createHmac('sha256',key).update(str).digest('base64');
}

export.decode = function(token, secret){
var segments = token.split('.');

if(segments.length !== 3)
    throw new Error('Invalid token');

var header  = JSON.parse(base64Decode(segment[0]));
var payload = JSON.parse(base64Decode(segment[1]));

var rawsignature = segments[0] + '.' + segments[1];

if(!verify(rawsignature, secret, segments[2])){

}    
return payload
}

function base64Decode(str){
    return new Buffer(str, 'base64').toString();
}

function verify(raw, secret, signature){
    return signature === sign(raw,secret);
}