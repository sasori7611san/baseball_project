export class scoreBoard {
    #topTeam = "";
    #bottomTeam = "";
    #topPoint = 0;
    #bottomPoint = 0;
    #inning = 1;
    #finalInning = 9;
    #topBottom = true;
    #beforeTopPoint = 0;
    #beforeBottomPoint = 0;
    #inningBoardTop = [];
    #inningBoardBottom = [];

    constructor() {
        this.topTeam = "Ateam";
        this.bottomTeam = "Bteam";
    }

    scoreBoradTop = () => {
        for (st = 0;st < thigetInning(); st++) {
            console.log(`${thigetInningBoardTop()[st]}`);
        }
        console.log(`|${thigetTopPoint()}<br />`);
    }
    
    scoreBoradBottom = () => {
        scoreBoradTop();
        for (sb = 0;sb < thigetInning(); sb++) {
            console.log(`${thigetInningBoardBottom()[sb]}`);
        }
        console.log(`|${thigetBottomPoint()}<br />`);
    }

    scoreDisplay = (tt, ts, bt, bs) => {
        console.log(`${tt}:${ts}対${bt}:${bs}<br />`);    
    }
    
    scoreBoardView = (bol) => {
        finalInningBottom = getBottomPoint() - beforeBottomPoint;
        if (topBottom) {
            getInningBoardTop().push(getTopPoint() - beforeTopPoint);
            beforeTopPoint = getTopPoint();
        } else {
            getInningBoardBottom().push(getBottomPoint() - beforeBottomPoint);
            beforeBottomPoint = getBottomPoint();
        }
        if (topBottom) {
            scoreBoradTop();
            for (sb = 0;sb < getInning() - 1; sb++) {
                console.log(`${getInningBoardBottom()[sb]}`);
            }
            console.log(`|${getBottomPoint()}<br />`);
        } else if (!topBottom && getInning() != getfinalInning()) {
            scoreBoradBottom();
        } else {
            if (bol) {
                scoreBoradTop();
                for (sb = 0;sb < getInning() - 1; sb++) {
                    console.log(`${getInningBoardBottom()[sb]}`);
                }
                if (finalInningBottom == 0) {
                    console.log(`X|${getBottomPoint()}<br />`);
                } else {
                    console.log(`${getInningBoardBottom()[getInning() - 1]}`);
                    console.log(`x|${getBottomPoint()}<br />`);
                }
            } else {
                scoreBoradBottom();
            }
        }
    }

    getTopTeam() {
        return this.#topTeam;
    }

    getBottomTeam() {
        return this.#bottomTeam;
    }

    getTopPoint() {
        return this.#topPoint;
    }

    addTopPoint() {
        return this.#topPoint++;
    }

    getBottomPoint() {
        return this.#bottomPoint;
    }

    addBottomPoint() {
        return this.#bottomPoint++;
    }

    getInning() {
        return this.#inning;
    }

    addInning() {
        return this.#inning++;
    }

    getFinalInning() {
        return this.#finalInning;
    }
    
    getTopBottom() {
        return this.#topBottom;
    }

    changeTopBottom() {
        this.#topBottom = !this.#topBottom;
        return this.#topBottom;
    }

    getBeforeTopPoint() {
        return this.#beforeTopPoint;
    }

    setBeforeTopPoint(num) {
        this.#beforeTopPoint = num;
    }

    getBeforeBottomPoint() {
        return this.#beforeBottomPoint;
    }

    setBeforeBottomPoint(num) {
        this.#beforeBottomPoint = num;
    }
    getInningBoardTop() {
        return this.#inningBoardTop;
    }

    setInningBoardTop(num) {
        this.#inningBoardTop = num;
    }

    getInningBoardBottom() {
        return this.#inningBoardBottom;
    }

    setInningBoardBottom(num) {
        this.#inningBoardBottom = num;
    }
}
