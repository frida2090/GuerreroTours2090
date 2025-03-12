function nextStep(step) {
    const currentStep = document.querySelector('.step:not([style*="display: none"])');
    currentStep.style.display = 'none'; // Ocultar paso actual

    const nextStep = document.getElementById('step' + step);
    nextStep.style.display = 'block'; // Mostrar siguiente paso
}

// Enviar el formulario y redirigir o enviar a correo
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir el envío estándar del formulario

    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Simulación de envío de datos a correo (en un proyecto real, usarías un servicio de backend)
    window.location.href = `mailto:santiagocive@gmail.com?subject=Solicitud de ${name}&body=Nombre: ${name}%0D%0ACorreo: ${email}%0D%0ATeléfono: ${phone}%0D%0AMensaje: ${message}`;
});
