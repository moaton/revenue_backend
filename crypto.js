const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = 'IM6RlAbBlqAWkslTzyuVTOsG53QwA7KZ';


const encrypt = (text, password) => {
    
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, password, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash, password) => {

    const decipher = crypto.createDecipheriv(algorithm, password, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};