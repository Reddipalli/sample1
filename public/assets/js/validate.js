function upperCaseData(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
$(document).ready(function() {
    // $("input[type='text']").attr("maxlength", "120");
    $("input[placeholder='HH']").attr("maxlength", "4");
    $("input[placeholder='MM']").attr("maxlength", "2");
    $('input[id="cell"]').mask('(000)000-0000');
    $('input[id="cell2"]').mask('(000)000-0000');
    $('input[id="cell4"]').mask('(000)000-0000');
    $('input[id="cell3"]').mask('(000)000-0000');
    $('input[id="cell5"]').mask('(000)000-0000');
    $('.cell').mask('(000)000-0000');
    $('input[id="card"]').mask('0000-0000-00000');


    varTextLength = $("input[type='text']");
    $(varTextLength).keyup(function() {
        this.value = upperCaseData(this.value);
    });

    /*
      var flownHoursData = $("input[placeholder='HH']");
      $(flownHoursData).keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, "");
      });
  
      var flownMinData = $("input[placeholder='MM']");
      $(flownMinData).keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, "");
      });*/

    var dateField = $("input[data-date-format='dd/mm/yyyy']");
    $(dateField).keyup(function() {
        this.value = this.value.replace(/[^0-9/\.]/g, "");
    });

    //- Only number Validation 
    $(function() {

        $('.number-only').keypress(function(e) {
                if (isNaN(this.value + "" + String.fromCharCode(e.charCode))) return false;
            })
            .on("cut copy paste", function(e) {
                e.preventDefault();
            });

    });
});

// Used to USA format phone number
/*
function phoneFormatter() {
  $('.phone').on('input', function () {
    var number = $(this).val().replace(/[^\d]/g, '')
    if (number.length == 7) {
      number = number.replace(/(\d{3})(\d{4})/, "$1-$2");
    } else if (number.length == 10) {
      number = number.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    $(this).val(number)
  });
};

$(phoneFormatter);*/

//- Email Validation
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validate(email) {
    console.log(email);
    if (validateEmail(email)) {
        email_verify(email);
    } else {
        alert("email is not valid");
    }
}

// Email Verify
const email_verify = (email) => {
    var user_email = {};
    user_email.email = email;
    $.post('/admin/emailVerify', user_email).then(function(res, status) {
        if (res.status == 1) {
            alert(" Email already exists please enter another Email");
            return false;
        }
    });
}

function validatedateFormet(idsa) {
    var id_val = idsa.id;
    setTimeout('isValidDate("' + id_val + '")', 500);
}

function isValidDate(idval) {
    var dateStr = o(idval).value;
    if (dateStr != '') {
        // Checks for the following valid date formats:
        // MM/DD/YYYY
        // Also separates date into month, day, and year variables
        var datePat = /^(\d{2,2})(\/)(\d{2,2})\2(\d{4}|\d{4})$/;
        var matchArray = dateStr.match(datePat); // is the format ok?
        if (matchArray == null) {
            alert("Date must be in MM/DD/YYYY format")
            o(idval).value = '';
            return false;
        }
        month = matchArray[1]; // parse date into variables
        day = matchArray[3];
        year = matchArray[4];
        if (month < 1 || month > 12) { // check month range
            alert("Month must be between 1 and 12");
            o(idval).value = '';
            return false;
        }
        if (day < 1 || day > 31) {
            alert("Day must be between 1 and 31");
            o(idval).value = '';
            return false;
        }
        if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
            alert("Month " + month + " doesn't have 31 days!")
            o(idval).value = '';
            return false;
        }
        if (month == 2) { // check for february 29th
            var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
            if (day > 29 || (day == 29 && !isleap)) {
                alert("February " + year + " doesn't have " + day + " days!");
                o(idval).value = '';
                return false;
            }
        }
        return true; // date is valid
    }
}