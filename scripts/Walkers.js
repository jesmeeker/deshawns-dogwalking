import { getWalkerCities, getWalkers, getCities } from "./database.js"

// document.addEventListener(
//     "click",  // This is the type of event
//     (clickEvent) => {
//         /*
//             The target of a click event is the most specific HTML element
//             that was clicked by the user.
//         */
//         const itemClicked = clickEvent.target

//         /*
//             Only run the rest of the logic if a walker <li> was clicked
//         */
//         if (itemClicked.id.startsWith("walker")) {

//             /*
//                 Extract the primary key from the id attribute of the list
//                 item that you clicked on. Refer back to the code you
//                 wrote for each list item. Note the format of the id
//                 attribute ("walker--2" if you clicked on the second one).

//                 This code splits that string apart into an array, and
//                 captures the "2" and assigns it to be the value of the
//                 `walkerId` variable.

//                 Splitting a string in JavaScript:
//                     https://www.youtube.com/watch?v=u2ZocmM93yU

//                 Destructuring in JavaScript:
//                     https://www.youtube.com/watch?v=UgEaJBz3bjY
//             */
//             const [,walkerId] = itemClicked.id.split("--")

//             /*
//                 Now that you have the primary key of a walker object,
//                 find the whole object by iterating the walkers array.
//             */
//             for (const walker of walkers) {

//                 /*
//                     Compare the primary key of each walker to the one
//                     you have. As soon as you find the right one, display
//                     the window alert message.
//                 */
//                 if (walker.id === parseInt(walkerId)) {
//                     window.alert(`${walker.name} services ${walker.city}`)
//                 }
//             }
//         }
//     }
// )



const walkers = getWalkers()
const walkerCities = getWalkerCities()
const cities = getCities()

console.log(walkers)
console.log(walkerCities)
console.log(cities)
//above is tested and working 


export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML

}
//Tested and working



//define a function that gets all ojbects from the walkerCities array that match the walker.id of the current walker
const matchingWalkerCities = (walker) => {
//define an array to hold output of the function
let matchingCitiesArray = []
//iterate through walkersCities array
for (const walkerCity of walkerCities) {
    
        //use conditional to check if walker.id matches walkercity.walkerId
        if (walkerCity.walkerId === walker.id) {
            //if they match put into array of matching objects
            matchingCitiesArray.push(walkerCity)
        }
    }

    return matchingCitiesArray
 }

let array = matchingWalkerCities(walkers[4])
console.log("ARRAY")
console.log(array)


//define a function with array as parameter
const createCitiesString = (matchingCitiesArray) => {
    //define a variable to hold a string
    let cityNames = []
    //iterates through the returned array of the matchingWalkerCities() function
    for (const matchingCity of matchingCitiesArray) {
        //iterates throught the cities DB
        for (const city of cities) {
        //matches the walkerCities ID to the City ID
            if (city.id === matchingCity.cityId) {
        //if they match it adds the name of the city to the empty string
            cityNames.push(city.name)
    }
        }
    }
return cityNames
}
console.log(array)
let string = createCitiesString(array)
console.log("STRING")
console.log(string)

document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {
       
        const itemClicked = clickEvent.target

        if (itemClicked.id.startsWith("walker")) {

            const [,walkerId] = itemClicked.id.split("--")

            for (const walker of walkers) {
                if (walker.id === parseInt(walkerId)) {
                    const assignments = matchingWalkerCities(walker)
                    const cities = createCitiesString(assignments)
            
                    window.alert(`${walker.name} services ${cities}`)
                }
            }
         }
    }
)