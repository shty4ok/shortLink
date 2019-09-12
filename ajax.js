document.getElementById('submit').addEventListener('click', (e) =>{
    let formName = document.forms['formName'];
    let longLink = formName.elements['link'].value;
    let request = new XMLHttpRequest();

    request.open('POST', '/', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', () => {
        console.log(request.response);
    });
    console.log('Send: ' +longLink);
    request.send(longLink);
});
