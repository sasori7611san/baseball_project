export default class Score {
    #topTeam = "";
    #bottomTeam = "";
    #topPoint = 0;
    #bottomPoint = 0;
    #inning = 1;
    #finalInning = 9;
    #topBottom = true;

    constructor() {
        this.#topTeam = "Ateam";
        this.#bottomTeam = "Bteam";
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
}
