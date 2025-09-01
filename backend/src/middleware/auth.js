const AUTH_TOKEN = process.env.AUTH_TOKEN || 'securetoken123';

const authenticate = (req, res, next) => {
    const token  =  req.header('Authorization');
    if(!token || token !== `Bearer ${AUTH_TOKEN}`){
        return res.status(401).json({error: 'Unauthorized: Invalid or missing Token'});

    }
    next();
};

module.exports =  authenticate;