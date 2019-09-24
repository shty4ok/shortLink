window.onload = function () {
    document.getElementById('submitBtn').addEventListener('click', (e) => {
        e.preventDefault();

        const formLongLink = document.forms['formLongLink'];
        let shortLinkForm = formLongLink.elements['result'].value;

        let request = new XMLHttpRequest();
        request.open('POST', '/longLink', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener('load', () => {
            let result = document.getElementById('result');
            //Example: JSON.parse('"foo"');  // "foo"
            result.value = request.response;
        });
        //Example: JSON.stringify({ x: 5, y: 6 }); //'{"x":5,"y":6}' or '{"y":6,"x":5}'
        request.send(JSON.stringify({submitBtn: shortLinkForm}));
    });
};
