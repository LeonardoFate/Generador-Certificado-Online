document.getElementById('certificateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Cambia la ruta al endpoint de tu función de Netlify
    const response = await fetch('/.netlify/functions/generateCertificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        // Manejar errores de forma más detallada
        const errorData = await response.json();
        alert(`Error al generar el certificado: ${errorData.error || 'Error desconocido'}`);
        return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificado-Yanbal.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url); // Libera la URL creada
});
