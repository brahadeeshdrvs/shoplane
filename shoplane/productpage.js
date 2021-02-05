
 var productId = window.location.search.split('=')[1];
 
var xyz = new XMLHttpRequest();
xyz.open('GET','https://5d76bf96515d1a0014085cf9.mockapi.io/product/'+ productId,true);
xyz.onreadystatechange = function() {
    if(this.readyState === 4){
        var responseArr = JSON.parse(this.responseText)
var productpage = document.getElementById('product');

var leftsection = document.createElement('div');
leftsection.className = "left-column";
var productimage = document.createElement('img');
productimage.id = "productImg"
productimage.src = responseArr.preview;
leftsection.appendChild(productimage);
productpage.appendChild(leftsection);
var rightsection = document.createElement('div');
rightsection.className = 'right-column';
var productdescription = document.createElement('div');
productdescription.className = "product-description";
var h1 = document.createElement('h1');
h1.id = "name";
h1.innerText = responseArr.name;
var h4 = document.createElement('h4');
h4.id = "brand";
h4.innerText= responseArr.brand;
var h3 = document.createElement('h3');
h3.innerText = "Price: Rs "
var span = document.createElement('span');
span.id = "price"
span.innerText = responseArr.price;
h3.appendChild(span);
var description = document.createElement('div');
description.className = "description";
var h3desc = document.createElement('h3');
h3desc.innerText = "Description";
var paradesc =  document.createElement('p');
paradesc.id = "description";
paradesc.innerText = responseArr.description;
description.appendChild(h3desc);
description.appendChild(paradesc);
var previewimagesec = document.createElement('div');
previewimagesec.className = "product-preview";
var previewheading = document.createElement('h3');
previewheading.innerText = "Product Preview";
var previewcards = document.createElement('div');
previewcards.className = "previewImg";


function generateimages (preview,i){
var previewimage = document.createElement('img');
previewimage.id = "img"+i;
previewimage.src = preview ;
 return previewimage;
}
for (var i =0; i < responseArr.photos.length;i++){
  var imagespreview = generateimages(responseArr.photos[i],i)
  previewcards.appendChild(imagespreview)
  
  previewcards.onclick = function(e){
    e.target.className = "active";
    productimage.src =
     e.target.src;
    for(var i=0;i<previewcards.childNodes.length;i++){
      if(e.target.id !== previewcards.childNodes[i].id && previewcards.childNodes[i].className === "active" ){
        previewcards.childNodes[i].className = "inactive"
      }
     
    }
    
    
  }
}

previewimagesec.appendChild(previewheading)
previewimagesec.appendChild(previewcards)
productdescription.appendChild(h1)
productdescription.appendChild(h4)
productdescription.appendChild(h3)
productdescription.appendChild(description)
productdescription.appendChild(previewimagesec)
rightsection.appendChild(productdescription)
productpage.appendChild(rightsection)


var purchasebtn = document.createElement('div');
purchasebtn.className = "btn";
var button = document.createElement('button');
button.id = "add-to-cart";
button.innerText = "Add to Cart";
purchasebtn.appendChild(button)
rightsection.appendChild(purchasebtn)
var cartcount = document.getElementById("cart-count");
console.log(cartcount);
var count=1;
console.log(cartcount.innerText)
button.onclick = function(){
  
  var currentObj = responseArr;
  var productList = window.localStorage.getItem('product-list');
        productList = productList === null || productList === '' ? [] : productList;
        productList = productList.length > 0 ? JSON.parse(productList) : [];
        console.log(productList);
        var foundAtPos = -1;
        for(var i=0; i < productList.length; i++) {
            if(parseInt(productList[i].id) == parseInt(currentObj.id)) {
                foundAtPos = i;
            }
        }

        if(foundAtPos > -1) {
            productList[foundAtPos].count = productList[foundAtPos].count + 1;
            console.log(productList[foundAtPos].count);
            window.localStorage.setItem('product-list', JSON.stringify(productList));
        } else {
            currentObj.count = 1;
            productList.push(currentObj);
            console.log(productList);
            window.localStorage.setItem('product-list', JSON.stringify(productList));
        }

        var totalCount = 0;
        for(var i=0; i<productList.length; i++) {
            totalCount = totalCount + productList[i].count;
        }
        $('#cart-count').html(totalCount);
 

}

    }
}
xyz.send();


