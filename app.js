let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

// access of alternate player
let turnO = true;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
    [2,5,8]
];

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            // player O
            box.textContent = "O";
            turnO = false;
        } else {
            // player X
            box.textContent = "X";
            turnO = true;
        }
        box.disabled = true;
        // Update the text content first, then check for a winner and disable boxes
        checkWinner();
     // Pass the clicked box to exclude it from being disabled
    });
});

const disabledBoxes = (clickedBox) => {
    for (let box of boxes) {
        if (box !== clickedBox) {
            box.disabled = true;
        }
    }
};

const enabledBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.textContent = "";
    }
};

const resetGame = () => {
    turnO = true;
    enabledBoxes();
    msgContainer.classList.add('hide');
}

function showWinner(winner) {
    msg.textContent = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disabledBoxes();
};

function checkWinner() {
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].textContent;
        let pos2Val = boxes[pattern[1]].textContent;
        let pos3Val = boxes[pattern[2]].textContent;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log('winnnnn', pos1Val);
                showWinner(pos1Val);
            }
        }
    }
};

newBtn.addEventListener('click', resetGame);
resetBtn.addEventListener('click', resetGame);
