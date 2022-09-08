const s = require('./scoreBoard');

let outCount = 0;
let runner = [false, false,false];
let versusResult = 0;
let battingResult = 0;
const fielders = ["ピッチャー","ファースト","セカンド","ショート","サード","レフト","センター","ライト","キャッチャー"];
const GORO = 5;
const FLY = 9;
const LINER = 8;
const RANDOM_NO = 100;
let bottomWon = false;

const game = () => {
    while (s.getInning() <= s.getfinalInning() - 1) {
        scoreDisplay(s.getTopTeam(), s.getTopPoint(), s.getBottomTeam(), s.getBottomPoint());
        topBottom ? document.write(`${s.getInning()}回の表${s.getTopTeam()}の攻撃<br />`) : document.write(`${s.getInning()}回の裏${s.getBottomTeam()}の攻撃<br />`);
        normalAttack();
        change();
    }
    scoreDisplay(s.getTopTeam(), s.getTopPoint(), s.getBottomTeam(), s.getBottomPoint()); 
    document.write(`${s.getInning()}回の表${s.getTopTeam()}の攻撃<br />`);
    normalAttack();
    change();
    if (s.getTopPoint() < s.getBottomPoint()) {
        document.write(`${s.getTopTeam()}:${s.getTopPoint()}対${s.getBottomTeam()}:${s.getBottomPoint()}で、${s.getBottomTeam()}の勝ち<br />`);
        bottomWon = true;
        socoreBard(bottomWon);
    } else {
        scoreDisplay(s.getTopTeam(), s.getTopPoint(), s.getBottomTeam(), s.getBottomPoint()); 
        document.write(`${s.getInning()}回の裏${s.getBottomTeam()}の攻撃<br />`);
        while (outCount < 3) {
            versus();
            if (s.getTopPoint() < s.getBottomPoint()) {
                document.write(`${s.getTopTeam()}:${s.getTopPoint()}対${s.getBottomTeam()}:${s.getBottomPoint()}で、${s.getBottomTeam()}の勝ち<br />`);
                bottomWon = true;
                socoreBard(bottomWon);
                break;
            }
        }
        if (s.getTopPoint() == s.getBottomPoint()) {
            document.write(`${s.getTopTeam()}:${s.getTopPoint()}対${s.getBottomTeam()}:${s.getBottomPoint()}で、引き分け<br />`);
            bottomWon = false;
            socoreBard(bottomWon);            
        } else if (s.getTopPoint() > s.getBottomPoint()) {
            document.write(`${s.getTopTeam()}:${s.getTopPoint()}対${s.getBottomTeam()}:${s.getBottomPoint()}で、${s.getTopTeam()}の勝ち<br />`);
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
        document.write(`三振！${outCount}アウト<br />` );
    } else if(versusResult < 26) {
        document.write("フォアボール<br />");
        fourBall(topBottom);
    } else if(versusResult < 51) {
        document.write("打った");
        batting(topBottom);
    }else {
        outCount++;
        let mediocre = 0;
        mediocre = randomNum(RANDOM_NO);
        if (mediocre < 45) {
            document.write(`${fielders[randomNum(GORO)]}ゴロ${outCount}アウト<br />`);
        } else if (mediocre < 55) {
            document.write(`${fielders[randomNum(LINER)]}ライナー${outCount}アウト<br />`);            
        } else {
            document.write(`${fielders[randomNum(FLY)]}フライ${outCount}アウト<br />`);              
        }
    }
};

const batting = (topBottom) => {
    battingResult = randomNum(RANDOM_NO);
    if (battingResult < 7) {
        document.write("ホームラン！<br />");
        for (a = 0; a < runner.length; a++) {
            if(runner[a]) {
                point(topBottom);
                runner[a] = false;
            }
        }
        point(topBottom);
    } else if (battingResult < 9) {
        document.write("三塁打！<br />");
        for (a = 0; a < runner.length; a++) {
            if(runner[a]) {
                point(topBottom);
                runner[a] = false;
            }
        }
        runner[3-1] = true;
    } else if (battingResult < 26) {
        document.write("二塁打！<br />");
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
        document.write("ヒット！<br />");
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
    topBottom ? s.getTopPoint()++ : s.getBottomPoint()++;
};

const change = () => {
    socoreBard(bottomWon);
    topBottom = !topBottom;
    if (topBottom) {
        s.getInning()++;
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
    document.write(speak);
}

const randomNum = (num) => {
    return Math.floor(Math.random() * num);
}

const scoreDisplay = (tt, ts, bt, bs) => {
    document.write(`${tt}:${ts}対${bt}:${bs}<br />`);    
}

const socoreBard = (bol) => {
    finalInningBottom = s.getBottomPoint() - beforeBottomPoint;
    if (topBottom) {
        s.getInningBoardTop().push(s.getTopPoint() - beforeTopPoint);
        beforeTopPoint = s.getTopPoint();
    } else {
        s.getInningBoardBottom().push(s.getBottomPoint() - beforeBottomPoint);
        beforeBottomPoint = s.getBottomPoint();
    }
    if (topBottom) {
        s.scoreBoradTop();
        for (sb = 0;sb < s.getInning() - 1; sb++) {
            document.write(`${s.getInningBoardBottom()[sb]}`);
        }
        document.write(`|${s.getBottomPoint()}<br />`);
    } else if (!topBottom && s.getInning() != s.getfinalInning()) {
        s.scoreBoradBottom();
    } else {
        if (bol) {
            s.scoreBoradTop();
            for (sb = 0;sb < s.getInning() - 1; sb++) {
                document.write(`${s.getInningBoardBottom()[sb]}`);
            }
            if (finalInningBottom == 0) {
                document.write(`X|${s.getBottomPoint()}<br />`);
            } else {
                document.write(`${s.getInningBoardBottom()[s.getInning() - 1]}`);
                document.write(`x|${s.getBottomPoint()}<br />`);
            }
        } else {
            s.scoreBoradBottom();
        }
    }
}
