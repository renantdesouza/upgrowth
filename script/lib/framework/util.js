/* *
 * Métodos uteís e helpers.
 *
 * @author renantdesouza.
 * @since 22/09/2015.    
 **/
var UpGrowth = UpGrowth || {};

UpGrowth.util = {};

// Cria 'herança' de um objeto.
UpGrowth.util.extend = function(obj1, obj2) {
    return $.extend({}, obj1, obj2)
};

// Registra os facilitadores
(UpGrowth.util.registerHelper = function() {
    
    // Registra os métodos para realizar operações dentro dos ifs do handlebars
    Handlebars.registerHelper('operation', function(v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2)  ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2)   ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2)  ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2)   ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2)  ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2)  ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2)  ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        }
    });
    
})();