import { useState } from "react";
import "./ClickAnimations.css";

// Factory for hold-to-activate animations (active while pressed)
const makeHoldAnimation = (className) => {
    const Component = ({ children }) => {
        const [isPressed, setIsPressed] = useState(false);
        return (
            <div
                className={`${className} ${isPressed ? "active" : ""}`}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
            >
                {children}
            </div>
        );
    };
    Component.displayName = className;
    return Component;
};

// Factory for one-shot click animations (play through once then reset)
const makeClickAnimation = (className, duration) => {
    const Component = ({ children }) => {
        const [animating, setAnimating] = useState(false);
        const handleClick = () => {
            if (animating) return;
            setAnimating(true);
            setTimeout(() => setAnimating(false), duration);
        };
        return (
            <div
                className={`${className} ${animating ? "active" : ""}`}
                onClick={handleClick}
            >
                {children}
            </div>
        );
    };
    Component.displayName = className;
    return Component;
};

export const PushBack = makeHoldAnimation("click-anim-pushback");
export const RubberBand = makeHoldAnimation("click-anim-rubberband");
export const FloatUp = makeHoldAnimation("click-anim-floatup");

export const Shake = makeClickAnimation("click-anim-shake", 400);
export const ColourFlash = makeClickAnimation("click-anim-colourflash", 400);
export const ImplodeSpring = makeClickAnimation("click-anim-implode", 500);
export const SkewSnap = makeClickAnimation("click-anim-skewsnap", 400);
