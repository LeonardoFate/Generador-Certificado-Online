const PDFDocument = require('pdfkit');
const stream = require('stream'); // Para manejar el stream del PDF en la respuesta

// Función para generar el certificado PDF
const generateCertificatePDF = (data) => {
    const { name, cedula, cargo, codigo, grupo, fecha_ingreso, monto_venta, status } = data;

    const doc = new PDFDocument();

    // Buffer para capturar el PDF generado
    return new Promise((resolve, reject) => {
        const buffer = [];
        const bufferStream = new stream.PassThrough();

        doc.pipe(bufferStream);

        bufferStream.on('data', (chunk) => buffer.push(chunk));
        bufferStream.on('end', () => resolve(Buffer.concat(buffer)));
        bufferStream.on('error', reject);

        // Configurar el PDF
        const pageWidth = doc.page.width;
        const fechaActual = new Date().toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });

        doc.fontSize(12).text(`Guayaquil, ${fechaActual}`, { align: 'right' });
        doc.moveDown(2);

        doc.fontSize(24).text("CERTIFICADO", { align: 'center' });
        doc.moveDown(2);

        const contenido = `Por medio de la presente certifico que ${name.toUpperCase()} con CI: ${cedula}, trabaja en la Compañía YANBAL ECUADOR S.A. como ${cargo}, con código ${codigo}, en el GRUPO #${grupo} desde ${fecha_ingreso}, con un monto de venta mensual de $${monto_venta} y con el status de ${status}.\n\nLa Consultora ${name.toUpperCase()} ha demostrado entrega, perseverancia y responsabilidad en las tareas que se le asignan en su labor diaria.\n\nLa portadora de este documento puede hacer uso de la forma más conveniente.`;

        doc.fontSize(12).text(contenido, {
            align: 'justify',
            width: pageWidth - 100,
            paragraphGap: 5,
        });

        doc.moveDown(4);

        doc.text("Atentamente,", { align: 'center' });
        doc.moveDown(3);
        doc.text("___________________________", { align: 'left' });
        doc.text("Sr. Andrea Franco Carranza", { align: 'left' });
        doc.text("Directora Junior", { align: 'left' });
        doc.text(`Grupo #${grupo}`, { align: 'left' });

        // Finalizar el documento
        doc.end();
    });
};

module.exports = { generateCertificatePDF };
