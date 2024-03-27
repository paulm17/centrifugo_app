/* eslint-disable */
declare global {
  interface String {
    padZero(length: number): string
    toTitleCase(): string
    capitalize(): string
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

String.prototype.padZero = function (n, width = 3, z = 0) {
  return (String(z).repeat(width) + String(n)).slice(String(n).length)
}

export {}
