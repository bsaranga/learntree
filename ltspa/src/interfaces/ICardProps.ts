/* eslint-disable semi */

export default interface ICardProps {
    id: number,
    author: {
        name?: string,
        title?: string,
        imageUrl?: string
    },
    lPath: {
        title?: string,
        subtitle?: string,
        description?: string,
    },
    votes: {
        upvotes: number,
        downvotes: number
    }
}