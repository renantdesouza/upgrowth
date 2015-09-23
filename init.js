/* *
 * Inicializa o framework.
 *
 * @author renantdesouza.
 * @since 22/09/2015 
 **/
var UpGrowth = UpGrowth || {};

// Executa o método de inicialização via autoinvoke.
(UpGrowth.init = function() {
    UpGrowth.bundle.apply('html', 'pt-BR');
    UpGrowth.template.load('file:///home/renan.souza/workspace/upGrowth/page/carregar-pagina.html', '.main');
})();