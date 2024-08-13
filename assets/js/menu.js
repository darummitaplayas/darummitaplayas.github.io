function toggleMenu() {
    const menuList = document.getElementById('menuList');
    const menuItems = menuList.querySelectorAll('li');
    if (menuList.style.display === 'none' || menuList.style.display === '') {
        menuList.style.display = 'block';
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
            }, index * 300);
        });
    } else {
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
            }, index * 300);
        });
        setTimeout(() => {
            menuList.style.display = 'none';
        }, menuItems.length * 300);
    }
}

function redirectTo(url) {
    window.location.href = url;
}
