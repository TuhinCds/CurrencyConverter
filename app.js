const ammount = document.getElementById("ammount")
const fromData = document.getElementById("From")
const toData = document.getElementById("To")
const ShowConvertType = document.getElementById("ShowConvertType")
const ConvertBtn = document.getElementById("ConvertBtn")
const ChangeBtn = document.getElementById("ChangeBtn")
const convartedData = document.getElementById("convartedData")
const randomChangeCurrency = document.getElementById("randomChangeCurrency")
const fromIn = document.getElementById("fromIn")
const toIn = document.getElementById("toIn")
const FromCurrency = document.getElementById("FromCurrency")
const CurrencyTo = document.getElementById("CurrencyTo")
const fromDataValueIn = document.getElementById("fromDataValueIn")
const toDataValueIn = document.getElementById("toDataValueIn")




let convertTypes = [
   "AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN",
  "BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL",
  "BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLF","CLP",
  "CNH","CNY","COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP",
  "DZD","EGP","ERN","ETB","EUR","FJD","FKP","FOK","GBP","GEL",
  "GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK",
  "HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP",
  "JMD","JOD","JPY","KES","KGS","KHR","KID","KMF","KRW","KWD",
  "KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL",
  "MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN",
  "MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB",
  "PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB",
  "RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLE","SLL",
  "SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND",
  "TOP","TRY","TTD","TVD","TWD","TZS","UAH","UGX","USD","UYU",
  "UZS","VES","VND","VUV","WST","XAF","XCD","XCG","XDR","XOF",
  "XPF","YER","ZAR","ZMW","ZWG","ZWL"
]


let fromX = ""
let toX = ""
fromIn.placeholder = convertTypes[0]
toIn.placeholder = convertTypes[1]
fromDataValueIn.innerHTML = convertTypes[0]
toDataValueIn.innerHTML = convertTypes[1]
convertTypes.forEach(item => {
   let createOption = `<option value="${item}">${item}</option>`

   fromData.innerHTML += createOption
   toData.innerHTML += createOption
})
   toData.value = convertTypes[12]
   toIn.value = convertTypes[12]
   fromIn.value = convertTypes[0]
   
fromData.addEventListener("change", () => {
   let fromDataV = fromData.value
   let toDataV = toData.value
   fromIn.value = fromDataV

    toIn.value = toDataV
   if (fromDataV === toDataV) {
      for(let i = 0; i < convertTypes.length; i++) {
         toDataV = convertTypes[i]
         toIn.value = convertTypes[i]
         if (toDataV !== fromDataV) {
            toData.value = convertTypes[i]
            return
         }
      }
   }
})

toData.addEventListener("change", () => {
   let fromDataV = fromData.value
   let toDataV = toData.value
   toIn.value = toData.value
   fromIn.placeholder = fromDataV
   if (toDataV === fromDataV) {
      for(let i = 0; i < convertTypes.length; i++) {
         fromDataV = convertTypes[i]
         fromIn.value = convertTypes[i]
         if (fromDataV !== toDataV) {
            fromData.value = convertTypes[i]
            return
         }  
      }
   }
})

function Convert() {
   let ammoutData = Number(ammount.value.trim())
   const fromValue = fromData.value
   const toValue = toData.value

   if (!ammoutData && ammoutData <= 0) {
      alert("Enter ammount first !")
      ammount.focus()
      return
   }

   fromX = fromValue
   toX = toValue

   CurrencyTo.innerHTML = `<i class="fa-solid fa-money-bill-transfer"></i> converting..`
   CurrencyTo.classList.add("lodding")
   fetch(`https://v6.exchangerate-api.com/v6/74a905db1dc48561dcff5dc4/latest/${fromValue}`)
   .then(res => res.json())
   .then(data => {
      CurrencyTo.classList.remove("lodding")
      CurrencyTo.innerHTML = (data.conversion_rates[toValue] * ammoutData).toFixed(2)
})
   .catch(err => {
      
      if ((err + "").includes("NetworkError")) {
         CurrencyTo.innerHTML = `<i class="fa-solid fa-globe"></i>! Check internet`
         CurrencyTo.style.fontWeight = "460"
         CurrencyTo.style.fontSize = ".86rem"
         CurrencyTo.style.padding = "6px 7px"
      }
   })
   
   FromCurrency.innerHTML = ammoutData
   fromIn.value = fromValue
   toIn.value = toValue
}
ConvertBtn.addEventListener("click", () => {
   Convert()
})
ammount.addEventListener("input", () => {
   if (isNaN(ammount.value)) {
      ammount.value = 0
   } else {
      ammount.value = ammount.value
   }
})

let i = 0
ChangeBtn.addEventListener('click', () => {
   RandomChangeCurrencyData()
})

let toCount = 0
let fromCount = 0

function RandomChangeCurrencyData() {

   toCount = convertTypes.findIndex(item => item === toData.value)
   fromCount = convertTypes.findIndex(item => item === fromData.value)
   // count To
   toCount++
 
   if (toCount >= convertTypes.length) {
      toCount = 1
   }
   // count from
   fromCount++
   if (fromCount >= convertTypes.length) {
      fromCount = 0
   }
   if (fromCount === toCount) {
      for(let u = 0; u < convertTypes.length; u++) {
         toCount = u
         if (toCount !== fromCount) {
            toCount = u
         }
      }
   }
   let convertTypeTo = convertTypes[toCount]
   let convertTypeFrom = convertTypes[fromCount]
   toData.value = convertTypeTo
   fromData.value = convertTypeFrom
   toIn.value = convertTypeTo
   fromIn.value = convertTypeFrom
}

randomChangeCurrency.addEventListener("click", () => {
   // RandomChangeCurrencyData()
   let x = fromData.value
   fromData.value = toData.value
   fromIn.value = toData.value
   toData.value = x
   toIn.value = x
})


fromIn.addEventListener('input', () => {
   fromIn.style.width = InputToWidth(fromIn)
})

toIn.addEventListener("input", () => {
   toIn.style.width = InputToWidth(toIn)
})


function InputToWidth(input) {
   return (input.value.length + 1) === 1 ? "43px" : (input.value.length + 2 + "ch")
}

fromIn.addEventListener("input", () => {
   const fromInValue = fromIn.value.toUpperCase()
   fromIn.value = fromInValue

   if (fromInValue.length === 3) {
      for(let i = 0; i < convertTypes.length; i++) {
         if (fromInValue === convertTypes[i]) {
            fromData.value = convertTypes[i]
         }
      }
   }
   if (fromInValue === toIn.value) {
      for (let y = 0; y < convertTypes.length; y++) {
         toIn.value = convertTypes[y]
         toData.value = convertTypes[y]
         if (fromInValue !== toIn.value) {
            return
         }
      }
   }
})
toIn.addEventListener("input", () => {
   let toInValue = toIn.value.toUpperCase()
   toIn.value = toInValue
   if (toInValue.length === 3) {
      for(let i = 0; i < convertTypes.length; i++) {
         if (toInValue === convertTypes[i]) {
            toData.value = convertTypes[i]
         }
      }
   }
   if (fromIn.value === toInValue) {
      for (let y = 0; y < convertTypes.length; y++) {
         fromIn.value = convertTypes[y]
         fromData.value = convertTypes[y]
         if (toInValue !== fromIn.value) {
            return
         }
      }
   }
})
