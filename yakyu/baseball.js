let outCount = 0;
let runner = [false, false,false];
let topTeam = "Ateam";
let bottomTeam = "Bteam";
let topPoint = 0;
let bottomPoint = 0;
let inning = 1;
const finalInning = 9;
let topBottom = true;
let versusResult = 0;
let battingResult = 0;
const fielders = ["ピッチャー","ファースト","セカンド","ショート","サード","レフト","センター","ライト","キャッチャー"];
const GORO = 5;
const FLY = 9;
const LINER = 8;
const RANDOM_NO = 100;
let beforeTopPoint = 0;
let beforeBottomPoint = 0;
let inningBoardTop = [];
let inningBoardBottom = [];
let bottomWon = false;

const game = () => {
    while (inning <= finalInning - 1) {
        scoreDisplay(topTeam, topPoint, bottomTeam, bottomPoint);
        topBottom ? console.log(`${inning}回の表${topTeam}の攻撃<br />`) : console.log(`${inning}回の裏${bottomTeam}の攻撃<br />`);
        normalAttack();
        change();
    }
    scoreDisplay(topTeam, topPoint, bottomTeam, bottomPoint); 
    console.log(`${inning}回の表${topTeam}の攻撃<br />`);
    normalAttack();
    change();
    if (topPoint < bottomPoint) {
        console.log(`${topTeam}:${topPoint}対${bottomTeam}:${bottomPoint}で、${bottomTeam}の勝ち<br />`);
        bottomWon = true;
        socoreBard(bottomWon);
    } else {
        scoreDisplay(topTeam, topPoint, bottomTeam, bottomPoint); 
        console.log(`${inning}回の裏${bottomTeam}の攻撃<br />`);
        while (outCount < 3) {
            versus();
            if (topPoint < bottomPoint) {
                console.log(`${topTeam}:${topPoint}対${bottomTeam}:${bottomPoint}で、${bottomTeam}の勝ち<br />`);
                bottomWon = true;
                socoreBard(bottomWon);
                break;
            }
        }
        if (topPoint == bottomPoint) {
            console.log(`${topTeam}:${topPoint}対${bottomTeam}:${bottomPoint}で、引き分け<br />`);
            bottomWon = false;
            socoreBard(bottomWon);            
        } else if (topPoint > bottomPoint) {
            console.log(`${topTeam}:${topPoint}対${bottomTeam}:${bottomPoint}で、${topTeam}の勝ち<br />`);
            bottomWon = false;
            socoreBard(bottomWon);
        }
    }
};

const  versus = () => {
    baseCall(runner);
    versusResult =  randomNum(RANDOM_NO);
    if (versusResult < 18) {
        outCount++;
        console.log(`三振！${outCount}アウト<br />` );
    } else if(versusResult < 26) {
        console.log("フォアボール<br />");
        fourBall(topBottom);
    } else if(versusResult < 51) {
        console.log("打った");
        batting(topBottom);
    }else {
        outCount++;
        let mediocre = 0;
        mediocre = randomNum(RANDOM_NO);
        if (mediocre < 45) {
            console.log(`${fielders[randomNum(GORO)]}ゴロ${outCount}アウト<br />`);
        } else if (mediocre < 55) {
            console.log(`${fielders[randomNum(LINER)]}ライナー${outCount}アウト<br />`);            
        } else {
            console.log(`${fielders[randomNum(FLY)]}フライ${outCount}アウト<br />`);              
        }
    }
};

const batting = (topBottom) => {
    battingResult = randomNum(RANDOM_NO);
    if (battingResult < 7) {
        console.log("ホームラン！<br />");
        for (a = 0; a < runner.length; a++) {
            if(runner[a]) {
                point(topBottom);
                runner[a] = false;
            }
        }
        point(topBottom);
    } else if (battingResult < 9) {
        console.log("三塁打！<br />");
        for (a = 0; a < runner.length; a++) {
            if(runner[a]) {
                point(topBottom);
                runner[a] = false;
            }
        }
        runner[3-1] = true;
    } else if (battingResult < 26) {
        console.log("二塁打！<br />");
        if (runner[3-1]) {
            runner[3-1] = false;
            point(topBottom);
        }
        if (runner[2-1]) {
            runner[2-1] = false;
            point(topBottom);
        }
        if (runner[1-1]) {
            runner[1-1] = false;
            runner[3-1] = true;
        }
        runner[2-1] = true;     
    } else {
        console.log("ヒット！<br />");
        if (runner[3-1]) {
            runner[3-1] = false;
            point(topBottom);
        }
        if (runner[2-1]) {
            runner[2-1] = false;
            runner[3-1] = true;
        }
        if (runner[1-1]) {
            runner[1-1] = false;
            runner[2-1] = true;
        }
        runner[1-1] = true;  
    }
};

const fourBall = (topBottom) => {
    if (runner[1-1]) {
        if (runner[2-1]) {
            if (runner[3-1]) {
                point(topBottom);
            } else {
                runner[3-1] = true;
            }
        } else {
            runner[2-1] = true;
        }
    } else {
        runner[1-1] = true;
    }
};

const point = (topBottom) => {
    topBottom ? topPoint++ : bottomPoint++;
};

const change = () => {
    socoreBard(bottomWon);
    topBottom = !topBottom;
    if (topBottom) {
        inning++;
    }
    outCount = 0;
    runner = [false, false,false];
};

const normalAttack = () => {
    while (outCount < 3) {
        versus();
    }
};

const baseCall = (base) => {
    let call = ["ランナー"];
    let speak = "";
    if (base[0]) {
        call.push(",1");
    }
    if (base[1]) {
        call.push(",2");
    }
    if (base[2]) {
        call.push(",3");
    }
    if (call.length == 1) {
        call.push("なし<br />");
    } else {
        call.push("塁<br />");
    }
    for (b = 0;b < call.length; b++) {
        speak += call[b];
    }
    console.log(speak);
}

const randomNum = (num) => {
    return Math.floor(Math.random() * num);
}

const scoreDisplay = (tt, ts, bt, bs) => {
    console.log(`${tt}:${ts}対${bt}:${bs}<br />`);    
}

const socoreBard = (bol) => {
    finalInningBottom = bottomPoint - beforeBottomPoint;
    if (topBottom) {
        inningBoardTop.push(topPoint - beforeTopPoint);
        beforeTopPoint = topPoint;
    } else {
        inningBoardBottom.push(bottomPoint - beforeBottomPoint);
        beforeBottomPoint = bottomPoint;
    }
    if (topBottom) {
        scoreBoradTop();
        for (sb = 0;sb < inning - 1; sb++) {
            console.log(`${inningBoardBottom[sb]}`);
        }
        console.log(`|${bottomPoint}<br />`);
    } else if (!topBottom && inning != finalInning) {
        scoreBoradBottom();
    } else {
        if (bol) {
            scoreBoradTop();
            for (sb = 0;sb < inning - 1; sb++) {
                console.log(`${inningBoardBottom[sb]}`);
            }
            if (finalInningBottom == 0) {
                console.log(`X|${bottomPoint}<br />`);
            } else {
                console.log(`${inningBoardBottom[inning - 1]}`);
                console.log(`x|${bottomPoint}<br />`);
            }
        } else {
            scoreBoradBottom();
        }
    }
}

const scoreBoradTop = () => {
    for (st = 0;st < inning; st++) {
        console.log(`${inningBoardTop[st]}`);
    }
    console.log(`|${topPoint}<br />`);
}

const scoreBoradBottom = () => {
    scoreBoradTop();
    for (sb = 0;sb < inning; sb++) {
        console.log(`${inningBoardBottom[sb]}`);
    }
    console.log(`|${bottomPoint}<br />`);
}