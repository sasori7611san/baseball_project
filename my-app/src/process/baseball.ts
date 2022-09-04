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
        document.write(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "<br />");
        topBottom ? document.write(inning + "回の表" + topTeam + "の攻撃<br />") : document.write(inning + "回の裏" + bottomTeam + "の攻撃<br />");
        normalAttack();
        change();
    }
    document.write(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "<br />"); 
    document.write(inning + "回の表" + topTeam + "の攻撃<br />");
    normalAttack();
    change();
    if (topPoint < bottomPoint) {
        document.write(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "で、" + bottomTeam + "の勝ち<br />");
    } else {
        document.write(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "<br />"); 
        document.write(inning + "回の裏" + bottomTeam + "の攻撃<br />");
        while (outCount < 3) {
            versus();
            if (topPoint < bottomPoint) {
                document.write(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "で、" + bottomTeam + "の勝ち<br />");
                break;
            }
        }
        if (topPoint == bottomPoint) {
            document.write(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "で、引き分け<br />");            
        } else if (topPoint > bottomPoint) {
            document.write(topTeam + ":" + topPoint + "対" + bottomTeam + ":" +bottomPoint + "で、" + topTeam + "の勝ち<br />");
        }
    }
};

const  versus = () => {
    baseCall(runner);
    versusResult =  randomNum(RANDOM_NO);
    if (versusResult < 18) {
        outCount++;
        document.write("三振！" + outCount + "アウト<br />" );
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
            document.write(fielders[randomNum(GORO)] + "ゴロ" + outCount + "アウト<br />");
        } else if (mediocre < 55) {
            document.write(fielders[randomNum(LINER)] + "ライナー" + outCount + "アウト<br />");            
        } else {
            document.write(fielders[randomNum(FLY)] + "フライ" + outCount + "アウト<br />");              
        }
    }
};

const batting = (topBottom: boolean) => {
    battingResult = randomNum(RANDOM_NO);
    if (battingResult < 7) {
        document.write("ホームラン！<br />");
        for (let a = 0; a < runner.length; a++) {
            if(runner[a]) {
                point(topBottom);
                runner[a] = false;
            }
        }
        point(topBottom);
    } else if (battingResult < 9) {
        document.write("三塁打！<br />");
        for (let a = 0; a < runner.length; a++) {
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
        call.push("なし<br />");
    } else {
        call.push("塁<br />");
    }
    for (let b = 0;b < call.length; b++) {
        speak += call[b];
    }
    document.write(speak);
}

const randomNum = (num: number) => {
    return Math.floor(Math.random() * num);
}