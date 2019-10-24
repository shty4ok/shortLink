window.onload = function() {
  document.getElementById('submit').addEventListener('click', (e) => {
    e.preventDefault();

    const formName = document.forms['formName'];
    const longLink = formName.elements['link'].value;
    const withButtonCheckbox = formName
        .elements['with_button_checkbox'].checked;

    if (longLink !== '') {
      const request = new XMLHttpRequest();
      request.open('POST', '/api/link', true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.addEventListener('load', () => {
        const linkRes = document.getElementById('linkRes');
        // ^[a-z]+\:\/\/[a-z]+(([a-z]+)?(\.)?([a-z]+)?)+(\S+[a-z]+)?
        if (request.status === 400) {
          linkRes.value = 'Введите ссылку';
        } else {
          const res = JSON.parse(request.response);
          // Example: JSON.parse('"foo"');  // "foo"
          formName.elements['link'].value = '';
          linkRes.value = 'http://localhost:3000/res/' + res;
        }
      });

      // Example: JSON.stringify({ x: 5, y: 6 });
      // '{"x":5,"y":6}' or '{"y":6,"x":5}'
      request.send(JSON.stringify({
        link: longLink,
        checkbox: withButtonCheckbox,
      }));
    }
  });
};
