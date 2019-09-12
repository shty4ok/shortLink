document.getElementById('submit').addEventListener('click', (e) =>{
    e.preventDefault();

    let formName = document.forms['formName'];
    let longLink = formName.elements['link'].value;
    let request = new XMLHttpRequest();
    let linkRes = document.getElementById('linkRes');

    request.open('POST', '/api/link', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', () => {
        linkRes.innerText = JSON.parse(request.response);
    });
    request.send(longLink);
});
