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
    if (e.target.files.length) {
      const audio = URL.createObjectURL(e.target.files[0]);
      source.src = audio;
      uploadAudioPlay.load();
    }
  });
}

//end upload audio
    
//change-status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonChangeStatus.length > 0) {

  const formChangeStatus = document.querySelector("#form-change-status")
  const path = formChangeStatus.getAttribute("data-path")




  buttonChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")

      let statusChange = statusCurrent == "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      formChangeStatus.action = action;

      formChangeStatus.submit();
    })
  })
}
//show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = document.querySelector("[close-alert]")

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, 3000);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  })
}
// end show alert