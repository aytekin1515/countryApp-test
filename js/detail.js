const link = window.location.search;
const id = new URLSearchParams(link).get("id") || "AZE"
const blog = document.getElementById("blog");

function fetchCountryInfo(countryCode) {
    fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
        .then(res => res.json())
        .then(melumat => {
            const item = melumat[0];
            document.title = `${item.name.common} - Ölkə Məlumatı`
            blog.innerHTML = `
            <div class="container mx-auto flex px-5 py-24 min-h-[50vh] md:flex-row flex-col items-center">
                <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 class="title-font sm:text-4xl text-3xl mb-3 font-medium text-black">${item.name.common}</h1>
                    <p class="text-lg mb-2"><b>Paytaxtı:</b> ${item.capital}</p>
                    <p class="mb-2 leading-relaxed"><b>Danışılan dillər:</b> ${Object.values(item.languages).join(", ")}</p>
                    <p class="mb-2 leading-relaxed"><b>Əskinazları:</b> 
                        ${Object.entries(item.currencies).map(([key, value]) => `${value.name} (${key})`).join(", ")}
                    </p>
                    <p class="mb-2 leading-relaxed"><b>Regionu:</b> ${item.region}</p>
                    <p class="mb-2 leading-relaxed"><b>Ümumi Sahəsi:</b> ${item.area} km²</p>
                    <p class="mb-2 leading-relaxed"><b>Əhalisi:</b> ${item.population.toLocaleString()}</p>
                    <p class="mb-2 leading-relaxed"><b>Saat qurşağı:</b> ${item.timezones.join(", ")}</p>
                    <div class="flex justify-start gap-[8px] flex-wrap">
                        <p class="flex flex-row gap-x-3">
                            ${item.borders ? 
                                item.borders.map(border => 
                                    `<a href="?id=${border}" data-border="${border}" 
                                        class="border-link inline-flex text-white bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                        ${border}
                                    </a>`
                                ).join(" ") 
                                : "Ada ölkəsidir, yəni qonşusu yoxdur"
                            }
                        </p>
                    </div>
                </div>
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img class="object-cover object-center rounded" alt="hero" src="${item.flags.svg}">
                </div>
            </div>`;
            addBorderClickEvents();
        });
}

function addBorderClickEvents() {
    document.querySelectorAll(".border-link").forEach(anchor => {
        anchor.addEventListener("click", (event) => {
            event.preventDefault();
            const newCountryCode = event.target.getAttribute("data-border");
            if (!newCountryCode) return;
            fetchCountryInfo(newCountryCode);
            window.history.pushState({}, "", `?id=${newCountryCode}`);
        });
    });
}
fetchCountryInfo(id);
