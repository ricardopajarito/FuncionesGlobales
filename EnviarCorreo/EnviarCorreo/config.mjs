export const config = {
    URL_CAPTCHA_GOOGLE: 'https://www.google.com/recaptcha/api/siteverify',
    RECAPTCHA_SECRET_KEY: "6Ld6w-MsAAAAAPcZmcjsdweUeKREAMcXtiiiCUSC",
    RESEND_API_KEY: "re_4ycYrmBC_3ZTsvqUJHWMQEBFMmBfj84Ni"
};

export const datosCorreo = {
    "https://mihotelsanjosepuebla.com": {
        "datosRemitente": {
            "nombre": "Hotel San José Puebla",
            "correo": "no-reply@agenciatwowolves.com.mx"
        },
        "datosDestinatario": {
            "correo": "ricardopch15@gmail.com"
        },
        "plantillas": {
            "p-contacto": {
                "asunto": "Nuevo mensaje de contacto",
                "html": (payload) => {
                    return `
                        <p><strong>Nombre:</strong> ${payload.name} ${payload.lastname}</p>
                        <p><strong>Email:</strong> ${payload.email}</p>
                        <p><strong>Teléfono:</strong> ${payload?.phone || 'No proporcionado'}</p>
                        <p><strong>Se comunica desde:</strong> ${payload?.place || 'No proporcionado'}</p>
                        <p><strong>¿En qué servicio está interesado?:</strong> ${payload?.services || 'No proporcionado'}</p>
                        <p><strong>Comentarios de su proyecto:</strong> ${payload?.message || 'No proporcionado'}</p>
                        <p><strong>¿Cómo nos conoció?:</strong><br/>${payload?.media || 'No proporcionado'}</p>
                    `
                }
            }
        }
    },
    "https://agenciatwowolves.com.mx": {
        "datosRemitente": {
            "nombre": "Agencia Two Wolves",
            "correo": "no-reply@agenciatwowolves.com.mx"
        },
        "datosDestinatario": {
            "correo": "ricardopch15@gmail.com"
        },
        "plantillas": {
            "p-contacto": {
                "asunto": "Nuevo mensaje de contacto",
                "html": (payload) => {
                    return `
                        <p><strong>Nombre:</strong> ${payload.name} ${payload.lastname}</p>
                        <p><strong>Email:</strong> ${payload.email}</p>
                        <p><strong>Teléfono:</strong> ${payload?.phone || 'No proporcionado'}</p>
                        <p><strong>Se comunica desde:</strong> ${payload?.place || 'No proporcionado'}</p>
                        <p><strong>¿En qué servicio está interesado?:</strong> ${payload?.services || 'No proporcionado'}</p>
                        <p><strong>Comentarios de su proyecto:</strong> ${payload?.message || 'No proporcionado'}</p>
                        <p><strong>¿Cómo nos conoció?:</strong><br/>${payload?.media || 'No proporcionado'}</p>
                    `
                }
            }
        }
    },
    "http://localhost:4321": {
        "datosRemitente": {
            "nombre": "Agencia Two Wolves",
            "correo": "no-reply@agenciatwowolves.com.mx"
        },
        "datosDestinatario": {
            "correo": "ricardopch15@gmail.com"
        },
        "plantillas": {
            "p-contacto": {
                "asunto": "Nuevo mensaje de contacto",
                "html": (payload) => {
                    return `
                        <p><strong>Nombre:</strong> ${payload.name} ${payload.lastname}</p>
                        <p><strong>Email:</strong> ${payload.email}</p>
                        <p><strong>Teléfono:</strong> ${payload?.phone || 'No proporcionado'}</p>
                        <p><strong>Se comunica desde:</strong> ${payload?.place || 'No proporcionado'}</p>
                        <p><strong>¿En qué servicio está interesado?:</strong> ${payload?.services || 'No proporcionado'}</p>
                        <p><strong>Comentarios de su proyecto:</strong> ${payload?.message || 'No proporcionado'}</p>
                        <p><strong>¿Cómo nos conoció?:</strong><br/>${payload?.media || 'No proporcionado'}</p>
                    `
                }
            }
        }
    }
}
