/* *
 * Executar chamadas http.
 * 
 * @author renantdesouza.
 * @since 23/09/2015
 */
var UpGrowth = UpGrowth || {};

// Faz uma chamada http.
var ajax = function(obj) {
    return $.ajax({
        method: obj.method
        url: obj.url,
        data: obj.data
    });
}

// Executa a chamada e retorna a promessa.
UpGrowth.http = function(obj) {
    // Se os parâmetros forem passados retorna uma chamada ajax.
    if(obj) {
        return ajax(obj);
    }
    // Se não retorna um objeto com métodos pré-definidos.
    // Após execução do método prosegue com a promise 
    // retornada pelo $.ajax.
    return {
        get: function(url, data) {
            return ajax({method: 'GET', url: url, data: data});
        },
        post: function(url, data) {
            return ajax({method: 'POST', url: url, data: data});
        },
        put: function() {
            return ajax({method: 'POST', url: url, data: data});
        },
        delete: function() {
            return ajax({method: 'POST', url: url, data: data});
        }
    }
}