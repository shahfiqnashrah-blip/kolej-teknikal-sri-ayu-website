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

  // Enquiry form (static site placeholder — see note in Hubungi Kami page)
  var enquiryForm = document.getElementById("enquiryForm");
  if (enquiryForm) {
    enquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var successBox = document.getElementById("formSuccess");
      if (successBox) {
        successBox.style.display = "block";
        enquiryForm.reset();
        successBox.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
});
