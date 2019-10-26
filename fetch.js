async function willfetch()
{
const response = await fetch('https://overpass-turbo.eu/');
const myJson = await response.json();
console.log(JSON.stringify(myJson));
}
willfetch();