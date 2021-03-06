/**
 * @constructor
 * @param {Object} options
 */
function SelectEditable( options ) {
	Editable.call(this);
	
	this.options = options;
	
	this.div = Dom.create("div", {});
	
	this.select = SingleSelect.fromObject(options);
	this.select.node.className += ' single_select_focussable';

	Listener.add( this.select.node, 'blur', this.__edit, this, [false] );
	
	Listener.add( this.div, 'click', this.__edit, this, [true] );
	
	Listener.add( this.select.node, 'change', this.__onChange, this, [] );
}

SelectEditable.prototype = new Editable;
SelectEditable.prototype.select = null;
SelectEditable.prototype.div = null;
SelectEditable.prototype.data = null;
SelectEditable.prototype.options = [];

SelectEditable.prototype.setData = function(data) {
	this.data = data;
	this.select.setValue(data);
	this.disabled = false;
	
	var v = this.options[data];
	
	this.div.innerHTML = Editable.formatValue(v);
	Dom.set(this.node, this.div);
};
SelectEditable.prototype.__edit = function( b ) {
	if( b ) {
		if( this.disabled || this.isReadOnly ) {
			return;
		}
		Dom.set(this.node, this.select.node);		
		this.select.node.focus();
	}
	else {
		Dom.set(this.node, this.div);
		this.select.setValue(this.data);
	}
};
SelectEditable.prototype.__onChange = function() {
	this.eventMgr.fire('change', { 'data': this.select.getValue()});
	Dom.set( this.node, Dom.create('img',{'src': '/images/site/bar_loading.gif', 'class': 'ui_bar_loading'}));
	this.disabled = true;
};
