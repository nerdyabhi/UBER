import {atom} from "recoil";

export const pickupAtom = atom({
    default:null,
    key:"pickupContext"
})

export const destinationAtom = atom({
    default:null,
    key:"destinationContext"
})

export const pickupCoordinatesAtom = atom({
    default:null,
    key:"pickupCoordinatesContext"
})
export const destinationCoordinatesAtom = atom({
    default:null,
    key:"destinationCoordinatesContext"
})
export const userCoordinatesAtom = atom({
    default:null,
    key:"userCoordinatesContext"
})

export const captainCoordinatesAtom = atom({
    default:null,
    key:"CaptianCoordinatesContext",
})