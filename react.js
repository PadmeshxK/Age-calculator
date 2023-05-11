//import html elements
const dayInputEle = document.querySelector('#date_input')
const monthInputEle = document.querySelector('#month_input')
const yearInputEle = document.querySelector('#year_input')
const buttonEle = document.querySelector('.arrow_container')
const labelsEle = document.querySelectorAll('.top_section_container label')
const inputsEle = document.querySelectorAll('.top_section_container input')
const sectionsEle = document.querySelectorAll('.top_section_container section')
const ageDispalyEle = document.querySelectorAll('.bottom_section_container .highlight_number')

let currentDate = new Date()
let count = 0

buttonEle.addEventListener('click',()=>{
    inputsEle.forEach((element)=>{
        if(element.value == ''){
            addInvalidPrompt(element,'This field is required')
            addInvalidColor()
            updateAge('--','--','--')
            count = 1
        }
        else{
            count = 0
        }
    })
    if (count == 0 && checkDateValidity().length == 0){
        ageValues = calculateAge()
        updateAge(ageValues[0],ageValues[1],ageValues[2])
    }
    else{
        updateAge('--','--','--')
    }
})

inputsEle.forEach((element)=>{
    element.addEventListener('keyup',()=>{
        let errorArr = checkDateValidity()
        if (errorArr.length != 0){
            addInvalidColor()
            errorArr.forEach((ele)=>{
                appendInvalidElement(ele)
            })
        }
        else{
            removeInvalidColor()
        }
        removeInvalidTexts(errorArr)
    })
})


function appendInvalidElement(key){
    if (key == 'date'){
        addInvalidPrompt(dayInputEle,'Must be a valid day')      
    }

    if (key == 'month'){
        addInvalidPrompt(monthInputEle,'Must be a valid month')     
    }

    if (key == 'year'){
        addInvalidPrompt(yearInputEle,'Must be in the past')
    }

}

function addInvalidPrompt(inputEle,text){
    let parentEle = inputEle.parentNode
    let childrenEle = [...parentEle.children]
    let eleExists = false
    childrenEle.forEach((element)=>{
        if (element.classList.contains('invalid_text')){
           eleExists = true
        }
    })
    if (!eleExists){
        let invalidEle = document.createElement('p')
        invalidEle.classList.add('invalid_text')
        invalidEle.innerText = text
        inputEle.parentNode.appendChild(invalidEle)
    }
}

function removeInvalidPrompt(inputEle){
    let parentEle = inputEle.parentNode
    let childrenEle = [...parentEle.children]
    childrenEle.forEach((element)=>{
        if (element.classList.contains('invalid_text')){
            parentEle.removeChild(parentEle.lastElementChild)
        }
    })
}

function removeInvalidTexts(arr){
    if (!arr.includes('date')){
        removeInvalidPrompt(dayInputEle)
        }
    if (!arr.includes('month')){
        removeInvalidPrompt(monthInputEle)
    }
    if (!arr.includes('year')){
        removeInvalidPrompt(yearInputEle)
    }
}

function addInvalidColor(){
    labelsEle.forEach((ele)=>{
        ele.classList.add('invalid_color')
    })
    inputsEle.forEach((ele)=>{
        ele.classList.add('invalid_border_color')
    })
}

function removeInvalidColor(){
    labelsEle.forEach((ele)=>{
        ele.classList.remove('invalid_color')
    })
    inputsEle.forEach((ele)=>{
        ele.classList.remove('invalid_border_color')
    })
}

function checkDateValidity(){
    let errorList = []
    let date = dayInputEle.value
    let month = monthInputEle.value
    let year = yearInputEle.value
  
        if (date > 31 || date < 1 && date != ''){
            errorList.push('date')
        }
    
        if (month > 12 || month < 1 && month != ''){
            errorList.push('month')
        }
        else{
            if (date != '' && month != ''){
                if (month <= 7 && month % 2 == 0 && month != 2){
                    if (date > 30){
                        errorList.push('date')
                    }
                }
                else if(month > 7 && month % 2 != 0){
                    if (date > 30){
                        errorList.push('date')
                    }
                }
                else if(month == 2){
                    if (date > 29){
                        errorList.push('date')
                    }
                }
            }
        
        }
    
        if (year > currentDate.getFullYear()){
            errorList.push('year')
        }
        else if (year == currentDate.getFullYear()){
            if (month != ''){
                if (month > currentDate.getMonth()+1){
                    errorList.push('month')
                    console.log(currentDate.getMonth())
                }
                else if (month == currentDate.getMonth()+1){
                    if (date != '' && date > currentDate.getDate()){
                        errorList.push('date')
                    }
                }
            }      
        }

        if (year <= currentDate.getFullYear()){
            if (checkLeapYear(year) == false){
                if (month != '' && month == 2){
                    if (date != '' && date > 28){
                        errorList.push('date')
                    }
                }
            }
        }
    
    errorList = errorList.filter((value,index) => errorList.indexOf(value) == index)
    return errorList    
}

function checkLeapYear(year) {
    if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
        return true
    } else {
        return false
    }
}

function calculateAge(){
    let inputDate = dayInputEle.value
    let inputMonth = monthInputEle.value
    let inputYear = yearInputEle.value
    let max_date = new Date(inputYear,inputMonth,0).getDate()
    let currYear = currentDate.getFullYear()
    let currMonth = currentDate.getMonth()+1
    let currDate = currentDate.getDate()
    let year = currYear - inputYear
    let month = currMonth - inputMonth
    let date = currDate - inputDate
    if (currMonth < inputMonth){
        year--
        month = 12 + month
    } 
    if (currDate < inputDate){
        date =  max_date + date
        month-- 
    }
    if (currMonth == inputMonth){
        if (inputDate > currDate){
            year--
            month += 12
        }
    }
    return [year,month,date]
}

function updateAge(year,month,date){
    ageDispalyEle[0].innerText = year
    ageDispalyEle[1].innerText = month
    ageDispalyEle[2].innerText = date
}
