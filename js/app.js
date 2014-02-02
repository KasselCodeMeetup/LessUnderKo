function ViewModel() {
    var self = this;

    self.todoList = new TodoList();
}

function App() {
    var self = this;

    self.viewModel = new ViewModel();
    ko.applyBindings(self.viewModel);
}

document.addEventListener('DOMContentLoaded', function(){
    window.app = new App();
});
