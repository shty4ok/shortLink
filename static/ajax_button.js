window.onload = function () {
    document.getElementById('submitBtn').addEventListener('click', (e) => {
        e.preventDefault();

        let submitBtn = document.getElementById('submitBtn').value;
        console.log(submitBtn);

        let request = new XMLHttpRequest();
        request.open('POST', '/longLink/', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.addEventListener('load', () => {
            let result = document.getElementById('result');
            //Example: JSON.parse('"foo"');  // "foo"
            result.value = request.response;
        });
        //Example: JSON.stringify({ x: 5, y: 6 }); //'{"x":5,"y":6}' or '{"y":6,"x":5}'
        request.send({submitBtn: submitBtn});
    });
};
