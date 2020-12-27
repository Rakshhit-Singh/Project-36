var dog ,happyDog;
var database;
var foodS, foodStock;
var allFood;
var feed, addFood;
var lastFed , fedTime; 
var foodObj;

function preload()
{
  dog_image=loadImage("images/dogImg.png");
  dog_Image2=loadImage("images/dogImg1.png");
}

function setup() 
{  
  database=firebase.database();

  createCanvas(800, 400);

  foodObj= new Food();
  
  dog=createSprite(450,250,20,20);
  dog.addImage(dog_image);
  dog.scale=0.4;

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() 
{  
  background(46,139,87);
  foodObj.display();

   fedTime=database.ref('FeedTime');
   fedTime.on("value", function(data)
	{
     lastFed=data.val();
   	})
   fill(255,255,254);
   textSize(15);

   if(lastFed>=12){
     text("Last Feed: "+ lastFed%12 + " PM", 350,30);
    }else if(lastFed==0){
      text("Last Feed: 12 AM",350,30);
    }else{
      text("Last Feed: "+ lastFed + " AM", 350,30);
    }
  

   
  drawSprites();
}


function readStock(data)
{
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}




function addFoods()
{
foodS++;

database.ref('/').update({
  Food:foodS
})

dog.addImage(dog_image);
}

function feedDog(){
dog.addImage(dog_Image2);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
})

}

