/**
 * GSAP (GreenSock Animation Platform) 类型声明
 * 解决IDE中"未解析的变量或类型 gsap"错误
 */

declare namespace gsap {
    interface TweenVars {
        duration?: number;
        delay?: number;
        ease?: string;
        repeat?: number;
        yoyo?: boolean;
        stagger?: number | object;
        onComplete?: Function;
        onUpdate?: Function;
        onStart?: Function;
        x?: number | string;
        y?: number | string;
        z?: number;
        scale?: number;
        scaleX?: number;
        scaleY?: number;
        rotation?: number;
        rotationX?: number;
        rotationY?: number;
        rotationZ?: number;
        opacity?: number;
        width?: number | string;
        height?: number | string;
        left?: number | string;
        top?: number | string;
        backgroundColor?: string;
        color?: string;
        borderRadius?: string;
        transformOrigin?: string;
        filter?: string;
        backdropFilter?: string;
        boxShadow?: string;
        text?: string;
        textContent?: string;
        innerHTML?: string;
        scrollTo?: object;
        motionPath?: object;
        morphSVG?: string;
        [key: string]: any;
    }

    interface Timeline {
        to(targets: any, vars: TweenVars): Timeline;
        from(targets: any, vars: TweenVars): Timeline;
        fromTo(targets: any, fromVars: TweenVars, toVars: TweenVars): Timeline;
        set(targets: any, vars: TweenVars): Timeline;
        call(callback: Function, params?: any[], scope?: any, position?: any): Timeline;
        pause(): Timeline;
        resume(): Timeline;
        play(): Timeline;
        reverse(): Timeline;
        restart(): Timeline;
        kill(): Timeline;
        timeScale(value?: number): Timeline | number;
        duration(value?: number): Timeline | number;
        progress(value?: number): Timeline | number;
        seek(time: number): Timeline;
        add(child: any, position?: any): Timeline;
    }

    interface GSAPStatic {
        to(targets: any, vars: TweenVars): any;
        from(targets: any, vars: TweenVars): any;
        fromTo(targets: any, fromVars: TweenVars, toVars: TweenVars): any;
        set(targets: any, vars: TweenVars): any;
        timeline(vars?: any): Timeline;
        registerPlugin(...plugins: any[]): void;
        killTweensOf(targets: any): void;
        globalTimeline: Timeline;
        utils: {
            toArray(targets: any): any[];
            selector(selector: string): any[];
            random(min: number, max: number, snapTo?: number): number;
            interpolate(start: any, end: any, progress: number): any;
            mapRange(inMin: number, inMax: number, outMin: number, outMax: number, value: number): number;
            clamp(min: number, max: number, value: number): number;
            wrap(min: number, max: number, value: number): number;
            normalize(min: number, max: number, value: number): number;
            pipe(...functions: Function[]): Function;
            unitize(func: Function, unit?: string): Function;
        };
        config(config: object): void;
        ticker: {
            add(callback: Function): void;
            remove(callback: Function): void;
            fps(fps: number): void;
        };
    }

    interface ScrollTriggerStatic {
        create(vars: any): any;
        refresh(): void;
        update(): void;
    }

    interface TextPluginStatic {
        // TextPlugin 相关方法
    }

    interface MotionPathPluginStatic {
        // MotionPathPlugin 相关方法
    }

    interface ScrollToPluginStatic {
        // ScrollToPlugin 相关方法
    }
}

declare const gsap: gsap.GSAPStatic;
declare const ScrollTrigger: gsap.ScrollTriggerStatic;
declare const TextPlugin: gsap.TextPluginStatic;
declare const MotionPathPlugin: gsap.MotionPathPluginStatic;
declare const ScrollToPlugin: gsap.ScrollToPluginStatic;

/**
 * Anime.js 类型声明
 */
declare namespace anime {
    interface AnimeInstance {
        play(): void;
        pause(): void;
        restart(): void;
        reverse(): void;
        seek(time: number): void;
        remove(targets: any): void;
    }

    interface AnimeParams {
        targets?: any;
        duration?: number;
        delay?: number;
        endDelay?: number;
        easing?: string;
        round?: number;
        loop?: boolean | number;
        direction?: string;
        autoplay?: boolean;
        translateX?: any;
        translateY?: any;
        scale?: any;
        opacity?: any;
        rotate?: any;
        [key: string]: any;
    }

    interface AnimeStatic {
        (params: AnimeParams): AnimeInstance;
        random(min: number, max: number): number;
        running: AnimeInstance[];
    }
}

declare const anime: anime.AnimeStatic;

/**
 * AOS (Animate On Scroll) 类型声明
 */
declare namespace AOS {
    interface AOSOptions {
        duration?: number;
        easing?: string;
        once?: boolean;
        offset?: number;
        delay?: number;
        anchor?: string;
        anchorPlacement?: string;
        disable?: boolean | string | (() => boolean);
        startEvent?: string;
        animatedClassName?: string;
        initClassName?: string;
        useClassNames?: boolean;
        disableMutationObserver?: boolean;
        throttleDelay?: number;
        debounceDelay?: number;
    }

    interface AOSStatic {
        init(options?: AOSOptions): void;
        refresh(): void;
        refreshHard(): void;
    }
}

declare const AOS: AOS.AOSStatic;

/**
 * Particles.js 类型声明
 */
declare namespace particlesJS {
    interface ParticlesStatic {
        (tagId: string, params: any): void;
        load(tagId: string, pathConfigJson: string, callback?: () => void): void;
    }
}

declare const particlesJS: particlesJS.ParticlesStatic;

/**
 * Lottie 类型声明
 */
declare namespace lottie {
    interface LottieStatic {
        loadAnimation(params: any): any;
        play(): void;
        pause(): void;
        stop(): void;
        destroy(): void;
    }
}

declare const lottie: lottie.LottieStatic;

/**
 * Three.js 基础类型声明
 */
declare namespace THREE {
    class Scene {}
    class Camera {}
    class WebGLRenderer {}
    class Mesh {}
    class Geometry {}
    class Material {}
}

declare const THREE: typeof THREE;

/**
 * 全局变量声明
 */
declare const window: Window & typeof globalThis;
declare const document: Document;
declare const console: Console;
declare const setTimeout: (callback: Function, delay: number) => number;
declare const setInterval: (callback: Function, delay: number) => number;
declare const clearTimeout: (id: number) => void;
declare const clearInterval: (id: number) => void;
declare const requestAnimationFrame: (callback: FrameRequestCallback) => number;
declare const fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
