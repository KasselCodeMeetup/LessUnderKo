function TodoListItem(name, initialState) {
    var self = this;
    
    self.isChecked = ko.observable(initialState);

    self.switchChecked = function () {
        var state = self.isChecked();
        self.isChecked(!state);
        
        app.save();
    };
    
    self.remove = function () {
        app.viewModel.todoList.entries.remove(self);
        app.save();
    }
    
    self.iconCss = ko.computed(function () {
        var iconClass = self.isChecked() ? "fa-check-circle-o" : "fa-circle-o";
        return "fa fa-2x " + iconClass;
    });
    
    self.nameCss = ko.computed(function () {
        var classes = self.isChecked() ? "todo-done" : "";
        return classes;
    });
    
    self.name = ko.observable(name);
}

function TodoList(entries) {
    var self = this;
    
    self.entries = ko.observableArray();
    self.newEntryName = ko.observable();
    
    self.totalTodoCount = ko.computed(function () {
        return self.entries().length;
    });
    
    self.selectedTodoCount = ko.computed(function () {
        var selectedCount = _.countBy(self.entries(), function (e) { return e.isChecked();  });
        return selectedCount["true"] || 0;
    });
    
    self.removeChecked = function () {
        var checked = _.filter(self.entries(), function (e) { return e.isChecked(); });
        _.each(checked, function (e) {
            self.entries.remove(e);
        });
        
        app.save();
    };

    function _addEntry(name, state){
        self.entries.push(new TodoListItem(name, state));
    }
    
    function _init(){
        if(entries){
            _.each(entries, function (e) { _addEntry(e.name, e.isChecked) });
        }
    }
    
    self.addNewEntry = function () {
        _addEntry(self.newEntryName());
        self.newEntryName('');
        
        app.save();
    };
    
    _init();
}