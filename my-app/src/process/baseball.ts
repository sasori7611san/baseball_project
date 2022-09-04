export const baseball = () => {
    return game();
}
let outCount: number = 0;
let runner: boolean[] = [false, false,false];
let topTeam: string = "Ateam";
let bottomTeam: string = "Bteam";
let topPoint: number = 0;
let bottomPoint: number = 0;
let inning: number = 1;
const finalInning: number = 9;
let topBottom: boolean = true;
let versusResult: number = 0;
let battingResult: number = 0;
const fielders: string[] = ["ピッチャー","ファースト","セカンド","ショート","サード","レフト","センター","ライト","キャッチャー"];
const GORO: number = 5;
const FLY: number = 9;
const LINER: number = 8;
const RANDOM_NO: number = 100;

const game = () => {
    while (inning <= finalInning - 1) {
        console.log(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint); 
        topBottom ? console.log(inning + "回の表" + topTeam + "の攻撃") : console.log(inning + "回の裏" + bottomTeam + "の攻撃");
        normalAttack();
        change();
    }
    console.log(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint); 
    console.log(inning + "回の表" + topTeam + "の攻撃");
    normalAttack();
    change();
    if (topPoint < bottomPoint) {
        console.log(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "で、" + bottomTeam + "の勝ち");
    } else {
        console.log(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint); 
        console.log(inning + "回の裏" + bottomTeam + "の攻撃");
        while (outCount < 3) {
            versus();
            if (topPoint < bottomPoint) {
                console.log(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "で、" + bottomTeam + "の勝ち");
                break;
            }
        }
        if (topPoint == bottomPoint) {
            console.log(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "で、引き分け");            
        } else if (topPoint > bottomPoint) {
            console.log(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "で、" + topTeam + "の勝ち");
        }
    }
};

const  versus = () => {
    baseCall(runner);
    versusResult =  randomNum(RANDOM_NO);
    if (versusResult < 18) {
        outCount++;
        console.log("三振！" + outCount + "アウト" );
    } else if(versusResult < 26) {
        console.log("フォアボール");
        fourBall(topBottom);
    } else if(versusResult < 51) {
        console.log("打った");
        batting(topBottom);
    }else {
        outCount++;
        let mediocre = 0;
        mediocre = randomNum(RANDOM_NO);
        if (mediocre < 45) {
            console.log(fielders[randomNum(GORO)] + "ゴロ" + outCount + "アウト");
        } else if (mediocre < 55) {
            console.log(fielders[randomNum(LINER)] + "ライナー" + outCount + "アウト");            
        } else {
            console.log(fielders[randomNum(FLY)] + "フライ" + outCount + "アウト");              
        }
    }
};

const batting = (topBottom: boolean) => {
    battingResult = randomNum(RANDOM_NO);
    if (battingResult < 7) {
        console.log("ホームラン！");
        for (let a = 0; a < runner.length; a++) {
            if(runner[a]) {
                point(topBottom);
                runner[a] = false;
            }
        }
        point(topBottom);
    } else if (battingResult < 9) {
        console.log("三塁打！");
        for (let a = 0; a < runner.length; a++) {
            if(runner[a]) {
                point(topBottom);
                runner[a] = false;
            }
        }
        runner[3-1] = true;
    } else if (battingResult < 26) {
        console.log("二塁打！");
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
        console.log("ヒット！");
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

const fourBall = (topBottom: boolean) => {
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

const point = (topBottom: boolean) => {
    topBottom ? topPoint++ : bottomPoint++;
};

const change = () => {
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

const baseCall = (base: boolean[]) => {
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
        call.push("なし");
    } else {
        call.push("塁");
    }
    for (let b = 0;b < call.length; b++) {
        speak += call[b];
    }
    console.log(speak);
}

const randomNum = (num: number) => {
    return Math.floor(Math.random() * num);
}