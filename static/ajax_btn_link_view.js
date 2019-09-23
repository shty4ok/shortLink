window.onload = function () {
    document.getElementById('btnLongLink').addEventListener('click', (e) => {
        e.preventDefault();

        let request = new XMLHttpRequest();
        request.open('GET', '/api/', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener('load', () => {
            let linkRes = document.getElementById('linkRes');
            //Example: JSON.parse('"foo"');  // "foo"
            linkRes.value = 'http://localhost:3000/' + JSON.parse(request.response);
        });
        //Example: JSON.stringify({ x: 5, y: 6 }); //'{"x":5,"y":6}' or '{"y":6,"x":5}'
        request.send(JSON.stringify({ link: longLink, with_button_checkbox: with_button_checkbox}));
    });
};
