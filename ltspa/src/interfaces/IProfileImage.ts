import IGenericProp from './IGenericProp';

/* eslint-disable semi */
export default interface IProfileImage extends IGenericProp {
    name?: string | undefined,
    imageUrl: string | undefined,
    isMentor?: boolean | undefined
    size?: 'smaller' | 'small' | 'normal' | 'large' | 'larger' | 'large-1xl' | 'large-2xl' | 'large-3xl'
}