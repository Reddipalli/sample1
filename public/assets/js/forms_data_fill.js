/*global id function to get the value of given id*/
function o(id) {
    var obj = '';
    try {
        obj = document.getElementById(id);
        if (obj != null) {
            return obj;
        } else {
            console.log('ERROR ID ' + id);
        }
    } catch (e) {
        console.log('ERROR  IN ' + e);
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function openppapa(did) {
    console.log("we are in openppapa");
    try {
        var client_name = o('first_name').value + ' ' + o('last_name').value;
        var gender = $("input[name='gender']:checked").val();
        var dob = o('dt').value;
        var cell = o('cell').value;
        var pemail = o('pemail').value;
        var paddress = o('paddress').value;
        var zip_code = o('zip_code').value;
        var city = o('city').value;
        var state = o('state').value;
        //var city = "";
        //var state = "";

        setCookie('clientname', client_name, 10);
        setCookie('clienttell', cell, 10);
        setCookie('clientdob', dob, 10);
        setCookie('clientgender', gender, 10);
        setCookie('clientemail', pemail, 10);
        setCookie('clientaddress', paddress, 10);
        setCookie('clientzip_code', zip_code, 10);
        setCookie('clientcity', city, 10);
        setCookie('clientstate', state, 10);

        window.open("/foms_data_fill/" + did);

    } catch (e) {
        console.log('ERROR  IN ' + e);
    }

}

function formsdatafilling() {
    var pat_name = o('first_name').value + ' ' + o('last_name').value;
    var gender = $("input[name='gender']:checked").val();

    var allforms_filling_data = {
        clientname: pat_name,
        clienttell: o('cell').value,
        clientdob: o('dt').value,
        clientgender: gender,
        clientemail: o('pemail').value,
        clientaddress: o('paddress').value,
        clientzip_code: o('zip_code').value,
        //clientcity: o('city').value,
        clientcity: '',
        // clientstate: o('state').value,
        clientstate: '',

        jscriptforms: '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js" />',
        base_urls: $('#baseurl').val()
    }
    $('#forms_filling_data').val(JSON.stringify(allforms_filling_data));
}