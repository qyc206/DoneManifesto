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
}