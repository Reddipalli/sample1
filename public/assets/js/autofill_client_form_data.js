function htmlreplace(htmldata) {
    htmldata = htmldata.replace(/jquery./g, '');
    var forms_fill_data = $('#forms_filling_data').val();
    if (forms_fill_data != '' && forms_fill_data != undefined) {
        var pat_form_data = JSON.parse(forms_fill_data);
    } else {
        var pat_form_data = "";
    }
    htmldata = appendHTML('class="clientname">', pat_form_data.clientname, htmldata);
    htmldata = appendHTML('class="clienttell">', pat_form_data.clienttell, htmldata);
    htmldata = appendHTML('class="clientdob">', pat_form_data.clientdob, htmldata);
    htmldata = appendHTML('class="clientgender">', pat_form_data.clientgender, htmldata);
    htmldata = appendHTML('class="clientemail">', pat_form_data.clientemail, htmldata);
    htmldata = appendHTML('class="clientaddress">', pat_form_data.clientaddress, htmldata);
    htmldata = appendHTML('class="clientzip_code">', pat_form_data.clientzip_code, htmldata);
    htmldata = appendHTML('class="clientcity">', pat_form_data.clientcity, htmldata);
    htmldata = appendHTML('class="clientstate">', pat_form_data.clientstate, htmldata);

    htmldata = appendHTML(' class="jscriptforms" style="display:none;">', pat_form_data.jscriptforms, htmldata);
    
    return htmldata;
}

function appendHTML(searchStr, appendval, htmldata) {
    if (appendval == undefined) { appendval = ''; }
    if (htmldata.indexOf(searchStr) != -1) {
        var sparr = htmldata.split(searchStr);
        if (searchStr == ' class="jscriptforms" style="display:none;">') {
            htmldata = sparr[0] + ' class="jscriptforms" style="display:block;">' + appendval + sparr[1];
        } else {
            htmldata = sparr[0] + searchStr + appendval + sparr[1];
        }
    }
    return htmldata;
}
