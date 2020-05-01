export const objToArray = (obj) => Object.keys(obj).map(key => obj[key]);

export const uniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

const mapPost = ({ id, author, download_url: imgSrc, likesCount = 0, description = 'Some description', liked = false }) => {
    return { id, author, imgSrc, likesCount, description, liked };
};

export const generateComments = () => {
    const commentsLength = parseInt(Math.random() * 1000);
    return Array(commentsLength)
        .fill(undefined)
        .map((_, key) => ({
            id: uniqueId(),
            profileId: 0,
            profileName: `test_user#${key}`,
            text: `some text test_user #${key}`,
            liked: false,
            disabledSendingForm: false,
        }));
};

const normalizeComments = (post) => {
    const comments = post.comments.reduce((result, comment) => {
        return {
            list: {
                ...result.list,
                [comment.id]: {
                    ...comment,
                    postId: post.id,
                },
            },
            allIds: [...result.allIds, comment.id],
        };
    }, {
        list: {},
        allIds: [],
    });

    return { comments, commentsIds: [...comments.allIds] };
};

export const normalizePosts = (posts) => {
    let normalizedComments = { list: {}, allIds: [] };
    const normalizedPosts = posts.reduce((result, post) => {
        const { comments, commentsIds } = normalizeComments(post);
        normalizedComments = {
            ...normalizedComments,
            list: {
                ...normalizedComments.list,
                ...comments.list,
            },
            allIds: [
                ...normalizedComments.allIds,
                ...comments.allIds,
            ],
        };

        return {
            list: {
                ...result.list,
                [post.id]: {
                    ...mapPost(post),
                    commentsIds,
                },
            },
            allIds: [...result.allIds, post.id],
        };
    }, {
        list: {},
        allIds: [],
    });

    return { posts: normalizedPosts, comments: normalizedComments };
};
