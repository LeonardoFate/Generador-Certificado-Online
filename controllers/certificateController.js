const PDFDocument = require('pdfkit');
const path = require('path');

exports.generateCertificate = (req, res, next) => {
    const { name, cedula, cargo, codigo, grupo, fecha_ingreso, monto_venta, status } = req.body;

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="certificado.pdf"');

    // Configura la posición inicial
    const pageWidth = doc.page.width;

    // Agregar la fecha y lugar, centrado en la parte superior
    const fechaActual = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    doc.fontSize(12).text(`Guayaquil, ${fechaActual}`, { align: 'right' });
    doc.moveDown(2);

    // Título del certificado, centrado
    doc.fontSize(24).text("CERTIFICADO", { align: 'center' });
    doc.moveDown(2);

    // Cuerpo del certificado centrado
    const contenido = `Por medio de la presente certifico que ${name.toUpperCase()} con CI: ${cedula}, trabaja en la Compañía YANBAL ECUADOR S.A. como ${cargo}, con código ${codigo}, en el GRUPO #${grupo} desde ${fecha_ingreso}, con un monto de venta mensual de $${monto_venta} y con el status de ${status}.\n\nLa Consultora ${name.toUpperCase()} ha demostrado entrega, perseverancia y responsabilidad en las tareas que se le asignan en su labor diaria.\n\nLa portadora de este documento puede hacer uso de la forma más conveniente.`;

    // Ajusta el tamaño de la fuente y el texto centrado
    doc.fontSize(12).text(contenido, {
        align: 'justify',
        width: pageWidth - 100, // Limitar el ancho del texto para que no ocupe toda la página
        paragraphGap: 5 // Espaciado entre párrafos
    });
    doc.moveDown(4);

    // Firma y pie de página, centrados
    doc.text("Atentamente,", { align: 'center' });
    doc.moveDown(3);
    doc.text("___________________________", { align: 'left' });
    doc.text("Sr. Andrea Franco Carranza", { align: 'left' });
    doc.text("Directora Junior", { align: 'left' });
    doc.text(`Grupo #${grupo}`, { align: 'left' });

    // Finalizar el PDF
    doc.pipe(res);
    doc.end();
};
