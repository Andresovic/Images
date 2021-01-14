
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