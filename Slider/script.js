// ARRAY OF OBJECTS
const slides = [
    { img: "https://i.pinimg.com/564x/04/f9/0a/04f90ac51aa340f48ef959e097afa11d.jpg", caption: "Beautiful Sunset" },
    { img: "https://i.pinimg.com/564x/a4/69/9d/a4699d3cd4b3169aa8dde72b574f9286.jpg", caption: "Mountain View" },
    { img: "https://i.pinimg.com/564x/d1/74/aa/d174aaacce8e826a3cdd1586a3baa4cf.jpg", caption: "Forest Path" }
];

let currentIndex = 0;
let intervalId = null;

const slideImage = document.getElementById("slideImage");
const caption = document.getElementById("caption");
const counter = document.getElementById("counter");

function showSlide(index) {
    if (index < 0) {
        console.log("Message: This is the first slide.");
        alert("This is the first slide.");
        return;
    }
    if (index >= slides.length) {
        console.log("Message: This is the last slide.");
        alert("This is the last slide.");
        return;
    }

    currentIndex = index;
    slideImage.src = slides[currentIndex].img;
    caption.textContent = slides[currentIndex].caption;
    counter.textContent = `Slide ${currentIndex + 1} of ${slides.length}`;

    console.log(`Slide ${currentIndex + 1}: ${slides[currentIndex].caption}`);
}

document.getElementById("next").addEventListener("click", () => {
    showSlide(currentIndex + 1);
});

document.getElementById("prev").addEventListener("click", () => {
    showSlide(currentIndex - 1);
});

// ADD SLIDE
document.getElementById("addBtn").addEventListener("click", () => {
    const newImg = document.getElementById("newImg").value;
    const newCaption = document.getElementById("newCaption").value;

    if (newImg === "" || newCaption === "") {
        alert("Please fill both fields");
        return;
    }

    slides.push({ img: newImg, caption: newCaption });
    console.log("New slide added:", newImg, newCaption);

    document.getElementById("newImg").value = "";
    document.getElementById("newCaption").value = "";

    showSlide(slides.length - 1);
});

// AUTO PLAY
document.getElementById("play").addEventListener("click", () => {
    if (intervalId) return;

    intervalId = setInterval(() => {
        if (currentIndex < slides.length - 1) {
            showSlide(currentIndex + 1);
        } else {
            currentIndex = -1;
        }
    }, 3000);

    console.log("Auto-play started");
});

document.getElementById("pause").addEventListener("click", () => {
    clearInterval(intervalId);
    intervalId = null;
    console.log("Auto-play paused");
});

// Start with first slide
showSlide(0);
