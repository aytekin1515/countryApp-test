let DATA=[]
const Filter=[]
const content=document.getElementById('content')
const btn=document.getElementById('btn')
const detail=document.getElementById('detail')
const search=document.getElementById('search')
const textHeader=document.getElementById('textHeader')
let count=8


fetch("https://restcountries.com/v3.1/all")
.then( response=> response.json())
.then( melumat=>{
    DATA.push(...melumat)
    Filter.push(...melumat)
    show()
})


function show(){
    content.innerHTML=''
    DATA
    .slice(0,count)
    .forEach( item => {
        content.innerHTML += `
             <article onclick="window.location.href='./details.html?id=${item.ccn3}'" class="flex flex-col w-full  bg-gray-200 dark:bg-gray-50">
                <a rel="noopener noreferrer"  href="./details.html?id=${item.ccn3}" aria-label="Te nulla oportere reprimique his dolorum">
                    <img alt="" class="object-cover w-full h-52 dark:bg-gray-500"
                        src="${item.flags.png}">
                </a>
                <div  class="flex flex-col flex-1 p-6 cursor-pointer">
                    <a rel="noopener noreferrer" href="#"
                        aria-label="Te nulla oportere reprimique his dolorum"></a>
                    <a rel="noopener noreferrer" href="#"
                        class="text-xs tracking-wider uppercase hover:underline dark:text-violet-600"></a>
                    <a href="" class="flex-1 py-2 text-lg font-semibold leading-snug">${item.name.common}</a>
                     <span>${item.capital}</span><br/>
                    <p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
                </div>
            </article>
        `
    }     )

showCardDetails()
}

function scrollToCards() {
     content.scrollIntoView({ behavior: "smooth" })
     document.getElementById("detail").scrollIntoView({ behavior: "smooth" })
}


function showMore(){
    count+=8
    if(count>=DATA.length){
        btn.style.display="none"
    }else{btn.style.display='flex'}
    show()
}
function showCardDetails(){
    detail.innerHTML='' 
    const randomIndex=Math.floor(Math.random()*DATA.length)
    const selectCountry=DATA[randomIndex]
    detail.innerHTML=`
     <a rel="noopener noreferrer" href="./details.html?id=${selectCountry.ccn3}"  class="block max-w-sm gap-3 mx-auto text-black sm:max-w-full group hover:no-underline focus:no-underline lg:grid lg:grid-cols-12 bg-gray-100">
                <img src="${selectCountry.flags.png}" alt="" class="object-cover w-full h-64 rounded sm:h-96 lg:col-span-7 bg-gray-100">
                <div class="p-6 space-y-2 lg:col-span-5 bg-gray-100">
                    <h3 class="text-2xl font-semibold sm:text-4xl group-hover:underline group-focus:underline">${selectCountry.name.common}</h3>
                    <span class="text-xs text-gray-400">Paytaxt: ${selectCountry.capital}</span>
                    <p>Yerləşdiyi qitə: ${selectCountry.continents}</p>
                    <p> ${selectCountry.name.common}-nin əhalisi: ${selectCountry.population}</p>
                    <p>Onun qonşuları:<strong class="px-3"> ${selectCountry.borders && selectCountry.borders.length > 0 ? selectCountry.borders : "Ada ölkəsidir, yəni qonşusu yoxdur"}</strong></p>
                </div>
            </a>`
}

function filter(arg){
   DATA = arg == "all" ? Filter : Filter.filter((item) => item.region == arg)
   show()
    detail.style.display='none'
    textHeader.style.display='none'
    btn.style.display='none'
}



searchDiv.style.display="none"
document.getElementById('searchBtn').addEventListener('click',function(){
    if(searchDiv.style.display=="none"){
        searchDiv.style.display='block'
    }else{
        searchDiv.style.display="none"
    }
       
})

function searchCard(){
    content.innerHTML=''
       detail.style.display="none"
       btn.style.display='none'     
   DATA
   .filter( item=> item.name.common.toLowerCase().startsWith(search.value.toLowerCase()))
   .forEach((item)=>{ 
    content.innerHTML +=
        `<article  class="flex flex-col bg-gray-200  dark:bg-gray-50">
                <a rel="noopener noreferrer" href="./details.html?id=${item.ccn3}" aria-label="Te nulla oportere reprimique his dolorum">
                    <img alt="" class="object-cover w-full h-52 dark:bg-gray-500"
                        src="${item.flags.png}">
                </a>
                <div class="flex flex-col flex-1 p-6">
                    <a rel="noopener noreferrer" href="#"
                        aria-label="Te nulla oportere reprimique his dolorum"></a>
                    <a rel="noopener noreferrer" href="#"
                        class="text-xs tracking-wider uppercase hover:underline dark:text-violet-600"></a>
                    <a href="" class="flex-1 py-2 text-lg font-semibold leading-snug">${item.name.common}</a>
                     <span>${item.capital}</span><br/>
                    <p>Mei ex aliquid eleifend forensibus, quo ad dicta apeirian neglegentur, ex has tantas percipit perfecto. At per tempor albucius perfecto, ei probatus consulatu patrioque mea, ei vocent delicata indoctum pri.</p>
                </div>
            </article>`
   })
}



document.getElementById('burger-button').addEventListener('click', function() {
    const menuContainer = document.getElementById('menu-container');
    
    if (menuContainer.classList.contains('h-0')) {
        menuContainer.classList.remove('h-0');
        menuContainer.classList.add('h-auto');
    } else {
        menuContainer.classList.remove('h-auto');
        menuContainer.classList.add('h-0');
    }
});