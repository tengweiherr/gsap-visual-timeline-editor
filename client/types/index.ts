export type Object = {
    objectId: string;
    classname: string;
    createdAt: Date;
    url: string;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    defaultDuration: number;
}

export type Tween = {
    type: string;
    duration: number;
    translateX: number;
    translateY: number;
    translateWidth: number;
    translateHeight: number;
    ease: string;
    timeAdjust: number;
    reversed: boolean;
    stagger: number;
}

export type Inherit = {
    inherit: boolean;
    inheritDuration: number;
    inheritEase: string;
}

export type Repeat = {
    repeat: boolean;
    repeatTimes: number;
    repeatDelay: number;
}

export type Yoyo = {
    yoyo: boolean;
    yoyoEase: string;
}
