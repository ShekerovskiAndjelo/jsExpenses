$(document).ready(function () {
    var budget = 0;
    var totalExpense = 0;

    $('#budget-form').submit(function (e) {
        e.preventDefault();
        var budgetInput = parseFloat($('#budget-input').val());
        if (!isNaN(budgetInput) && budgetInput >= 0) {
            budget = budgetInput;
            $('#budget-amount').text(budget.toFixed(2));
            $('.budget-input-error').empty();
            updateBalance();
        } else {
            $('.budget-input-error').text('Budget cannot be empty or negative.');
        }
    });

    $('#expense-form').submit(function (e) {
        e.preventDefault();
        var expenseTitle = $('#expense-input').val();
        var expenseAmount = parseFloat($('#amount-input').val());

        if (!isNaN(expenseAmount) && expenseTitle.trim() !== '' && expenseAmount >= 0) {
            addExpenseToTable(expenseTitle, expenseAmount);
            totalExpense += expenseAmount;
            $('#expense-amount').text(totalExpense.toFixed(2));
            updateBalance();
            $('#expense-input').val('');
            $('#amount-input').val('');
            $('.expense-title-error, .amount-input-error').empty(); 
        } else {
            if (expenseTitle.trim() === '') {
                $('.expense-title-error').text('Expense title cannot be empty.');
            }
            if (isNaN(expenseAmount) || expenseAmount < 0) {
                $('.amount-input-error').text('Amount cannot be empty or negative.');
            }
        }
    });

    $('#budget-input, #expense-input, #amount-input').focus(function () {
        $('.budget-input-error, .expense-title-error, .amount-input-error').empty();
    });

    function createEditButton() {
        return $('<button class="btn btn-info btn-sm edit-expense">Edit</button>');
    }

    function updateBalance() {
        var balance = budget - totalExpense;
        $('#balance-amount').text(balance.toFixed(2));
    }

    function addExpenseToTable(title, amount) {
        var row = $('<tr></tr>');
        var titleCell = $('<td>' + title + '</td>');
        var amountCell = $('<td>$' + amount.toFixed(2) + '</td>');
        var actionCell = $('<td></td>');

        var editButton = createEditButton();
        var deleteButton = $('<button class="btn btn-danger btn-sm delete-expense">Delete</button>');

        editButton.click(function () {
            $('#expense-input').val(title);
            $('#amount-input').val(amount);
            row.remove();
            totalExpense -= amount;
            $('#expense-amount').text(totalExpense.toFixed(2));
            updateBalance();
        });

        deleteButton.click(function () {
            row.remove();
            totalExpense -= amount;
            $('#expense-amount').text(totalExpense.toFixed(2));
            updateBalance();
        });

        actionCell.append(editButton);
        actionCell.append(deleteButton);

        row.append(titleCell);
        row.append(amountCell);
        row.append(actionCell);

        $('#expense-table').append(row);
    }

    $('#expense-table').on('click', '.delete-expense', function () {
        var row = $(this).closest('tr');
        var expenseAmount = parseFloat(row.find('td:eq(1)').text().replace('$', ''));
        row.remove();
        totalExpense -= expenseAmount;
        $('#expense-amount').text(totalExpense.toFixed(2));
        updateBalance();
    });
});
