const iKasync = async () => {
    const iKresponse = await fetch('https://jsonplaceholder.typicode.com/users');
    const iKjson = await iKresponse.json();
    
    console.log('iK from iKasync.js file')
    console.log(iKjson)
} /*END iKasync*/

export default iKasync;