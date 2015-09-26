/* *
 * Grid para um tipo escificíco.
 *
 * @author renantdesouza.
 * @since 22/09/2015.
 **/
var UpGrowth = UpGrowth || {};

UpGrowth.grid = {};

UpGrowth.grid.items = [];

var _fields = []; 

// define qual o tipo de ordenação cria.
var order = 'crescent';

UpGrowth.grid.init = function(items) {
    this.items = items;
    for(var i in items) {
        // define os fields que serão o cabeçalho do grid
        var item = items[i];
        for(var key in item) {
            _fields = key;
        }
        break;
    }
}; 

UpGrowth.grid.order = function(param) {
    order = (order === 'crescent') ? 'crescent' : 'decrescent';
    return UpGrowth.util.array[order](this.items, param);
};