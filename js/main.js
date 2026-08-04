document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
    // On mobile, tapping a top-level link with a dropdown opens the submenu first
    document.querySelectorAll(".main-nav > ul > li").forEach(function (li) {
      var link = li.querySelector(":scope > a");
      var dropdown = li.querySelector(".dropdown");
      if (dropdown && link) {
        link.addEventListener("click", function (e) {
          if (window.innerWidth <= 760) {
            e.preventDefault();
            li.classList.toggle("open");
          }
        });
      }
    });
  }

  // Hero background slideshow (homepage only)
  var heroSlides = document.querySelectorAll(".hero-slides .hero-slide");
  if (heroSlides.length > 1) {
    var currentSlide = 0;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      setInterval(function () {
        heroSlides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add("active");
      }, 5000);
    }
  }

  // Enquiry form — submits to Google Sheets via Apps Script Web App
  var enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    var ENQUIRY_ENDPOINT = "https://script.google.com/macros/s/AKfycbwpiNZp_hffxRYZ732Wl7Yz6uTrN2_yGhAHy79iuSWeOnWUI6-HSZ-mpGj_zk9uA__H/exec";
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var submitBtn = enquiryForm.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn ? submitBtn.textContent : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Menghantar...";
      }
      fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: new FormData(enquiryForm)
      })
        .then(function () {
          var successBox = document.getElementById("formSuccess");
          if (successBox) {
            successBox.style.display = "block";
            successBox.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          enquiryForm.reset();
        })
        .catch(function () {
          alert("Maaf, berlaku ralat semasa menghantar borang. Sila cuba lagi atau hubungi kami terus melalui telefon/e-mel.");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
          }
        });
    });
  }
});
