// import { getInning, getfinalInning, s.scoreDisplay, getTopTeam, getTopPoint, getBottomTeam, getBottomPoint, s.socoreBard } from './scoreBoard.js';
import * as s from "./scoreBoard.js";

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

export let game = () => {
    while (s.getInning() <= s.getfinalInning() - 1) {
        s.scoreDisplay(s.getTopTeam(), s.getTopPoint(), s.getBottomTeam(), s.getBottomPoint());
        topBottom ? console.log(`${s.getInning()}回の表${s.getTopTeam()}の攻撃<br />`) : console.log(`${s.getInning()}回の裏${s.getBottomTeam()}の攻撃<br />`);
        normalAttack();
        change();
    }
    s.scoreDisplay(s.getTopTeam(), s.getTopPoint(), s.getBottomTeam(), s.getBottomPoint()); 
    console.log(`${s.getInning()}回の表${s.getTopTeam()}の攻撃<br />`);
    normalAttack();
    change();
    if (s.getTopPoint() < s.getBottomPoint()) {
        console.log(`${s.getTopTeam()}:${s.getTopPoint()}対${s.getBottomTeam()}:${s.getBottomPoint()}で、${s.getBottomTeam()}の勝ち<br />`);
        bottomWon = true;
        s.scoreBoardView(bottomWon);
    } else {
        s.scoreDisplay(s.getTopTeam(), s.getTopPoint(), s.getBottomTeam(), s.getBottomPoint()); 
        console.log(`${s.getInning()}回の裏${s.getBottomTeam()}の攻撃<br />`);
        while (outCount < 3) {
            versus();
            if (s.getTopPoint() < s.getBottomPoint()) {
                console.log(`${s.getTopTeam()}:${s.getTopPoint()}対${s.getBottomTeam()}:${s.getBottomPoint()}で、${s.getBottomTeam()}の勝ち<br />`);
                bottomWon = true;
                s.scoreBoardView(bottomWon);
                break;
            }
        }
        if (s.getTopPoint() == s.getBottomPoint()) {
            console.log(`${s.getTopTeam()}:${s.getTopPoint()}対${s.getBottomTeam()}:${s.getBottomPoint()}で、引き分け<br />`);
            bottomWon = false;
            s.scoreBoardView(bottomWon);            
        } else if (s.getTopPoint() > s.getBottomPoint()) {
            console.log(`${s.getTopTeam()}:${s.getTopPoint()}対${s.getBottomTeam()}:${s.getBottomPoint()}で、${s.getTopTeam()}の勝ち<br />`);
            bottomWon = false;
            s.scoreBoardView(bottomWon);
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
    topBottom ? s.getTopPoint()++ : s.getBottomPoint()++;
};

const change = () => {
    s.scoreBoardView(bottomWon);
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
    console.log(speak);
};

const randomNum = (num) => {
    return Math.floor(Math.random() * num);
};