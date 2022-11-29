window.onload = function(){
    // hamburger menu w/ overlay logic
    const sideNav = document.querySelector(".sideNav");
    const overlay = document.querySelector(".overlay");
    const ham = document.querySelector(".ham");
    const menuX = document.querySelector(".menuX");
    const menuItems = document.querySelectorAll(".menuLink");

    menuItems.forEach(menuItem => {
        menuItem.addEventListener("click", toggleHamburger);
    });

    ham.addEventListener("click", toggleHamburger);
    menuX.addEventListener("click", toggleHamburger);
    overlay.addEventListener("click", toggleHamburger);

    function toggleHamburger() {
        overlay.classList.toggle("showOverlay");
        sideNav.classList.toggle("showNav");
    }

    // modal images logic

    // create references to the modal...
    var modal = document.getElementById('myModal');
    // to all images -- note I'm using a class!
    var images = document.getElementsByClassName('visualsClass');
    // the image in the modal
    var modalImg = document.getElementById("img01");

    // Go through all of the images with our custom class
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        // and attach our click listener for this image.
        img.onclick = function(evt) {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    }

    var span = document.getElementsByClassName("close")[0];

    span.onclick = function() {
        modal.style.display = "none";
    }
}