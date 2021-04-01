/* getting base64 of uploded file */
function getBase64(file, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
        callback(reader.result);
    };
    reader.onerror = function(error) {
        console.log('Error: ', error);
    };
}
/*uploading the attach files*/
function getfilenameonupload(attachfile, filedisname) {
    var file_id = attachfile.id;
    console.log('file_id==='+file_id);
    var x = document.getElementById(file_id);
    if ('files' in x) {
        console.log('x.files.length'+x.files.length);
        if (x.files.length == 0) {} else {
            for (var i = 0; i < x.files.length; i++) {
                var file = x.files[i];
                var file_arr = {};
                getBase64(file, function(base64result) {
                    var base64result_arr = base64result.split(',');
                    var base64result_str = '';
                    for (var i = 1; i < base64result_arr.length; i++) {
                        base64result_str += base64result_arr[i];
                    }
                    file_arr.base64 = base64result_str;
                    file_arr.filetype = file.type;
                    var filedata = { filedata: file_arr };
                    $.post('/uploadfiles', { data: filedata }, function(data) {
                        var data = data;
						if(data.status == 1){
                            var savedpath = data.savedpath;
                            if (filedisname == 'formsupload') {
                                var tsave = $('#formuploadpath').val();                              
                                $('#formuploadpath').val(savedpath);
                                $('#formshow').show();
                                var file_s = savedpath.split('/');
                                var id_val = file_s[2].split('.');
                                var hrefstr = "<div id='" + id_val[0] + "'><a href='" + savedpath + "' class='text-info' target='_blank'>" + savedpath + "</a> <a href='javascript:void(0)' class='text-danger'><span class='fas fa-trash-alt' id='formuploadstate' onclick='removefile(id,\"" + savedpath + "\")' ></span></a></div>";
                                $('#formshow').html(hrefstr);
                            }
                        }else{
                            alert(data.message);
                            return false;
                        }
                    });
                })
            }
        }
    }
}
/*removing the attached file name*/
function removefile(id, filename) {
    var id_leng = id.split('_');
    if (id_leng.length == 2) {
        id = id_leng[0];
    } else {
        id = id;
    }
    var file_s = filename.split('/');
    var id_val = file_s[2].split('.');
    if (id == 'formuploadstate') {
        $('.form_upload').show();
        var files_data = $('#formuploadpath').val();
        var allfilesdata = files_data;
        if (files_data == filename) {
            allfilesdata = '';
        }
        var elem = o(id_val[0]);
        elem.parentNode.removeChild(elem);
        $('#' + id_val[0]).remove();
        $('#formuploadpath').val(allfilesdata);
    }
}