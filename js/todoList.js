function TodoListItem(name, initialState) {
    var self = this;
    
    self.isChecked = ko.observable(initialState);

    self.switchChecked = function () {
        var state = self.isChecked();
        self.isChecked(!state);
    };
    
    self.css = ko.computed(function () {
        var iconClass = self.isChecked() ? "fa-check-circle-o" : "fa-circle-o";
        return "fa fa-2x " + iconClass;
    });
    
    self.name = ko.observable(name);
}

function TodoList() {
    var self = this;
    
    self.entries = ko.observableArray();
    
    self.totalTodoCount = ko.computed(function () {
        return self.entries().length;
    });
    
    self.selectedTodoCount = ko.computed(function () {
        var selectedCount = _.countBy(self.entries(), function (e) { return e.isChecked();  });
        return selectedCount["true"] || 0;
    });
    
    self.newEntryName = ko.observable();
    
    function _addEntry(name, state){
        self.entries.push(new TodoListItem(name, state));
    }
    
    self.addNewEntry = function () {
        _addEntry(self.newEntryName());
        self.newEntryName('');
    };
}