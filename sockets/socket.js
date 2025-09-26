const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket_controller');

// Mensajes de Sockets
io.on('connection', (client) => {

    console.log('Cliente conectado');
    // console.log( client.handshake.headers['x-token'] );
    const [ valido, uid ] = comprobarJWT(client.handshake.headers['x-token']);

    // console.log(valido, uid);

    // Verificar autenticación
    if ( !valido ) { return client.disconnect(); }

    // Cliente autenticado
    usuarioConectado( uid );

    // Ingresar al usuario a una sala en particular
    // Sala global, client.id, 68c0b55d3833cd8a73e6db27
    client.join( uid );

    // Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', async ( payload ) => {
        // console.log(payload);
        // TODO: Grabar mensaje
        await grabarMensaje( payload );
        io.to( payload.para ).emit( 'mensaje-personal', payload );
    })

    //client.to(uid).emit('');

    //console.log('Cliente autenticado');

    client.on('disconnect', () => {
        usuarioDesconectado( uid );
    });


    
    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);
    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );
    // });


});
