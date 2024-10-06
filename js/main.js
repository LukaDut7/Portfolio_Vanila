window.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "block";
});

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  const content = document.querySelector(".content");

  setTimeout(function () {
    preloader.classList.add("fade-out");

    setTimeout(function () {
      preloader.style.display = "none";
      content.classList.add("show");
    }, 1000);
  }, 3000);

  const header = document.querySelector(".top-area");
  header.style.display = "none";
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop < lastScrollTop) {
      header.classList.remove("show");
    } else {
      header.classList.add("show");
      header.style.display = "block";
    }

    lastScrollTop = scrollTop;
  });
});

jQuery(document).ready(function ($) {
  const poemSentences = [
    "In the garden of {plant}, the {animal} dances free.",
    "Beneath the {plant}'s shade, the {animal} finds its peace.",
    "The {animal} sings softly, wrapped in {plant}'s embrace.",
    "On the petals of the {plant}, the {animal}'s footsteps are light.",
    "Through the fields of {plant}, the {animal} roams under the stars.",
    "As the {plant} blooms, the {animal} whispers secrets to the wind.",
    "The {animal} rests gently on the {plant}'s vibrant green.",
    "Among the {plant} leaves, the {animal} hides with grace.",
    "The {plant} sways, and the {animal} dances in the moonlight.",
    "Like a song of {plant}, the {animal} flows through the air.",
  ];

  $("#query-form").on("submit", function (event) {
    event.preventDefault();

    let plantName = $("#plant").val();
    let animalName = $("#animal").val();

    if (plantName && animalName) {
      const randomPoem = generateRandomPoem(
        plantName,
        animalName,
        poemSentences
      );

      $("#poetry-title").text("Your Poem:");
      $("#poetry-body").html(randomPoem);
      $("#form-message").text("Thank you for submitting!");
    } else {
      $("#form-message").text("Please enter both a plant and an animal.");
    }
  });

  $("#resetButton").on("click", function () {
    resetResults();
  });

  function resetResults() {
    $("#poetry-title").text("");
    $("#poetry-body").html("");
    $("#form-message").text("");
  }

  function generateRandomPoem(plantName, animalName, sentences) {
    const randomSentences = [];
    const maxSentences = 6;

    while (randomSentences.length < maxSentences) {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      const randomSentence = sentences[randomIndex]
        .replace("{plant}", plantName)
        .replace("{animal}", animalName);

      if (!randomSentences.includes(randomSentence)) {
        randomSentences.push(randomSentence);
      }
    }

    return randomSentences.map((sentence) => `<p>${sentence}</p>`).join("");
  }

  $(".progress-bar").appear(function () {
    const progressBar = $(this);
    const targetValue = parseInt(progressBar.attr("aria-valuenow"));
    const progressText = $(this).closest(".single-progress-txt").find("h3");

    progressBar.css("width", targetValue + "%");

    let currentValue = 0;
    const intervalTime = 1500 / targetValue;
    const counter = setInterval(function () {
      if (currentValue < targetValue) {
        currentValue++;
        progressText.text(currentValue + "%");
      } else {
        clearInterval(counter);
      }
    }, intervalTime);
  });
});
