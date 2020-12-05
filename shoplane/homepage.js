$(document).ready(function(){
  $('.slides').slick({
      centerMode: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      dots: true,
      arrows: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
  });
})

  


var cardsGrid = document.getElementsByClassName("card-container");

function generateCard (list){
var card = document.createElement('div')
card.className = "card";
card.id = list.id;
var anctag = document.createElement('a');
anctag.href = './productpage.html?id='+list.id;
card.appendChild(anctag)
var thumbnail = document.createElement('div');
thumbnail.className='img';
var img = document.createElement('img')
img.src = list.preview;
var details = document.createElement('div');
details.className = "details";
var h3 = document.createElement("h2");
var h4 = document.createElement("h3");
var h5 = document.createElement("h4");
h3.innerText = list.name;
h4.innerText = list.brand;
h5.innerText = 'Rs '+list.price ;
details.appendChild(h3);
details.appendChild(h4);
details.appendChild(h5);
thumbnail.appendChild(img);
anctag.appendChild(thumbnail);
anctag.appendChild(details);
return card;

}

var xyz = new XMLHttpRequest();
xyz.open('GET','https://5d76bf96515d1a0014085cf9.mockapi.io/product',true);
xyz.onreadystatechange = function() {
    if(this.readyState === 4){
        var responseArr = JSON.parse(this.responseText)
           console.log(responseArr)
           for(var i=0;i<responseArr.length;i++){
            var cards =  generateCard(responseArr[i]);
            if(responseArr[i].isAccessory === false) {
              cardsGrid[0].appendChild(cards)
            }
            else{
            cardsGrid[1].appendChild(cards)
            }
        }
 }
}
xyz.send();
