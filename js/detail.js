const link=window.location.search
const id=new URLSearchParams(link).get("id")
const blog=document.getElementById("blog")

fetch(`https://restcountries.com/v3.1/alpha/${id}`)
.then(res=> res.json())
.then( melumat=>{
    const item = melumat[0]
    blog.innerHTML=`
    <div class="container mx-auto flex px-5 py-24 min-h-[74vh] md:flex-row flex-col items-center">
                <div
                    class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 class="title-font sm:text-4xl text-3xl mb-2 font-medium text-black">Gabon<p class="text-lg">
                            Paytaxtı: ${item.name.common}</p>
                    </h1>
                    <p class="mb-2 leading-relaxed">Danışılan dillər: ${Object.entries(item.languages).map(([key,value])=> `${value}`)} </p>
                    <p class="mb-2 leading-relaxed"> <b>Əskinazları:</b> ${Object.entries(item.currencies).map(([key, value]) => `${value.name} və onun qısaltması ${key}`).join(", ")}
 
                    </p>
                    <p class="mb-2 leading-relaxed"><b>Regionu</b>: ${item.region}</p>
                    <p class="mb-2 leading-relaxed"><b>Ümumi Sahəsi</b>: ${item.area}</p>
                    <p class="mb-2 leading-relaxed"><b>Əhalisi</b>: ${item.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
                    <p class="mb-2 leading-relaxed"><b>Saat qurşağı</b>: ${item.timezones}</p>
                    <div class="flex justify-start gap-[8px] flex-wrap">
                    <p class="flex flex-row gap-x-3">
                    ${item.borders==undefined ? "Ada ölkəsidir, yəni qonşusu yoxdur":
                        item.borders?.map((border)=> '<a href="" class="inline-flex  text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">'+ border + '</a>').join("")}</p>
                    </div>
                    <div class="flex justify-start gap-[8px] flex-wrap"></div>
                </div>
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"><img class="object-cover object-center rounded"
                        alt="hero" src="${item.flags.svg}"></div>
            </div>
    `
} )

