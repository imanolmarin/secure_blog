exports.handler = async function(event, context) {
    // Permitir CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };
    
    // Manejar preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }
    
    if (event.httpMethod === 'POST') {
        try {
            const data = JSON.parse(event.body);
            console.log('Datos recibidos de Pepe:', data);
            
            // Guardar en un archivo o base de datos
            // Por ahora solo logueamos y respondemos
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    success: true, 
                    message: 'Datos recibidos',
                    received: data 
                })
            };
        } catch (error) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Error procesando datos' })
            };
        }
    }
    
    return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Método no permitido' })
    };
};
