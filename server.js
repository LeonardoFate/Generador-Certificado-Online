// const express = require('express');
// const PDFDocument = require('pdfkit');
// const path = require('path');
// const app = express();

// app.use(express.json());
// app.use(express.static('public'));

// app.post('/generate', (req, res) => {
//     const { name, cedula, cargo, codigo, grupo, fecha_ingreso, monto_venta, status } = req.body;
//     const doc = new PDFDocument();

//     // Configuración del encabezado para descargar el PDF
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename="certificado.pdf"');

//     // Ruta de la imagen
//     const logoPath = path.join(__dirname, 'images', 'logo.jpg');

//     // Agregar el logo centrado en la parte superior
//     const pageWidth = doc.page.width;
//     const logoWidth = 100; // Ajusta el tamaño si es necesario
//     doc.image(logoPath, (pageWidth - logoWidth) / 2, 50, { width: logoWidth });

//     // Agregar la fecha y lugar a la derecha
//     doc.fontSize(12).text(`Guayaquil, ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`, 400, 150);
//     doc.moveDown(2);

//     // Título del certificado
//     doc.fontSize(24).text("CERTIFICADO", { align: 'center' });
//     doc.moveDown(2);

//     // Cuerpo del certificado
//     const contenido = `Por medio de la presente certifico que ${name.toUpperCase()} con CI: ${cedula}, trabaja en la Compañía YANBAL ECUADOR S.A. como ${cargo}, con código ${codigo}, en el GRUPO #${grupo} desde ${fecha_ingreso}, con un monto de venta mensual de $${monto_venta} y con el status de ${status}.\n\nLa Consultora ${name.toUpperCase()} ha demostrado entrega, perseverancia y responsabilidad en las tareas que se le asignan en su labor diaria.\n\nLa portadora de este documento puede hacer uso de la forma más conveniente.`;
//     doc.fontSize(12).text(contenido, { align: 'justify' });
//     doc.moveDown(4);

//     // Firma y pie de página
//     doc.text("Atentamente,", { align: 'left' });
//     doc.moveDown(3);
//     doc.text("___________________________", { align: 'left' });
//     doc.text("Sr. Andrea Franco Carranza", { align: 'left' });
//     doc.text("Directora Junior", { align: 'left' });
//     doc.text(`Grupo #${grupo}`, { align: 'left' });

//     // Finalizar el PDF
//     doc.pipe(res);
//     doc.end();
// });

// app.listen(3000, () => {
//     console.log('Servidor activo en http://localhost:3000');
// });

// const express = require('express');
// const PDFDocument = require('pdfkit');
// const app = express();

// app.use(express.json());
// app.use(express.static('public'));

// app.post('/generate', (req, res) => {
//     const { name, cedula, cargo, codigo, grupo, fecha_ingreso, monto_venta, status } = req.body;
//     const doc = new PDFDocument();

//     // Configuración del encabezado para descargar el PDF
//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', 'attachment; filename="certificado.pdf"');

//     // Agregar la fecha y lugar
//     doc.fontSize(12).text(`Guayaquil, ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`, { align: 'right' });
//     doc.moveDown(2);

//     // Título del certificado
//     doc.fontSize(24).text("CERTIFICADO", { align: 'center' });
//     doc.moveDown(2);

//     // Cuerpo del certificado
//     const contenido = `Por medio de la presente certifico que ${name.toUpperCase()} con CI: ${cedula}, trabaja en la Compañía YANBAL ECUADOR S.A. como ${cargo}, con código ${codigo}, en el GRUPO #${grupo} desde ${fecha_ingreso}, con un monto de venta mensual de $${monto_venta} y con el status de ${status}.\n\nLa Consultora ${name.toUpperCase()} ha demostrado entrega, perseverancia y responsabilidad en las tareas que se le asignan en su labor diaria.\n\nLa portadora de este documento puede hacer uso de la forma más conveniente.`;
//     doc.fontSize(12).text(contenido, { align: 'justify' });
//     doc.moveDown(4);

//     // Firma y pie de página
//     doc.text("Atentamente,", { align: 'left' });
//     doc.moveDown(3);
//     doc.text("___________________________", { align: 'left' });
//     doc.text("Sr. Andrea Franco Carranza", { align: 'left' });
//     doc.text("Directora Junior", { align: 'left' });
//     doc.text(`Grupo #${grupo}`, { align: 'left' });

//     // Finalizar el PDF
//     doc.pipe(res);
//     doc.end();
// });

// app.listen(3000, () => {
//     console.log('Servidor activo en http://localhost:3000');
// });

const express = require('express');
const bodyParser = require('body-parser');
const certificateRoutes = require('./routes/certificate');
const errorMiddleware = require('./middlewares/errorMiddleware');
const app = express();

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas
app.use('/certificates', certificateRoutes);

// Middleware de error
app.use(errorMiddleware);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});
