import { baseball } from './process/baseball'

export const PlayGamen = () => {
    const playBallClick = () => baseball();
    return (
        <div>
            <input type="button" value="開始"  onClick={() => playBallClick()} />
        </div>
    );
}