import { ulid } from "ulid"

function ip2long(dot: string) {
  const d = dot.split(".")
  return ((+d[0]! * 256 + +d[1]!) * 256 + +d[2]!) * 256 + +d[3]!
}

function long2ip(num: number) {
  let d = `${num % 256}`
  for (let i = 3; i > 0; i--) {
    num = Math.floor(num / 256)
    d = (num % 256) + "." + d
  }
  return d
}

function getRandomArrayItem(arr: any[]) {
  return arr[(arr.length * Math.random()) | 0]
}

function genRandomId(length: number = 8) {
  const c = "abcdefghijklmnopqrstuvwxyz"
  const s = [...Array(1)].map(_ => c[~~(Math.random() * c.length)]).join("")
  const id = Array.from(
    { length: length },
    () => Math.random().toString(36)[2],
  ).join("")

  return `${s}${id}`
}

function sleep(milliseconds) {
  const date = Date.now()
  let currentDate = null as any
  do {
    currentDate = Date.now()
  } while (currentDate - date < milliseconds)
}

function md5(str) {
  const md5 = require("crypto-js/md5")

  return md5(str).toString()
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

function formatTime(seconds) {
  const format = val => `0${Math.floor(val)}`.slice(-2)
  const hours = seconds / 3600
  const minutes = (seconds % 3600) / 60

  return [hours, minutes, seconds % 60].map(format).join(":")
}

function ucWords(myStr: string) {
  return myStr
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ")
}

function canUseDOM() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  )
}

function imgSizeFit(src: string, maxWidth: number, maxHeight: number) {
  const image = new Image()
  let width = 0
  let height = 0
  image.src = src
  /* @ts-ignore */
  var x = (image.onload = (function () {
    var ratio = Math.min(
      1,
      maxWidth / image.naturalWidth,
      maxHeight / image.naturalHeight,
    )
    width = image.naturalWidth * ratio
    height = image.naturalHeight * ratio

    return { width, height }
  })())

  return x
}

const getImageOrientation = (width: number, height: number) => {
  let orientation: "landscape" | "portrait" | "even" | undefined = undefined
  if (width > height) {
    orientation = "landscape"
  } else if (width < height) {
    orientation = "portrait"
  } else {
    orientation = "even"
  }

  return orientation
}

const roundAccurately = (number: number, decimalPlaces: number) =>
  Number(
    Math.round((number + `e${decimalPlaces}`) as any) + `e-${decimalPlaces}`,
  )

const isEmptyObj = passedObj =>
  !(
    passedObj &&
    passedObj === Object(passedObj) &&
    Object.keys(passedObj).length !== 0
  )

const getFilenameFromURL = path => {
  path = path.substring(path.lastIndexOf("/") + 1)
  return (path.match(/[^.]+(\.[^?#]+)?/) || [])[0]
}

function hashCode(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  const hashCode = 4294967296 * (2097151 & h2) + (h1 >>> 0)
  return md5(`${hashCode}`)
}

const nearEditor = (elem, id) => {
  var parents = [] as any[]

  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.id === id) {
      return true
    } else if (Array.from(elem.classList).includes(id)) {
      return true
    }

    parents.push(elem)
  }

  return false
}

const allEqual = arr => arr.every(val => val === arr[0])

const genUlid = () => {
  return ulid()
}

export {
  canUseDOM,
  genRandomId,
  isEmptyObj,
  ip2long,
  long2ip,
  sleep,
  md5,
  formatBytes,
  formatTime,
  ucWords,
  roundAccurately,
  getFilenameFromURL,
  getImageOrientation,
  getRandomArrayItem,
  imgSizeFit,
  hashCode,
  nearEditor,
  allEqual,
  genUlid,
}
