import { config } from "./config.mjs";
let statusCode = 400;
let mensaje = "";

export const handler = async (event, context) => {


  try {

    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const { datosFormulario, plantilla } = body;

    if (!datosFormulario || !plantilla) {
      throw new Error("No se proporcionaron datos del formulario o la plantilla.");
    }

    const recaptchaResponse = datosFormulario["g-recaptcha-response"];

    if (!recaptchaResponse) {
      throw new Error("No se proporcionó la respuesta del recaptcha.");
    }

    const secretKey = config.RECAPTCHA_SECRET_KEY; // Clave secreta oculta

    // Verificar con Google
    const response = await fetch(config.URL_CAPTCHA_GOOGLE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${recaptchaResponse}`,
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error("Error de validación");
    }

    // Enviar correo

  } catch (error) {
    console.error("Error en el handler:", error);
    statusCode = 500;
    mensaje = "Error al enviar el correo: " + error.message;
  }

  const response = {
    statusCode,
    body: JSON.stringify({
      mensaje
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  };

  return response;
};
