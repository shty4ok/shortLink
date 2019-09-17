window.onload = function () {
    document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();

        const value = document.forms['formName'].value;
/*        let longLink = formName.elements['link'].value;
        let linkRes = document.getElementById('linkRes'); */

        let request = new XMLHttpRequest();
        request.open('POST', '/api/link', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener('load', () => {
            linkRes.value = 'http://localhost:3000/url/' + JSON.parse(request.response);
        });
        request.send(JSON.stringify(value));
    });
};
