
export function SavePhoto(photos) {
    var data = new FormData();
    data.append("photos", photos);
    return fetch('http://localhost/laboratoriosProfauna/profauna/api.profauna.com/v1/photoscontroller/upload', {
        method: 'POST',
        body: data
    })
    .then( function(response) {
       if(response.ok) {
           return response.json()
       } else {
           throw "Invalid parameters";
       }
    }) //fulfilled
    .catch(function(err) {
       return err;
    });
}

export function GetPhoto(idpaciente) {
    // detalles in API
    return fetch('http://api.profauna.local.com/Laboratorios/patientImage/read.php?key=' + idpaciente, {
        method: 'GET'
    })
    .then( function(response) {
       if(response.ok) {
           return response.json()
       } else {
           throw 0;
       }
    }) //fulfilled
    .catch(function(err) {
       return err;
    });
}

export function SavePhotoPaciente(photo, id) {
    // login in API
    return fetch('http://localhost/laboratoriosProfauna/profauna/api.profauna.com/v1/photoscontroller/paciente', {
        method: 'POST',
        body: JSON.stringify({ photo: photo, idPaciente: id })
    })
    .then( function(response) {
       if(response.ok) {
           return response.json()
       } else {
           throw "Invalid parameters";
       }
    }) //fulfilled
    .catch(function(err) {
       return err;
    });
}