import IGenericProp from './IGenericProp';

/* eslint-disable semi */
export default interface IProfileImage extends IGenericProp {
    imageUrl: string | undefined,
    isMentor?: boolean | undefined
    size: number | undefined
}