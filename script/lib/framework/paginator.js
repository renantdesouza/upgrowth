/* *
 * Paginação de listas.
 * 
 * @author renantdesouza.
 * @since 24/09/2015.
 **/
var UpGrowth = UpGrowth || {};

UpGrowth.paginator = {};

var _items = [];
var _itemsForPage = [];
var _position = 0;

var _hasMorePages = false;

// Inicializa a paginação,
//
// Caso a quantidade de items passado
// for menor que a quantidade de itens
// por página define como não existente 
// uma nova página.
UpGrowth.paginator.init = function(items, itemsForPage) {
    _items = items;
    _itemsForPage = itemsForPage;
    _position = 0;
    _hasMorePages = (_items && _items.length > _itemsForPage);
};

UpGrowth.paginator.first = function()  {
    if(_hasMorePages) {
        return _items;
    }
    return UpGrowth.util.array.copy(_items, _position = 0, _itemsForPage - 1);
};

UpGrowth.paginator.next = function() {
    var len = _items.lengt;
    if(_hasMorePages) {
        return UpGrowth.util.array.copy(
            _items, 
            _position, 
            (_position + _itemsForPage < len) ? _position += _itemsForPage : len
        );
    }
    return UpGrowth.util.array.copy(array, position, len);
};

UpGrowth.paginator.back = function() {
    if(_position > 0) {
        return UpGrowth.util.array.copy(
            _items,
            (_position - _itemsForPage > 0) ? _position -= _itemsForPage : 0,
            _itemsForPage
        );
    }
    return UpGrowth.util.array.copy(array, _position, _itemsForPage.length);
};

UpGrowth.paginator.last = function() {
    var len = items.length;
    if(_hasMorePages) {
        var val = calculateNumberOfPages()
        UpGrowth.util.array.copy(_items,  val * _itemsForPage - _itemsForPage, len);
    }
    return UpGrowth.util.array.copy(_items, _position, len);
};

var calculateNumberOfPages = function() {
    return Math.floor(_items / _itemsForPage);
};