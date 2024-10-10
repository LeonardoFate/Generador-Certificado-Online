const { generateCertificatePDF } = require('../../certificateController'); // Importamos la lógica del controlador

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Método no permitido. Usa POST.' }),
      };
    }

    // Parsear el cuerpo de la solicitud
    const data = JSON.parse(event.body);

    // Generar el certificado usando el controlador
    const pdfBuffer = await generateCertificatePDF(data);

    // Devolver el PDF como respuesta
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Certificado-Yanbal.pdf"`,
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error al generar el certificado',
        details: error.message,
      }),
    };
  }
};
