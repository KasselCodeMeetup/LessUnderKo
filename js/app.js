function ViewModel(model) {
    var self = this;
    
    model = model || {};
    
    self.todoList = new TodoList(model.entries);
}

function App() {
    var self = this;

    self.load = function () {
        var state = localStorage.getItem("state");
        var model = JSON.parse(state);
        return new ViewModel(model);
    };
    
    self.save = function () {
        
        var state = {
            entries: _.map(self.viewModel.todoList.entries(), function (e) {
                    return {
                        name: e.name(),
                        isChecked: e.isChecked()
                    };
            })
        }
        
        localStorage.setItem("state", JSON.stringify(state));
    };

    self.viewModel = self.load();
    ko.applyBindings(self.viewModel);
}

document.addEventListener('DOMContentLoaded', function(){
    window.app = new App();
});
