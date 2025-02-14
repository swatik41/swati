const products = [
    {id: 1,name:"radio",Image:"https://th.bing.com/th/id/OPAC.BnA4A5zd9lEb0A474C474?w=152&h=166&rs=1&pid=21.1",price:680},
    {id: 2,name:"mobile",Image:"https://th.bing.com/th/id/OIP.q5sT5hWs9TXtDNCNsySQEAHaHa?w=181&h=181&c=7&r=0&o=5&pid=1.7",price:20000},
    {id: 3,name:"laptop",Image:"https://th.bing.com/th/id/OIP.Y6NMKn5yt4mu84Ks5tVSuwHaFc?w=239&h=180&c=7&r=0&o=5&pid=1.7",price:50000},
    {id: 4,name:"washing machine",Image:"https://th.bing.com/th/id/OIP.UYYbXub3LfG9xN_LrfSIugHaLH?w=131&h=196&c=7&r=0&o=5&pid=1.7",price:35000},

]
//Render Products

function renderProducts(products,productList){
    const container=document.getElementById(productList);
    container.innerHTML="";
    products.forEach(product => {
        const productDiv=document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML=`
        <img src= "${product.Image}"/>
        <h3>${product.name}</h3>
        <h2>${product.price}</h2>
        <button onclick="addToCart(${product.id})">Add to Cart"</button>
        `
        container.appendChild(productDiv);


    })

}

    //add to cart

    function addToCart(productId){    
       const product = products.find(p => p.id === productId);
       let cart = JSON.parse(localStorage.getItem("cart"))||[];
       cart.push(product);
       localStorage.setItem("cart",JSON.stringify(cart));
       alert(`${product.name} is added to cart`)
       renderCart();
    }

        //Render items in cart

        function renderCart(){
            const cart = JSON.parse(localStorage.getItem("cart"))||[];
            const container = document.getElementById("cartItems");
            container.innerHTML="";
            if(cart.length == 0){
                container.innerHTML="<h1>Your Cart is Empty</h1>"

            }
            cart.forEach(item => {
                const cartDiv = document.createElement("div");
                cartDiv.classList.add("cart-item");
                cartDiv.innerHTML=`
                <img src="${item.Image}"/>
                <h3>${item.name}</h3>
                <h2>${item.price}</h2>
                <button onclick="removeFromCart(${item.id})">Remove</button>
                `
                container.appendChild(cartDiv); 


             })
}

//Remove from cart

function removeFromCart(productId){
    let cart = JSON.parse(localStorage.getItem("cart"))||[];
    cart =cart.filter(item => item.id !== productId);
    localStorage.setItem("cart",JSON.stringify(cart));
    alert("Product is removed succesfully");
    renderCart(); 
}

//Calculate subtotal

function renderSubtotal(cart){
    const subtotal = cart.reduce((total,item) => total + item.price,0);
    const subtotalContainer = document.getElementById("subtotal");
    if(cart.length > 0){
        subtotalContainer.innerHTML = `Subtotal : Rs. ${subtotal}`
    }else{
        subtotalContainer.innerHTML = `No items in the cart`
    }

}


//search functionality

function searchProducts(query){
    const filterProducts = products.filter(product =>
        product.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())

    )
    renderProducts(filterProducts,"productList");
}
//Add EventListerner to bottom

document.getElementById("searchButton")?.addEventListener("click",() => {
    const query = document.getElementById("productSearch").value;
    searchProducts(query);
})

//Sorting
function sortProducts(criteria){
    if(criteria === "price"){
        return products.sort((a,b) => a.price-b.price);

    }
    return products;
}

//Adding Event Listerners

document.getElementById("sortOptions")?.addEventListener("change",(event)=>{
    const sortedProducts = sortProducts(event.target.value);
    renderProducts(sortedProducts,"productList");
})


if(document.getElementById("productList"))renderProducts(products,"productList");
if(document.getElementById("cartItems"))renderCart();
