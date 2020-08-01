window.onload = function(){

    //Variable declaration
    let buttons = document.querySelectorAll('#interactions button');
    let addNumber = document.getElementById('addNumber');


    //Adding the Event Listeners
    buttons.forEach((value, key) => {
        value.addEventListener('click',makeCount);
    });

    addNumber.addEventListener('click', addOtherElement);


    //Functions
    //Adding the elements to interact
    function addOtherElement(){
        let element = createElement();
        document.getElementsByClassName('clock')[0].insertBefore(element, addNumber.parentNode);
    }

    //The return to AddOtherElement function
    function createElement(){
        let element = document.createElement("div");
        element.setAttribute('class', 'time somable addOthers');
        element.innerHTML = `<input type="text" class="h" maxlength="2"><label>Hrs</label>
                             <input type="text" class="m" maxlength="2"><label>Min</label>
                             <input type="text" class="s" maxlength="2"><label>Sec</label>`
        return element;
    }

    //The main function of the project
    function makeCount(){
        let message = this.innerText;
        let count = [];

        //Getting the div with the inputs to interact
        let getInputs = document.getElementsByClassName('somable');

        //Run a loop to catch the values of the inputs and putting in the count variable
        for(let i = 0; i < getInputs.length; i++){
            count[i] = [];
            for(index of getInputs[i].children){
                if(index instanceof HTMLInputElement){
                    count[i].push(index);
                }
            }
        }

        //Now the count has all that i need to proceed
        makeInteraction(message,count);
    }

    //Adding, Subtracting or reseting
    function makeInteraction(action,arr){

        //Starting the hardest piece
        let final = [];
        let number;

        //Trying to sort by hour, minute and second
        for(let num = 0; num < arr[0].length; num++){
            final[num] = 0;
            for(let n = 0; n < arr.length; n++){

                
                if(isNaN(parseInt(arr[n][num].value))){
                    number = 0;
                }else{
                    number = parseInt(arr[n][num].value)
                }


                switch(action){
                    case 'ADD':
                        final[num] += number;
                        arr[n][num].value = '';
                        break;

                    case 'SUBTRACT':
                        if(n == 0){
                            final[num] = number;
                        }else{
                            final[num] -= number;
                        }
                        arr[n][num].value = '';
                        break;

                    case 'RESET':
                        arr[n][num].value = '';
                        break;
                }

            }
        }

        let time = convertTime(final,action);


        //To put the result on the correct place
        function putInput(id){
            let index = 0;

            for(i of document.getElementById(id).children){
                if(i instanceof HTMLInputElement){
                    if(time[index] === 0){
                        time[index] = '';
                    }
                    i.value = time[index];
                    index++;
                }
            }
        }

        //If you have added others divs, this function clear them all
        function resetInputs(){
            //I do the for loop twice because i couldn't remove all on the first for, and i don't now why
            let toDelete = [];
            for(i of document.getElementsByClassName('addOthers')){
                toDelete.push(i);
            }

            for(i of toDelete){
                i.remove();
            }
        }


        putInput('lastOne');
        if(document.querySelector('input[type="checkbox"]').checked){
            putInput('firstTime');
        }

        resetInputs();
        addOtherElement();
    }

    function convertTime(time,whatDo){

        //Reverting to get the second in the first place
        time.reverse();
        console.log(time);

        if(whatDo === 'ADD'){
            for(let i = 0; i < time.length-1; i++){
                while(time[i] >= 60){
                    time[i] -= 60;
                    time[i+1]++;
                }
            }
        }else if(whatDo === 'SUBTRACT'){
            for(let i = 0; i < time.length-1; i++){
                while(time[i] <= -60){
                    time[i] += 60;
                    time[i+1]--;
                }
            }
        }

        return time.reverse();
    }
    

    addOtherElement();

}