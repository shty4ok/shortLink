window.onload = function () {
    document.getElementById('submit').addEventListener('click', (e) => {
        e.preventDefault();

        const formName = document.forms['formName'];
        let longLink = formName.elements['link'].value;
        let with_button_checkbox = formName.elements['with_button_checkbox'].value;
        console.log(with_button_checkbox);


        let request = new XMLHttpRequest();
        request.open('POST', '/api/link', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener('load', () => {
            let linkRes = document.getElementById('linkRes');
            //Example: JSON.parse('"foo"');  // "foo"
            linkRes.value = 'http://localhost:3000/' + JSON.parse(request.response);
        });
        //Example: JSON.stringify({ x: 5, y: 6 }); //'{"x":5,"y":6}' or '{"y":6,"x":5}'
        request.send(JSON.stringify({ link: longLink, checkbox: with_button_checkbox}));
    });
};
