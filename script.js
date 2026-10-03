// --------------------
// Custom gift settings
// Change these values before sharing the website.
// --------------------
const PIN="0204";
const BIRTHDAY_NAME="MINI Elephant 🐘✨";
const WHATSAPP_NUMBER="918764178270";
const letterText=`Happy Birthday to my ex-best friend but forever special person. 🐘

We may not be close anymore, but you still matter to me. Thank you for all the memories, all the laughs, and all the times you were there.

To my Mini Elephant — you were always the cutest, strongest, and most unforgettable part of my life. I still remember your little tantrums, your big heart, and how you made even boring days special.

I know things changed, but some people leave a mark that never fades, and you are one of them.

Wishing you a year full of happiness, success, good health, and all the love you deserve. Keep smiling, keep shining, keep being you.

Enjoy your day, Mini Elephant! 🐘💛

Have the best birthday ever!`;

// --------------------
// Section navigation
// Controls which page/section is shown inside the main card.
// --------------------
function go(id){
 document.querySelectorAll('#app>div').forEach(x=>x.classList.add('hidden'));
 document.getElementById(id).classList.remove('hidden');
 if(id==='letter') typeLetter();
 if(id==='birthday') document.getElementById('birthdayName').textContent=BIRTHDAY_NAME;
 window.scrollTo({top:0,behavior:'smooth'});
}
// --------------------
// PIN lock logic
// The real unlock code is kept in the PIN variable above.
// --------------------
const pinFields = ['p1','p2','p3','p4'];

function unlock(){
 const value = pinFields.map((id) => document.getElementById(id).value).join('');
 if(value === PIN){
   playMusic();
   go('welcome');
 } else {
   document.getElementById('err').textContent = 'That PIN is not quite right. Try again.';
 }
}

pinFields.forEach((id, index) => {
 const input = document.getElementById(id);

 input.addEventListener('keydown', (event) => {
   if (event.key === 'Backspace' || event.key === 'Tab' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') return;
   if (!/^\d$/.test(event.key)) event.preventDefault();
 });

 input.addEventListener('input', (event) => {
   const value = event.target.value.replace(/\D/g, '').slice(0, 1);
   event.target.value = value;
   document.getElementById('err').textContent = '';

   if (value && index < pinFields.length - 1) {
     document.getElementById(pinFields[index + 1]).focus();
   }
 });
});
// --------------------
// Lucky box / surprise game
// Wrong picks show a joke message; the correct box unlocks the next step.
// --------------------
const wrongChoiceMessages = [
  'Oops! Even the box needs a little more luck. Try again 😄',
  'That box was too shy to hide the surprise. Try another one 😅',
  'Not this one — the surprise clearly has better taste. Try again 🎁',
  'Nice try, but this box is just practicing for the big reveal. Try again 😌',
  'That box is dramatic and refuses to share the surprise. Try another one 🤭',
  'Wrong box! The surprise is playing hide-and-seek again. Try again 💫'
];

function choose(n){
 if(n===2){
  document.getElementById('gameMsg').textContent = 'You found the surprise! ✨';
  document.getElementById('gameNext').classList.remove('hidden');
  return;
 }

 const randomJoke = wrongChoiceMessages[Math.floor(Math.random() * wrongChoiceMessages.length)];
 document.getElementById('gameMsg').textContent = randomJoke;
 document.getElementById('gameNext').classList.add('hidden');
}
// --------------------
// Letter typing effect
// This writes the birthday note character by character on the letter page.
// --------------------
let typed=false;
function typeLetter(){
 if(typed)return;typed=true;let i=0;const el=document.getElementById('typing');
 const timer=setInterval(()=>{el.textContent=letterText.slice(0,++i);if(i>=letterText.length)clearInterval(timer)},28);
}
// --------------------
// Music player controls
// Used for the song button in the letter section.
// --------------------
function playMusic(){
 const audio=document.getElementById('song'),button=document.getElementById('musicBtn');
 audio.play().then(()=>button.textContent='Pause song').catch(()=>{});
}
function toggleMusic(){
 const a=document.getElementById('song'),b=document.getElementById('musicBtn');
 if(a.paused)playMusic();else{a.pause();b.textContent='Play song'}
}
// --------------------
// Cake / birthday interaction
// Lets the user make a wish and cut the cake.
// --------------------
function makeWish(){
 document.getElementById('flame').classList.add('blown-out');
 document.getElementById('wishButton').classList.add('hidden');
 document.getElementById('cutButton').classList.remove('hidden');
 document.getElementById('cakeMsg').textContent='Your wish is on its way! Now cut the cake. ✨';
}
function cutCake(){
 document.getElementById('cakeScene').classList.add('cut');
 document.getElementById('cakeMsg').textContent='A sweet moment made just for you!';
 setTimeout(()=>go('birthday'),500);
}
// --------------------
// Photo gallery modal
// Clicking a memory photo opens it in a larger view.
// --------------------
let currentPhotoIndex = 0;
function changePhoto(direction){
 const photos = [...document.querySelectorAll('#memories .memory')];
 if(!photos.length)return;
 currentPhotoIndex = (currentPhotoIndex + direction + photos.length) % photos.length;
 photos.forEach((photo, index) => photo.classList.toggle('is-current', index === currentPhotoIndex));
 document.getElementById('photoCount').textContent = `${currentPhotoIndex + 1} / ${photos.length}`;
}

function showImageModal(img){
 const modal=document.getElementById('imageModal');
 const modalImage=document.getElementById('modalImage');
 modalImage.src=img.src;
 modalImage.alt=img.alt || 'Full size memory photo';
 modal.classList.remove('hidden');
}
function hideImageModal(){
 document.getElementById('imageModal').classList.add('hidden');
}

document.querySelectorAll('.photo').forEach((img)=>{
 img.addEventListener('click',()=>showImageModal(img));
});

document.getElementById('imageModal').addEventListener('click', (event)=>{
 if(event.target === event.currentTarget || event.target.classList.contains('image-close')) {
  hideImageModal();
 }
});

document.addEventListener('keydown', (event)=>{
 if(event.key === 'Escape') hideImageModal();
});

// --------------------
// WhatsApp final message
// Sends the thank-you message to the number configured above.
// --------------------
function sendWhatsApp(){
 // WhatsApp requires the number in international format without symbols.
 const message=document.getElementById('thankYouMessage').value.trim();
 const error=document.getElementById('messageError');
 if(!message){error.textContent='Please write a message first.';return}
 if(WHATSAPP_NUMBER==='REPLACE_WITH_INTERNATIONAL_NUMBER'){
  error.textContent='Add the recipient number in script.js first.';
  return;
 }
 const whatsappUrl=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
 window.open(whatsappUrl,'_blank','noopener');
}
