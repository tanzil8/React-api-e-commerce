import { useEffect, useState } from 'react';
import './App.css';

function App() {
    let [product, setProduct] = useState([]);
    let [search, setSearch] = useState('');
    let [priority, setPriority] = useState('');

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, []);

    const filteredProducts = product
        .filter((data) => {
            return search === '' ? data : data.category.toLowerCase().includes(search.toLowerCase());
        })
        .filter((d) => {
            if (priority === 'high') {
                return d.price >= 300;
            } else if (priority === 'medium') {
                return d.price > 100 && d.price < 300;
            } else if (priority === 'low') {
                return d.price <= 100;
            } else {
                return true; // Show all products if no filter is applied
            }
        });

    return (
        <>
            <nav class="flex flex-wrap items-center justify-between p-3 bg-[#e8e8e5]">
                <div class="text-2xl">Tanzil store</div>
                <form class="flex items-center max-w-sm mx-auto">
                    <label for="simple-search" class="sr-only">Search</label>
                    <div class="relative w-full">
                        <input
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            id="simple-search"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                            placeholder="Search product name..."
                            required
                        />
                    </div>
                </form>
                <select class="w-28 h-10 round md:rounded" id="priority" onChange={(e) => setPriority(e.target.value)}>
                    <option value="">All</option>
                    <option value="high">HIGH</option>
                    <option value="medium">MEDIUM</option>
                    <option value="low">LOW</option>
                </select>
         


            <div class="toggle w-full text-end hidden md:flex md:w-auto px-2 py-2 md:rounded">
        <a href="tel:+123">
            <div class="flex justify-end">
                <div class="flex items-center h-10 w-30 rounded-md bg-[#c8a876] text-white font-medium p-2">
                 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Call now
                </div>
            </div>
        </a>
    </div>

    </nav>

<div class="relative w-full h-[320px]" id="home">
    <div class="absolute inset-0 opacity-40">
        <img src="https://t4.ftcdn.net/jpg/02/16/47/35/360_F_216473592_NefHePTpMfvYMNjD3UQTUVJy7DFPwqKA.jpg" class="object-cover object-center w-full h-full" />

    </div>
    <div class="absolute inset-9 flex flex-col md:flex-row items-center justify-between">
        <div class="md:w-1/2 mb-4 md:mb-0">
            <h1 class="text-grey-800 font-medium text-10xl md:text-6xl leading-tight mb-2">React e-commerce</h1>
            <p class="font-regular text-xl mb-8 mt-4">One stop solution for product services</p>
            <a href="#contactUs"
                class="px-6 py-3 bg-[#092730] text-white font-medium rounded-full hover:bg-[#183f4b]  transition duration-200">Contact
                Us</a>
        </div>
    </div>
</div>








            {filteredProducts.map((d) => {
                let { price } = d;
                let color = price >= 300 ? 'red' : price > 100 ? 'green' : 'orange';
                return (
                    <div class="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden" key={d.id}>
                        <div class="container mx-auto px-6 flex relative py-16">
                            <div class="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
                                <h5 class="mt-20 font-bebas-neue uppercase text-3xl sm:text-7xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                                    {d.category}
                                </h5>
                                <p class="mt-5 text-sm sm:text-base text-gray-700 dark:text-white">{d.description}</p>
                                <div class="flex mt-8">
                                    <a
                                        href="#"
                                        class="uppercase py-2 px-4 rounded-lg text-md text-2xl md:text-4xl font-bold"
                                        style={{ color: color }}
                                    >
                                        {d.price}
                                    </a>
                                </div>
                            </div>
                            <div class="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
                                <img src={d.image} class="max-w-xs md:max-w-sm m-auto" />
                            </div>
                        </div>
                    </div>
                );
            })}

            <div class="text-center py-10 px-10">
                <h2 class="font-bold text-2xl md:text-4xl mb-4">
                    Thanks to{' '}
                    <a href="https://unsplash.com/@nixcreative" class="underline font-black">
                        Tyler Nix
                    </a>{' '}
                    for those AMAZING product images!
                </h2>
            </div>
        </>
    );
}

export default App;
