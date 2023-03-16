
let hotButton = document.getElementById('hot-button');
let olContainer = document.getElementById('ol-container');
let container2 = document.querySelector('.container2');
let closeBtn = document.getElementById('close-button');
let refreshBtn = document.getElementById('refresh-button');
liElements = olContainer.getElementsByTagName('li');

hotButton.addEventListener('click', function () {

    container2.style.display = 'block';
    olContainer.style.display = 'block';
    fetch('http://localhost:3008/hotlist')
        .then(response => response.json())
        .then(data =>
        {
            for (let i = 0; i < data.length && i < liElements.length; i++)
            {
                const question = data[i].question;
                const accessCount = data[i].access_count;
                liElements[i].textContent = `${i + 1}. ${question} (${accessCount})`;
            }
        })
        .catch(error => console.error(error));
});
closeBtn.addEventListener('click', function () {
    container2.style.display = 'none';
    olContainer2.style.display = 'none';
});
refreshBtn.addEventListener('click', function ()
{
    fetch('http://localhost:3008/hotlist')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length && i < liElements.length; i++) {
                const question = data[i].question;
                const accessCount = data[i].access_count;
                liElements[i].textContent = `${i + 1}. ${question} (${accessCount})`;
            }
        })
        .catch(error => console.error(error));
});