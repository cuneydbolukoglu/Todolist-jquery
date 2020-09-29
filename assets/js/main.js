// TODO LIST
$(document).ready(function () {

    var table = $("table");
    const newLocal = [{
        name: "Accordion",
        source: "Javascript Testing",
        desc: "Lorem ipsum dolar"
    },
    {
        name: "Drag and Drop",
        source: "jQuery plugin",
        desc: "Lorem Ipsum rastgele sözcüklerden oluşmaz.",
    }];
    var data = newLocal;

    data.forEach(function (index) {
        table.prepend('<tr><td data-field="name"> ' + index.name + ' </td><td data-field="source">' + index.source + '</td><td data-field="desc">' + index.desc + '</td><td><i class="fas fa-pen edit" title="save"></i><i class="fas fa-trash-alt del" title="delete"></i></td></tr>');
    });

    // Add Row
    $("#add").click(function () {
        add();
    });

    function add() {
        var delButton = ("tbody tr:first-child .del");

        table.find("tbody").prepend(getRow);
        table.find(delButton).click(function () {
            $(this).closest("tr").remove();


            //code editing
            data.splice(2);
            delete data[2];
        });

        $(".save").click(function () {
            var isSave = $(this).hasClass("save");
            var saveClass = "fa-save save";
            var editClass = "fa-pen edit";
            var iconTitle = isSave ? "edit" : "save";

            $(this).addClass(isSave ? editClass : saveClass).removeClass(isSave ? saveClass : editClass).attr("title", iconTitle);

            save(this, isSave);
        });
    }

    function getCurrentTableData(item) {
        var name = item.find("[data-field=name]").text();
        var source = item.find("[data-field=source]").text();
        var desc = item.find("[data-field=desc]").text();

        return { name: name, source: source, desc: desc };
    }

    function save(item, isSave) {
        var currentItem = $(item).closest("tr");
        var collection = currentItem.find("td[data-field]");

        collection.each(function () {
            var inputItem = $(this);
            var text = inputItem.text();

            inputItem.html(isSave ? inputItem.find("input").val() : getInput(text));
        });

        data.push(getCurrentTableData(currentItem));
    }

    function getRow() {
        return '<tr><td data-field="name"><input type="text"></td><td data-field="source"><input type="text"></td><td data-field="desc"><input type="text"></td><td><i class="fas fa-save save" title="save"></i><i class="fas fa-trash-alt del" title="delete"></i></td></tr>'
    }

    // Edit row
    $(".edit").click(function () {
        var isEdit = $(this).hasClass("edit");
        var editClass = "fa-pen edit";
        var saveClass = "fa-save save";
        var iconTitle = isEdit ? "save" : "edit";

        $(this).addClass(isEdit ? saveClass : editClass).removeClass(isEdit ? editClass : saveClass).attr("title", iconTitle);

        edit(this, isEdit);
    });

    function getInput(text) {
        return '<input type="text"  value="' + text + '" />'
    }

    function edit(item, isEdit) {
        var currentItem = $(item).closest("tr");
        var collection = currentItem.find("td[data-field]");

        collection.each(function () {
            var inputItem = $(this);
            var text = inputItem.text();

            inputItem.html(isEdit ? getInput(text) : inputItem.find("input").val());
        });

        data.push(getCurrentTableData(currentItem));
    }

    // Remove row      
    $(".del").click(function () {
        $(this).closest("tr").remove();
    });

});