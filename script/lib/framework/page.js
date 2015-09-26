/* *
 * Controlador para as páginas.
 *
 * @author renantdesouza.
 * @since 22/09/2015.
 **/
var UpGrowth = UpGrowth || {};

UpGrowth.page = {};

// Monta um message format para strings
// ex:
//    'campo {0} é obrigatório'.format(var).
// Retorna string formatada.
(function() {
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                // -match é o conteúdo que vai ser trocado.
                // -number é o indíce do argumento que vai ser colocado no lugar do match.
                // -args é a lista de parâmetros passados.
                // -caso não seja passado paramêtros args[number] é 'undefined'
                // e será retornado a própria palavra.
                return typeof args[number] != 'undefined' ? args[number] : match;
            });
        };
    }
})();

UpGrowth.page._buttons = [];
UpGrowth.page._fields = [];
UpGrowth.page._requireds = [];
UpGrowth.page._obj = {};

// Adiciona os botões e registra suas ações.
// Passar no formato [{name: 'bla', fn: function() {}}]
// name obrigatório, fn obrigatório.
UpGrowth.page.registerButtons = function(buttons)  {
    this._buttons = buttons;
    for(var key in this._buttons) {
        var button = this._buttons[key];
        $('#' + button.name).on('click', button.fn);
    }
};

// Adiciona os campos que vão existir na tela.
// Passar no formato [{ name: 'bla', required: true}]
// name obrigatório, required default false.
UpGrowth.page.registerFields = function(fields) {
    this._fields = fields;
    for(var key in fields) {
        var field = fields[key];
        this._obj[field.name] = '';
        if(field.required) {
            this._requireds.push(field.name);
        }
    }
};

// Inicializa a nova página, 
// deve ser usado após os registradores.
UpGrowth.page.init = function(url) {
    UpGrowth.template.load(url, '.main', this._obj);
};

UpGrowth.page.clean = function() {
    this._buttons = this._fields = this._requireds = [];
    this._obj = {};
}

//TODO verificar internacionalização dentro do 
UpGrowth.page.submitError = function(empties) {
    var b = UpGrowth.bundle.
    var error = b.getValue('error');
    for(var key in empties) {
        var empty = empties[key];
        error += b.getValue('submit.error').format(empty);
    }    
}

// Valida os campos requeridos e 
// executa os callbacks de sucesso ou erro.
UpGrowth.page.submit = function(success, error) {
    var empties = [];
    for(var key in this._requireds) {
        var required = this._requireds[key];
        if(!$('#' + required).val()) {
            empties.push(required);
        }
    }
    if(empties.length == 0) {
        success();
    } else {
        if(error) {
            error(empties);
            return;
        }
        this.submitError(empties);
    }
};

// Cria herança da página.
UpGrowth.page.inherit = function() {
    return UpGrowth.util.extend({}, this);
};