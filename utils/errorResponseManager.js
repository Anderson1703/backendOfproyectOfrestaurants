const errorResponseManager = (error, req, res, next) => {
    switch (error.status) {
        case 500:
            console.log(error);
            res.status(error.status).json({isError:true,message:"error interno"});
            break;

        case 502:
            if (error.data.code === 11000) {
                res.status(error.status).json({isError:true, message: "Este nombre ya existe" });
            } else if (error.data.name == "CastError") {
                res.status(404).json({
                    message: "not found ):",
                });
            }
            else {
                console.log(error);
                res.status(error.status).json({isError:true, message: "respuesta externa incorrecta" });
            }
            break;

        case 406:
            res.status(error.status).json({isError:true, message:error.data.message});
            break;

        default:
            console.log(error);
            next();
            break;
    }
}

module.exports = errorResponseManager;