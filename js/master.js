let logo = document.querySelector(".logo img"),
  aboutUsImg = document.querySelector(".about-us .image img");

let isRandBackground = true,
  backgroundInterval;
// Start check local-storage
// stored color
let storedColor = localStorage.getItem("color-option");
if (storedColor) {
  document.documentElement.style.setProperty("--m-Color", storedColor);
  let colorList = ["#ff5722", "#00bcd4", "#9c27b0", "#fdd835", "#4caf50"];
  for (let i = 1; i <= colorList.length; i++) {
    if (storedColor == colorList[i - 1]) {
      logo.setAttribute("src", `images/signature/signature${i}.png`);
      aboutUsImg.setAttribute("src", `images/about-us/about-us${i}.jpg`);
    }
  }

  document.querySelector(".colors-list .active").classList.remove("active");
  document.querySelectorAll(".colors-list li").forEach((color) => {
    if (color.getAttribute("data-color") == storedColor)
      color.classList.add("active");
  });
}
// stored background
let storedBackground = localStorage.getItem("background-option");
if (storedBackground) {
  if (storedBackground === "true") {
    isRandBackground = true;
    document
      .querySelector(".background-option .active")
      .classList.remove("active");
    document.querySelector(".background-option .yes").classList.add("active");
  } else {
    isRandBackground = false;
    document
      .querySelector(".background-option .active")
      .classList.remove("active");
    document.querySelector(".background-option .no").classList.add("active");
  }
}
// stored bullet
let storedBullet = localStorage.getItem("bullet-option");
let bulletContainer = document.querySelector(".nav-bullets");
if (storedBullet) {
  if (storedBullet === "true") {
    bulletContainer.classList.remove("diabled");
    document
      .querySelector(".bullets-option .active")
      .classList.remove("active");
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletContainer.classList.add("diabled");
    document
      .querySelector(".bullets-option .active")
      .classList.remove("active");
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
// End check local-storage

// Start scroller
let scroller = document.querySelector(".scroller");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener("scroll", () => {
  scroller.style.width = `${(window.scrollY / height) * 100}%`;
  (window.scrollY / height) * 100 >= 99.9
    ? (scroller.style.opacity = "1")
    : (scroller.style.opacity = "0.5");
});
// End scroller

// Start Setting Box
let gearBtn = document.querySelector(".gear-btn");
gearBtn.onclick = function () {
  this.classList.toggle("opened");
  this.parentElement.classList.toggle("opened");
  if (this.classList.contains("opened")) {
    this.children[0].style.animationDuration = "3.5s";
  } else {
    this.children[0].style.animationDuration = "15s";
  }
};
// Start-color
let colors = document.querySelectorAll(".colors-list li");
colors.forEach((color) => {
  color.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--m-Color",
      e.target.dataset.color
    );
    colorPosition = Array.from(colors).indexOf(e.target) + 1;
    logo.setAttribute("src", `images/signature/signature${colorPosition}.png`);
    aboutUsImg.setAttribute(
      "src",
      `images/about-us/about-us${colorPosition}.jpg`
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    handleActivation(colors, e);
  });
});
// End-color
// Start-background
let randBgdBtns = document.querySelectorAll(
  ".option-box .background-option span"
);
randBgdBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleActivation(randBgdBtns, e);
    // check the btn clicked
    if (e.target.dataset.background === "yes") {
      isRandBackground = true;
      randomizeImgs();
      localStorage.setItem("background-option", true);
    } else {
      isRandBackground = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
// End-background
// start-bullets
let bulletBtns = document.querySelectorAll(".option-box .bullets-option span");
bulletBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleActivation(bulletBtns, e);
    // check the btn clicked
    if (e.target.dataset.bullet === "enable") {
      bulletContainer.classList.remove("diabled");
      localStorage.setItem("bullet-option", true);
    } else {
      bulletContainer.classList.add("diabled");
      localStorage.setItem("bullet-option", false);
    }
  });
});
// end-bullets
// reset-btn
document.querySelector(".reset-btn").onclick = () => {
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullet-option");
  window.location.reload();
};
// End Setting Box

// Start Landing Page
let landingPage = document.querySelector(".landing-page");
let imgsArray = new Array();
for (let i = 1; i <= 4; i++) imgsArray.push(`image${i}.jpg`);

function randomizeImgs() {
  if (isRandBackground) {
    backgroundInterval = setInterval(() => {
      randIndex = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = `url(images/${imgsArray[randIndex]})`;
    }, 12000);
  }
}
// toggle menu
let toggleBtn = document.querySelector(".toggle-btn"),
  linksContainer = document.querySelector(".links-container .links");

toggleBtn.addEventListener("click", function(e) {
  e.stopPropagation();
  this.classList.toggle("clicked");
  linksContainer.classList.toggle("opened");
});
linksContainer.addEventListener("click", (e) => { 
  e.stopPropagation();
})
document.addEventListener("click", function (e) {
  if (toggleBtn.classList.contains("clicked")) {
    if (e.target !== toggleBtn && e.target !== linksContainer) {
      toggleBtn.classList.toggle("clicked");
      linksContainer.classList.toggle("opened");
    }
    // console.log("this is not the btn")
  }
});

// End Landing Page

// Start Skills-section
let skillsSection = document.querySelector(".skills"),
  prgSpans = document.querySelectorAll(".skill-prg span");
window.addEventListener("scroll", () => {
  if (
    window.scrollY >= skillsSection.offsetTop - 300 &&
    window.scrollY <= skillsSection.offsetTop + 320
  ) {
    prgSpans.forEach((span) => (span.style.width = span.dataset.prg));
  } else {
    prgSpans.forEach((span) => (span.style.width = 0));
  }
});
// End Skills-section

// Start gallery-section
let galleryImgs = document.querySelectorAll(".gallery img");
galleryImgs.forEach((img) => {
  img.addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.className = "gallery-overlay";
    document.body.appendChild(overlay);

    let popup = document.createElement("div");
    popup.className = "gallery-popup";

    let popupImg = document.createElement("img");
    popupImg.src = img.src;

    popup.appendChild(popupImg);

    if (img.alt) {
      let imgTitle = document.createElement("h3");
      imgTitle.appendChild(document.createTextNode(img.alt));
      popup.prepend(imgTitle);
    }

    let closeBtn = document.createElement("span");
    closeBtn.appendChild(document.createTextNode("X"));
    closeBtn.className = "close-btn";
    popup.appendChild(closeBtn);

    overlay.appendChild(popup);
  });
});
document.addEventListener("click", function (e) {
  if (e.target.className === "close-btn") {
    document.querySelector(".gallery-overlay").remove();
  }
});
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && document.querySelector(".gallery-overlay"))
    document.querySelector(".gallery-overlay").remove();
});
// End gallery-section

// start Arrow to-the-top, click-to-the-section
let links = document.querySelectorAll(".landing-page li a"),
  bullets = document.querySelectorAll(".nav-bullets .bullet"),
  upBtn = document.querySelector(".up");

window.addEventListener("scroll", function () {
  this.scrollY >= 500
    ? bulletContainer.classList.add("show")
    : bulletContainer.classList.remove("show");
  this.scrollY >= 1000
    ? upBtn.classList.add("show")
    : upBtn.classList.remove("show");
});
showingSection(links);
showingSection(bullets);

upBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
function showingSection(elements) {
  elements.forEach((element) => {
    element.onclick = (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };
  });
}
// end Arrow to-the-top, click-to-the-section

function handleActivation(elements, e) {
  elements.forEach((element) => element.classList.remove("active"));
  e.target.classList.add("active");
}
