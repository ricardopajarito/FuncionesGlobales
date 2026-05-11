import { Resend } from 'resend';
import { config, datosCorreo } from "./config.mjs";

const resend = new Resend(config.RESEND_API_KEY);
let statusCode = 400;
let mensaje = "";

export const handler = async (event, context) => {
  console.log("Evento recibido:", event);

  try {

    if (event.httpMethod !== "POST") {
      throw new Error("Método no permitido");
    }
    let dominio = event.headers?.origin;

    if (!dominio) {
      throw new Error("No se proporcionó el dominio de origen.");
    }

    console.log("Dominio de origen:", dominio);
    const body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const { datosFormulario, plantilla } = body;

    if (!datosFormulario || !plantilla) {
      throw new Error("No se proporcionaron datos del formulario o la plantilla.");
    }

    const recaptchaResponse = datosFormulario["g-recaptcha-response"];

    if (!recaptchaResponse) {
      throw new Error("No se proporcionó la respuesta del recaptcha.");
    }

    const secretKey = config.RECAPTCHA_SECRET_KEY;

    const response = await fetch(config.URL_CAPTCHA_GOOGLE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${recaptchaResponse}`,
    });

    const result = await response.json();

    console.log("Respuesta del reCAPTCHA:", result);

    if (!result.success) {
      throw new Error("Error de validación");
    }

    // Enviar correo
    await enviarCorreo(datosFormulario, plantilla, dominio);

    statusCode = 200;
    mensaje = "Correo enviado exitosamente";
  } catch (error) {
    console.error("Error en el handler:", error);
    statusCode = 500;
    mensaje = "Error al enviar el correo. Por favor, inténtalo de nuevo más tarde.";
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

async function enviarCorreo(datosFormulario, plantilla, dominio) {

  if (datosCorreo[dominio]) {
    let datosRemitente = datosCorreo[dominio].datosRemitente;
    let datosDestinatario = datosCorreo[dominio].datosDestinatario;
    let plantillaHTML = datosCorreo[dominio].plantillas[plantilla];

    if (!plantillaHTML) {
      throw new Error("Plantilla no encontrada.");
    }

    if (!datosRemitente || !datosDestinatario) {
      throw new Error("Datos de remitente o destinatario no encontrados.");
    }

    let payload = {
      from: `${datosRemitente.nombre} <${datosRemitente.correo}>`,
      to: [`${datosDestinatario.correo}`],
      subject: plantillaHTML.asunto,
      html: plantillaHTML.html(datosFormulario)
    };
    console.log("Payload para Resend:", payload);

    const { data, error } = await resend.emails.send(payload);
  
    if (error) {
      console.error(error);
    }
  
    console.log({ data });
  } else {
    throw new Error("Accion no permitida.");
  }
}