/*
Designed By: Mohamed Atef Hasanean 
Phone Number: +201115925784

*/




//  ----------------------------- myData -----------------------------
let allMyIcon = { 
    "html": '<i class="fa-brands fa-html5"></i>',
    "css":' <i class="fa-brands fa-css3"></i>',
    "node":'<i class="fa-brands fa-node-js"></i>',
    "js":' <i class="fa-brands fa-react"></i>',
    "bootstrap":' <i class="fa-brands fa-bootstrap"></i>',
    "angular":'<i class="fa-brands fa-angular"></i>',
    "php":' <i class="fa-brands fa-php"></i>',
    "laravel":'<i class="fa-brands fa-laravel"></i>',
    "python":'<i class="fa-brands fa-python"></i>',
    "go":'<i class="fa-brands fa-golang"></i>',
    "dataBase": '<i class="fa-solid fa-database"></i>',
    "vuejs": '<i class="fa-brands fa-vuejs"></i>',
    "github": ' <i class="fa-brands fa-github"></i>',
    "apple": '<i class="fa-brands fa-apple"></i>',
    "facebook": '<i class="fa-brands fa-square-facebook"></i>',
    "twitter": '<i class="fa-brands fa-twitter"></i>',
    "whatsapp": '<i class="fa-brands fa-whatsapp"></i>',
    "google": '<i class="fa-brands fa-google"></i>',
    "computer": '<i class="fa-solid fa-computer"></i>',
    "mouse": '<i class="fa-solid fa-computer-mouse"></i>'
  }





















  

 // --------------------- countdownTimer --------------------
 let count = document.querySelector(".timer"),
 myTimer,
 // loser screen
  loser = document.querySelector(".loser"),
  againGame = document.querySelector(".loser .again");
 function countDownTimer(timer) { 
   let start = (timer > 20) ? 3 : (timer > 10) ? 2 : 1,
    time = start * 60;
    
   myTimer = setInterval(()=> { 
     let minutes = Math.floor(time / 60),
     seconds = time % 60;
     count.innerHTML = `0${minutes}:${(seconds < 10) ? '0' + seconds : seconds}`;
     time--;
     if(time === -1) { 
        clearInterval(myTimer);
        loser.classList.add("show");
        againGame.addEventListener("click",function () { 
            window.location.reload();
        }) 
     }
    },1000)

 }
 
/*
starting game take name of player
*/
// -----------------------------------------------

let nameGame = document.querySelector(".name span"),
nameInput = document.querySelector(".control-buttons .name-input"),
blocksNumber = document.querySelector(".control-buttons .blocks-number"),
controlButton = document.querySelector(".control-buttons span"),
 blocksContainer = document.querySelector(".memory-game-blocks"),
numberOfBlocks = 0,
 duration = 1000;
controlButton.onclick = function () { 
 
    // Add name player
if(nameInput.value == null || nameInput.value == "") { 
    nameGame.innerHTML = "Unknown";
} else { 
    nameGame.innerHTML = nameInput.value;
}

// add number of blocks 
if(blocksNumber.value == null || blocksNumber.value == "" || blocksNumber.value > 30 || blocksNumber.value < 0 || blocksNumber.value % 2 != 0) { 
    numberOfBlocks = 14;
} else { 
    numberOfBlocks = blocksNumber.value;
}
countDownTimer(numberOfBlocks);
// Remove slash screen
document.querySelector(".control-buttons").remove();


// add sound to background game
document.getElementById("game-sound").play();


//----------------------- add blocks in browser to start game ----------------------- 

for(let i = 0; i < (numberOfBlocks / 2); i++) { 
blocksContainer.innerHTML+= `
<div class="game-block" data-tech="${Object.keys(allMyIcon)[i]}">
            <div class="face front"></div>
            <div class="face back">
               ${allMyIcon[Object.keys(allMyIcon)[i]]}
            </div>
        </div>
        <div class="game-block" data-tech="${Object.keys(allMyIcon)[i]}">
            <div class="face front"></div>
            <div class="face back">
               ${allMyIcon[Object.keys(allMyIcon)[i]]}
            </div>
        </div>
` }



let blocks = Array.from(blocksContainer.children);
 // create array from game blocks

 let orderRange = [...Array(blocks.length).keys()];

 // add order css property to game blocks
shuffle(orderRange);
 blocks.forEach((block,index) => { 
    block.style.order = orderRange[index];

    // Add Click Event 
    block.addEventListener("click", function() { 
         
         // Trigger Flip Block Function
         flipBlock(block);
    })
 })


 // show icons before start game
blocks.forEach(blockItem => { 
    blockItem.classList.add("is-flipped");
})
 

// flipping icons and start game
setTimeout(() => { 
    blocks.forEach(blockItem => { 
        blockItem.classList.remove("is-flipped");
    })
},Math.floor((duration * numberOfBlocks)) / 2)

  //------------------------------------------------
 //Flip Block Function
 function flipBlock(select) { 
    select.classList.add("is-flipped");
   
    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(blockItem => blockItem.classList.contains("is-flipped"));
   
    // If There Two Selected Blocks
    if(allFlippedBlocks.length ===  2) { 
        // Stop Clicking Function
   
        stopClicking() ;
    // Check Matched Block Function
    blockCheck(allFlippedBlocks[0],allFlippedBlocks[1]);
    }
   
   
    } 


    //----------- Stop Clicking Function ----------- 
function stopClicking() { 
    // Add Class No Clicking on Main container
    blocksContainer.classList.add("no-clicking");

    setTimeout(() => { 
        // remove Class No Clicking on Main container
        blocksContainer.classList.remove("no-clicking");
    },duration)
}


//----------- Check Matched Block Function----------- 
function blockCheck(firstBlock,secondBlock) { 
    let tries = document.querySelector(".tries span");
     if(firstBlock.dataset.tech === secondBlock.dataset.tech) { 
    
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");
    
        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
        document.getElementById("success").play();
       
        if(blocks.filter(blockItem => blockItem.classList.contains("has-match")).length == numberOfBlocks  ) { 
            // pause audio and run audio of winning
            document.getElementById("game-sound").pause();

            //clear interval when player winning
            clearInterval(myTimer);
            setTimeout(() => { 
                document.getElementById("winning").play();
            },duration)
           
        }
    
     } else { 
    
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        document.getElementById("fail").play();
           
        setTimeout(() => { 
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        },duration)
    
     }
    }


}



 //----------- function to shuffle elements ----------- 
 function shuffle(arr) { 
    let current = arr.length,
    temp,
    random;
    
    while(current > 0) { 
       
        //Get Random Number
        random = Math.floor(Math.random() * current);
         
        // Decrease Length By One
        current--;

        temp = arr[current];
        arr[current] = arr[random];
        arr[random] = temp;


    }
 }
  //-----------------------------------------------
  /*
Designed By: Mohamed Atef Hasanean 
Phone Number: +201115925784

*/

