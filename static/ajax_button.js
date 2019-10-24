window.onload = function() {
  document.getElementById('submitBtn').addEventListener('click', (e) => {
    e.preventDefault();

    const formLongLink = document.forms['formLongLink'];
    const shortLinkForm = formLongLink.elements['result'].value;

    const request = new XMLHttpRequest();
    request.open('POST', '/longLink', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.addEventListener('load', () => {
      location = JSON.parse(request.response);
    });
    request.send(JSON.stringify({shortLnk: shortLinkForm}));
  });
};
