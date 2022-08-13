export type Timeline = {
    name: string;
    duration: number;
    delay: number;
    repeat: boolean;
    repeatTimes: number|undefined;
    repeatDelay: number|undefined;
    reversed: boolean;
    yoyo: boolean;
    yoyoEase: string|undefined;
    timeScale: number;
    defaults: boolean;
    defaultsDuration: number|undefined;
    defaultsEase: string|undefined;
    parentId: string|undefined;
}

type Text = {
  style: string;
  content: string|undefined;
}

export type Object = {
    objectId: string;
    classname: string;
    text: Text|undefined;
    shape: string|undefined;
    url: string|undefined;
    positionX: number;
    positionY: number;
    width: number;
    height: number;
    fill: string;
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
