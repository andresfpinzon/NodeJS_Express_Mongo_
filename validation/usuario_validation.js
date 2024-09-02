const Joi = require('joi'); 

// Validaciones para el objeto usuario
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/), 
    password: Joi.string()
        .pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'edu', 'co'] } }),
    cursos: Joi.array()
        .items(Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/))
});

module.exports= schema