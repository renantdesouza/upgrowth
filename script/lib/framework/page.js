/* *
 * Controlador para as páginas.
 *
 * @author renantdesouza.
 * @since 22/09/2015.
 **/
var UpGrowth = UpGrowth || {};

UpGrowth.page = {};

// TODO testar dessa forma se der errado 
// descomentar cógido abaixo e apagar getters.
var _buttons = [], _fields = [], _obj = {};
//UpGrowth.page._buttons = [];
//UpGrowth.page._fields = [];
//UpGrowth.page._obj = {};

// Adiciona os botões e registra suas ações.
UpGrowth.page.registerButtons = function(buttons)  {
    _buttons = buttons;
    for(var key in _buttons) {
        var button = _buttons[key];
        $('#' + button.name).on('click', button.fn);
    }
};

// Adiciona os campos que vão existir na tela.
UpGrowth.page.registerFields = function(fields) {
    _fields = fields;
    for(var key in _fields) {
        var field = _fields[key];
        _obj[field] = '';
    }
};

// Inicializa a nova página, 
// deve ser usado após os registradores.
UpGrowth.page.init = function(url) {
    UpGrowth.template.load(url, '.main', _obj);
};

// Cria herança da página.
UpGrowth.page.inherit = function() {
    return UpGrowth.util.extend({}, UpGrowth.page)
};

UpGrowth.page.getButtons = function() {
    return _buttons;
};

UpGrowth.page.getFields = function() {
    return _fields;
};

UpGrowth.page.clean = function() {
    _buttons = _fields = [];
    _obj = {};
}