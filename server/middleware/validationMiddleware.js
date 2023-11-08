const { body, validationResult } = require('express-validator');

const validationMiddleware = [
    body('email').isEmail(),
    body('password', "incorrect Password").isLength({ min: 5 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next();
    }
]

module.exports = validationMiddleware;