export interface IAppState {
    maxY: number;
    ay: number;
    vy: number;
    y: number;
    birdPosition: {};
    isEnd: boolean;
}

export const INITIAL_STATE: IAppState = {
    maxY: 0,
    ay: 0,
    vy: 0,
    y: 0,
    birdPosition: {},
    isEnd: false,
};
