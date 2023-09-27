document.getElementById('back').addEventListener("click", () => {
    let currentPath = window.location.pathname;

    // Извлекаем базовый путь до последнего слеша
    let basePath = currentPath.substr(0, currentPath.lastIndexOf("/"));
    window.location.replace(basePath);
})