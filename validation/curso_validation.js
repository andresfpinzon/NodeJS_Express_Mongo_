const Joi = require('joi'); 

// Validaciones para el objeto curso
const schema = Joi.object({
    titulo: Joi.string()
        .min(3)
        .max(100)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/), 
    descripcion: Joi.string()
        .min(3)
        .max(260)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/),
    alumnos: Joi.number() 
        .integer()
        .min(1)
        .max(100)
        .required(),
    calificacion: Joi.number()
        .precision(1)
        .min(1)
        .max(10)
        .required(),
           
});

module.exports=schema
    