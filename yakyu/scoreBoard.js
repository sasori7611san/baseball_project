export default class Score {
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
        thithis.#topTeam = "Ateam";
        thithis.#bottomTeam = "Bteam";
    }

    scoreBoradTop = () => {
        for (st = 0;st < this.getInning(); st++) {
            document.write(`${this.getInningBoardTop()[st]}`);
        }
        document.write(`|${this.getTopPoint()}<br />`);
    }
    
    scoreBoradBottom = () => {
        scoreBoradTop();
        for (sb = 0;sb < this.getInning(); sb++) {
            document.write(`${this.getInningBoardBottom()[sb]}`);
        }
        document.write(`|${this.getBottomPoint()}<br />`);
    }

    getTopTeam() {
        return thithis.#topTeam;
    }

    getBottomTeam() {
        return thithis.#bottomTeam;
    }

    getTopPoint() {
        return thithis.#topPoint;
    }

    addTopPoint() {
        return thithis.#topPoint++;
    }

    getBottomPoint() {
        return thithis.#bottomPoint;
    }

    addBottomPoint() {
        return thithis.#bottomPoint++;
    }

    getInning() {
        return thithis.#inning;
    }

    addInning() {
        return thithis.#inning++;
    }

    getFinalInning() {
        return thithis.#finalInning;
    }
    
    getTopBottom() {
        return thithis.#topBottom;
    }

    changeTopBottom() {
        thithis.#topBottom = !thithis.#topBottom;
        return thithis.#topBottom;
    }

    getBeforeTopPoint() {
        return thithis.#beforeTopPoint;
    }

    setBeforeTopPoint(num) {
        thithis.#beforeTopPoint = num;
    }

    getBeforeBottomPoint() {
        return thithis.#beforeBottomPoint;
    }

    setBeforeBottomPoint(num) {
        thithis.#beforeBottomPoint = num;
    }
    getInningBoardTop() {
        return thithis.#inningBoardTop;
    }

    setInningBoardTop(num) {
        thithis.#inningBoardTop = num;
    }

    getInningBoardBottom() {
        return thithis.#inningBoardBottom;
    }

    setInningBoardBottom(num) {
        thithis.#inningBoardBottom = num;
    }
}
