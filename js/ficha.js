$(document).ready(function(){
$("#tableAnimal #checkall").click(function () {
        if ($("#tableAnimal #checkall").is(':checked')) {
            $("#tableAnimal input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
                $(this).prop("ng-model", true);
            });

        } else {
            $("#tableAnimal input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
                $(this).prop("ng-model", false);
            });
        }
    });
    
    $("[data-toggle=tooltip]").tooltip();
});