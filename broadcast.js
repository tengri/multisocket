
/* ПО сути, это доработка localStorage

 1) listen работает в том числе для текущей вкладки
 2) set создает событие(вызывает хендлер) даже если предедущее значение совпадает с новым

 */

var Broadcast = function(){

    var handlers = {};

    var wrap = function(obj){
        return JSON.stringify({value: obj, id: Math.random()})
    };

    var unwrap = function(str){
        return JSON.parse(str).value;
    };

    this.set = function(key, value){
        var record = wrap(value);
        localStorage.setItem(key, record);
        if (handlers[key]) handlers[key](value);
    };

    this.get = function(key){
        return unwrap(localStorage.getItem(key));
    };

    this.listen = function(key, cb){
        handlers[key] = cb;
    };

    window.addEventListener('storage', function(event){
        var value = unwrap(event.newValue);
        if (handlers[event.key]) handlers[event.key](value);
    });

};