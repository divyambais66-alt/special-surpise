// PERSONAL SETTINGS — edit these two values.
const BIRTHDAY = "2026-11-22T00:00:00"; // YYYY-MM-DDTHH:MM:SS
const PASSWORD = "ANJU22"; // Change this to your secret password

// Password gate: the site asks once per browser session.
const entered = prompt("A little surprise is waiting 💗 Enter the secret password:");
if (entered !== PASSWORD) {
  document.body.innerHTML = '<main style="min-height:100vh;display:grid;place-items:center;text-align:center;padding:25px;font-family:sans-serif;background:#fff0f6;color:#8f2855"><div><h1>Oops! 💌</h1><p>That is not the secret password. Ask the creator for your special code.</p></div></main>';
  throw new Error("Incorrect password");
}

// Countdown
const countdown = document.getElementById("countdown");
function updateCountdown(){
  const now = new Date();
  const target = new Date(BIRTHDAY);
  let diff = target - now;
  if (diff <= 0) {
    countdown.innerHTML = '<div class="time-box"><strong>🎂</strong><small>HAPPY BIRTHDAY!</small></div>';
    return;
  }
  const days = Math.floor(diff/86400000); diff %= 86400000;
  const hours = Math.floor(diff/3600000); diff %= 3600000;
  const mins = Math.floor(diff/60000); diff %= 60000;
  const secs = Math.floor(diff/1000);
  countdown.innerHTML = [["DAYS",days],["HOURS",hours],["MINUTES",mins],["SECONDS",secs]]
    .map(([label,value])=>`<div class="time-box"><strong>${value}</strong><small>${label}</small></div>`).join("");
}
updateCountdown(); setInterval(updateCountdown,1000);

// Add up to 50 images: photos/photo1.jpg ... photos/photo50.jpg
const gallery = document.getElementById("gallery");
for(let i=1;i<=50;i++){
  const card=document.createElement("div"); card.className="photo-card";
  const img=document.createElement("img"); img.src=`photos/photo${i}.jpg`; img.alt=`Memory ${i}`;
  img.onerror=()=>{card.innerHTML=`<div class="missing">Add photo${i}.jpg<br>to the photos folder</div>`;};
  img.onload=()=>{card.innerHTML="";card.appendChild(img);};
  card.appendChild(img); gallery.appendChild(card);
}
const lightbox=document.getElementById("lightbox"), lightboxImg=document.getElementById("lightboxImg");
gallery.addEventListener("click",e=>{const img=e.target.closest("img");if(img){lightboxImg.src=img.src;lightbox.classList.add("show");}});
document.getElementById("closeLightbox").onclick=()=>lightbox.classList.remove("show");
lightbox.addEventListener("click",e=>{if(e.target===lightbox)lightbox.classList.remove("show");});

// Clickable letters
const letterModal=document.getElementById("letterModal");
document.querySelectorAll(".letter").forEach(btn=>btn.addEventListener("click",()=>{
  document.getElementById("letterText").textContent=btn.dataset.letter;
  letterModal.classList.add("show");
}));
document.getElementById("closeLetter").onclick=()=>letterModal.classList.remove("show");
letterModal.addEventListener("click",e=>{if(e.target===letterModal)letterModal.classList.remove("show");});

// Background music (browsers require a user tap before audio can play)
const music=document.getElementById("backgroundMusic"), musicBtn=document.getElementById("musicBtn");
musicBtn.addEventListener("click",async()=>{
  if(music.paused){try{await music.play();musicBtn.textContent="❚❚ Pause music";}catch(e){alert("Add your song as music/song.mp3 first.");}}
  else{music.pause();musicBtn.textContent="▶ Play music";}
});

// Floating hearts
const hearts=document.querySelector(".hearts");
function makeHeart(){
  const heart=document.createElement("span");heart.className="heart";heart.textContent=["💗","💕","♡","💖"][Math.floor(Math.random()*4)];
  heart.style.left=Math.random()*100+"%";heart.style.fontSize=(14+Math.random()*22)+"px";
  heart.style.animationDuration=(6+Math.random()*6)+"s";hearts.appendChild(heart);
  setTimeout(()=>heart.remove(),12000);
}
setInterval(makeHeart,650);

// Birthday confetti / sparkle burst
document.getElementById("wishBtn").addEventListener("click",()=>{
  document.getElementById("wishMessage").textContent="May all your beautiful wishes come true, Anju! 💗🎂";
  for(let i=0;i<90;i++){
    const bit=document.createElement("span");bit.textContent=["✨","🎉","💗","🌸","💕"][i%5];
    bit.style.cssText=`position:fixed;z-index:20;left:${Math.random()*100}vw;top:-30px;font-size:${14+Math.random()*20}px;pointer-events:none;transition:transform ${2+Math.random()*2}s linear,opacity 3s`;
    document.body.appendChild(bit);
    requestAnimationFrame(()=>{bit.style.transform=`translate(${(Math.random()-.5)*250}px,${100+Math.random()*100}vh) rotate(${Math.random()*720}deg)`;bit.style.opacity="0";});
    setTimeout(()=>bit.remove(),4500);
  }
});
