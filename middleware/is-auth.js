
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = jwt.sign({ data: 'foobar' }, 'secret', { expiresIn: '1h' });

    // Verify JWT
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            console.error(err);
        } else {
            console.log(decoded);
            next()
        }
    });
}