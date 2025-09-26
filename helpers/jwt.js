const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {uid};

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {

            if (err) {
                // no se pudo crear el token
                reject('No se pudo generar el JWT');
            } else {
                // TOKEN!
                resolve(token);
            }

        });

    });





}

const comprobarJWT = ( token = '' ) => {

    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        // req.uid = uid;
        return [true, uid];

        //next();

    } catch (error) {
        return [false, null];
        // return res.status(401).json({
        //     ok: false,
        //     msg: 'Token no válido'
        // });
    }

}


module.exports = {
    generarJWT,
    comprobarJWT
}