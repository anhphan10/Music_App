//upload images
const uploadImage = document.querySelector("[upload-image]")
if (uploadImage) {
  const uploadImageInput = document.querySelector("[upload-image-input]");
  const uploadImagePreview = document.querySelector("[upload-image-preview]")
  uploadImage.addEventListener("change", (e) => {
    console.log(e)
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file)
    }
  });
}

//end upload images

//upload audio
const uploadAudio = document.querySelector("[upload-audio]")
if (uploadAudio) {
  const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadAudio.querySelector("[upload-audio-play]");
  const source = uploadAudio.querySelector("source");
  uploadAudioInput.addEventListener("change", (e) => {
    if(e.target.files.length){
      const audio = URL.createObjectURL(e.target.files[0]);
      source.src = audio;
      uploadAudioPlay.load();
    }
  });
}

//end upload audio