/* *
 * Métodos uteís e helpers.
 *
 * @author renantdesouza.
 * @since 22/09/2015.    
 **/
var UpGrowth = UpGrowth || {};

UpGrowth.util = {};

// Monta um message format para strings
// ex:
//    'campo {0} é obrigatório'.format(var).
// Retorna string formatada.
(function() {
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                // -match é a palavra que vai ser trocada.
                // -number é o indíce do argumento que vai ser colocado no lugar do match.
                // -args é a lista de parâmetros passados.
                // -caso não seja passado paramêtros args[number] é 'undefined'
                // e será retornado a própria palavra.
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
    }
})();

// Cria 'herança' de um objeto.
UpGrowth.util.extend = function(obj1, obj2) {
    return $.extend({}, obj1, obj2)
};

UpGrowth.util.handlebars = {};

// Registra os facilitadores
(UpGrowth.util.handlebars.registerHelper = function() {
    
    // Registra os métodos para realizar operações dentro dos ifs do handlebars
    Handlebars.registerHelper('operation', function(v1, operator, v2, options) {
        var fn = options.fn;
        var inverse = options.inverse;
        switch (operator) {
            case '==' : return (v1 == v2)  ? fn(this) : inverse(this);
            case '===': return (v1 === v2) ? fn(this) : inverse(this);
            case '<'  : return (v1 < v2)   ? fn(this) : inverse(this);
            case '<=' : return (v1 <= v2)  ? fn(this) : inverse(this);
            case '>'  : return (v1 > v2)   ? fn(this) : inverse(this);
            case '>=' : return (v1 >= v2)  ? fn(this) : inverse(this);
            case '&&' : return (v1 && v2)  ? fn(this) : inverse(this);
            case '||' : return (v1 || v2)  ? fn(this) : inverse(this);
            default   : return inverse(this);
        }
    });
    
})();

UpGrowth.util.array = {};

// Ordena o array
//
// Caso não seja passado o tipo de ordenação
// orderna de forma crescente, utiliza a ordenação via iterador
// ou seja o atributo dos objetos é o que define qual ordem
// eles devem seguir.
//
// array é obrigatório, iterator e order não são obrigatórios
UpGrowth.util.array.sort = function(array, iterator, order) {
    iterator = (!iterator) ? function(val) { return val; } : iterator;
    if(order)  {
        if(order == 'decrescent') {
            return UpGrowth.util.array.decrescent(array, iterator);
        }
    }
    return UpGrowth.util.array.crescent(array, iterator);
};

UpGrowth.util.array.crescent = function(array, iterator) {
    if(!iterator) {
        return _.sortBy(array, iterator);
    } else {
        return _.sortBy(array, function(v) {
            return v;
        });
    }
};

UpGrowth.util.array.decrescent = function(array, order) {
    UpGrowth.util.array.crescent(array, order).inverse();
};

// Devolve um array com a concatenação dos arrays
// que estão dentro da matrix
//
// ex: 
//    var result = UpGrowth.util.array.concat([[1,2],[3,4]])
// result é [1,2,3,4];
UpGrowth.util.array.concat = function(matrix) {
    return _.union(matrix)
};

// Devolve o obejeto que possui a condição dentro do array
//
// ex:
//    var result = UpGrowth.util.array.where(
//        [{name: 'bla', idade: 22},
//         {name: 'ble', idade: 22}],
//         {name: 'ble'}
//    );
// result é {name: 'ble': idade: 22};
UpGrowth.util.array.where = function(array, property) {
    return _.findWhere(array, property);
};

// Devolve um array sem objetos duplicados.
UpGrowth.util.array.uniq = function(array) {
    return _.uniq(array);
};

// Devolve um array filtrado, removendo os objetos
// que obedecem a condição.
//
// ex:
//    var result = UpGrowth([1, 2, 3, 4, 5, 6], function(num) { 
//        return num % 2 == 0; 
//    });
//    return 1,3,5.
UpGrowth.util.array.reject = function(array, fn) {
    return _.reject(array, fn);
};

// Devolve um array filtrado, mantendo os objetos
// que obedecem a condição.
//
// ex:
//    var result = UpGrowth([1, 2, 3, 4, 5, 6], function(num) { 
//        return num % 2 == 0; 
//    });
//    return 2,4,6.
UpGrowth.util.array.filter = function(array, fn) {
    return _.filter(array, fn);
};

UpGrowth.util.array.remove = function(array1, array2) {
    return _.without(array1, array2);
};

UpGrowth.util.array.copy = function(array, init, end) {
    var newArray = [];
    if(array && init > 0 && end < array.length) {
         for(var key in array) {
            if(key <= end && key >= init) {
                newArray.push(array[key]);
            }
        }
    }
    return newArray;
};
