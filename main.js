document.addEventListener('DOMContentLoaded', () => {
  const EMPTY_HEART = '♡';
  const FULL_HEART = '♥';

  const likeButtons = document.querySelectorAll('.like');

  likeButtons.forEach(like => {
      like.addEventListener('click', (event) => {
          const likeGlyph = event.currentTarget.querySelector('.like-glyph');
          if (!likeGlyph) return;

          mimicServerCall()
              .then(() => {
                  if (likeGlyph.textContent === EMPTY_HEART) {
                      likeGlyph.textContent = FULL_HEART;
                      likeGlyph.classList.add('activated-heart')
                  } else {
                      likeGlyph.textContent = EMPTY_HEART;
                      likeGlyph.classList.remove('activated-heart')
                  }
              })
              .catch((error) => {
                  const errorModal = document.getElementById('modal');
                  const errorMessage = document.getElementById('modal-message');
                  if (!errorModal || !errorMessage) return;
                  errorMessage.textContent = error;
                  errorModal.classList.remove('hidden');
                  setTimeout(() => {
                      errorModal.classList.add('hidden');
                  }, 3000);
              });
      });
  });
});


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

