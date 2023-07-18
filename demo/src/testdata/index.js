import testdata from './testdata'
import companies from './companies'
import { firstNames, lastNames } from './usernames'

// Returns a random integer between `min` and `max` (inclusive)
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min)) + min
}

function randomElement(array) {
  return array[randomNumber(0, array.length - 1)]
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function generatePeople(n) {
  return Array(n)
    .fill(0)
    .map(() => {
      const firstName = capitalize(randomElement(firstNames))
      const lastName = capitalize(randomElement(lastNames))

      return `${firstName} ${lastName}`
    })
}

const people = generatePeople(2137)

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  companies,
  people,
  ...testdata,
}
