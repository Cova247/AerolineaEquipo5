let formSug = document.getElementById('formSug')
console.log(formSug);

formSug.addEventListener('submit', async e => {
    e.preventDefault();
    
    let inputSug = document.getElementById('inputSugerencia')
    let sug = {
        "sugerencia":inputSug.value
    }

    let subidaSug = await fetch('https://us-east-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/ssugerencias-jexnb/service/sugerencia/incoming_webhook/api', {
        method: 'POST',
        body: JSON.stringify(sug),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    let resp = await subidaSug.json()   
    console.log(resp);
    window.location.href = '../index.html'

})