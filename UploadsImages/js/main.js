// import functions from the classes js
import { SavePhoto, GetPhoto, SavePhotoPaciente } from '../js/upload.js';
// events
document.getElementById('uploads').addEventListener('change', (event) => { ReadURL(event.target); });
document.getElementById('buttonuploadsimages').addEventListener('click', (event) => { GetFile(); });
document.getElementById('clearbutton').addEventListener('click', (event) => { ClearPhotos(event.target); });
document.getElementById('savebutton').addEventListener('click', (event) => { GetPhotos(); });
document.getElementById('pacientephoto').addEventListener('click', (event) => { GetPhotoPaciente(); });
// general variables
var inputPhotosLength = 0;
var photosAdded = [];
function ReadURL(input) {
  // validate the max number photos allowed
  if (input.files.length > 0 && input.files.length < 3) {          
    // assign length to the global variable
    inputPhotosLength = input.files.length;
    // reader to create an object to convert the image
    var reader;
    for (var i = 0; i <= input.files.length - 1; i++) {
      reader = new FileReader();
      reader.readAsDataURL(input.files[i]); // get photos to convert base 64 string
      reader.onload = function(e) {
        CreatePreviewElements(e.target.result);
      }
    }
  }else
    alert('Solo 2 imagenes permitidas.');
}
function GetFile() {
  document.getElementById("uploads").click();
}
function CreatePreviewElements(base64) {
  // elements
  var img, button, principalDiv = document.getElementById('photos');
  if (principalDiv.querySelectorAll('img').length <= 1) {
    // create an object to split base64 format
    var object = base64.split(",");
    // push image into array
    photosAdded.push(object[1]);
    // create elements
    img     = document.createElement('img');
    // assign the class name
    img.className = 'imagecontent';
    // add attribute
    img.src = base64;          
    // add element to HTML content
    principalDiv.appendChild(img);
    // set the total number of images from principal div container
    document.getElementById('clearbutton').innerHTML = 'ELIMINAR FOTOS (' + principalDiv.querySelectorAll('img').length + ')';
  }else{
    alert('Solo 2 imagenes permitidas.');
  }
}
function ClearPhotos(button){
  document.getElementById("uploads").value = '';
  document.getElementById('photos').innerHTML = '';
  photosAdded = [];
  button.innerHTML = 'ELIMINAR FOTOS (0)';
}
function GetPhotos(){
  SavePhoto(photosAdded)
          .then( (response) => { console.log(response); })
          .catch( (error) => { alert(error);})
}

// save photo paciente on the server folder
function GetPhotoPaciente() {
  var idPaciente = 3095;
  // get photo from the API WEB
  GetPhoto(idPaciente)
      .then( (response) => { SendPhotoPaciente(response, idPaciente); })
      .catch( (error) => { console.log(error); });
}
// send photo to the server
function SendPhotoPaciente(photo, idPaciente) {
  console.log(photo);
  // prepare photo from base 64 object
  if (photo != "") {
    SavePhotoPaciente(photo, idPaciente)
                        .then( (response) => { 
                          // set and validate token
                          console.log(response); 
                        })
                        .catch( (error) => { console.log(error); });
  }
}