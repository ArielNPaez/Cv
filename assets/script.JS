document.addEventListener('DOMContentLoaded', () => {
    // ---- Animación de tarjetas al hacer scroll (opcional pero recomendado) ----
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        observer.observe(card);
    });
    
    // ---- Lógica de descarga de PDF ----
    const downloadButton = document.getElementById('download-pdf');
    const originalIcon = downloadButton.innerHTML;

    downloadButton.addEventListener('click', () => {
        downloadButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        downloadButton.disabled = true;

        const element = document.getElementById('pdf-content');
        
        // Opciones de html2pdf ajustadas para máxima fiabilidad
        const options = {
            margin:       0, // Los márgenes se controlan con el padding del CSS interno
            filename:     'CV-NicolasArielPaez.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(element).set(options).save()
            .then(() => {
                downloadButton.innerHTML = originalIcon;
                downloadButton.disabled = false;
            })
            .catch(error => {
                console.error("Error al generar el PDF:", error);
                alert("Hubo un error al generar el PDF.");
                downloadButton.innerHTML = originalIcon;
                downloadButton.disabled = false;
            });
    });
});