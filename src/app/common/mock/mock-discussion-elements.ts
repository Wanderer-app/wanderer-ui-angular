import { DiscussionElement } from "src/app/common/data/duscussion-element";
import { JAMBURA, JANGULA, PATATA } from "src/app/common/mock/mocked-short-users";
import { FileType } from "../data/file-data";
import { UserContentType } from "../data/user-content-type";
import { VoteDirection } from "../data/vote-direction";

export const MOCK_DISCUSSION_ELEMENTS: DiscussionElement[] = [
    {
        id: 1,
        creator: JANGULA,
        createdAt: "2021-05-25T12:12:12",
        updatedAt: "2021-05-25T12:12:12",
        isActive: true,
        isRemoved: false,
        ratingData: {totalRating: 10},
        commentsPreview: [],
        commentsAmount: 0,
        routeCode: "TB201301",
        content: "Amet incididunt laboris adipisicing aliqua eiusmod deserunt aliquip esse culpa exercitation velit. Aute mollit mollit voluptate deserunt aliqua. Ullamco dolore culpa nulla commodo veniam anim amet. Ea ex in sunt do laboris nisi sunt. Lorem aliqua tempor aute voluptate in. Sit sint ut voluptate laborum et est ex ad magna dolore consectetur.",
        attachedFiles: [{externalId: "1234568", fileType: FileType.IMAGE}, {externalId: "123456", fileType: FileType.IMAGE}, {externalId: "1234567", fileType: FileType.IMAGE}, {externalId: "1234567", fileType: FileType.IMAGE}, {externalId: "1234567", fileType: FileType.IMAGE}],
        type: UserContentType.POST,
        userVoteDirection: VoteDirection.UP
    },
    {
        id: 2,
        creator: JAMBURA,
        createdAt: "2021-05-25T12:12:12",
        updatedAt: "2021-05-25T12:12:12",
        isActive: true,
        isRemoved: false,
        commentsPreview: [],
        commentsAmount: 0,
        routeCode: "TB201301",
        content: "{\"question\":\"What is the best video game?\",\"answers\":[{\"answerId\":1,\"title\":\"Gta\",\"answererIds\":[1,2],\"percentage\":66.67},{\"answerId\":2,\"title\":\"Rdr\",\"answererIds\":[3],\"percentage\":33.33},{\"answerId\":3,\"title\":\"Fifa\",\"answererIds\":[],\"percentage\":0.00}]}",
        attachedFiles: [],
        type: UserContentType.POLL
    },
    {
        id: 3,
        creator: JAMBURA,
        createdAt: "2021-05-25T12:12:12",
        updatedAt: "2021-05-25T12:12:12",
        isActive: true,
        isRemoved: false,
        ratingData: {totalRating: 0},
        commentsPreview: [
            {
                id: 1,
                author: PATATA,
                createdAt: new Date(),
                updatedAt: new Date(),
                text: "atrakeb",
                rating: {totalRating: -1},
                isActive: true,
                isRemoved: false,
                responseNumber: 4,
                userVoteDirection: VoteDirection.DOWN,
                responsesPreview: [
                    {
                        id: 2,
                        author: JAMBURA,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        text: "ara shen atrakeb",
                        rating: {totalRating: 1},
                        isActive: true,
                        isRemoved: false,
                        responseNumber: 0,
                        responsesPreview: [],
                    },
                    {
                        id: 3,
                        author: JANGULA,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        text: "bbbbbbbbb",
                        rating: {totalRating: 3},
                        isActive: true,
                        isRemoved: false,
                        responseNumber: 0,
                        responsesPreview: [],
                    }
                ]
            },
            {
                id: 4,
                author: JANGULA,
                createdAt: new Date(),
                updatedAt: new Date(),
                text: "aaaaaaaaaaaa",
                rating: {totalRating: 5},
                isActive: true,
                isRemoved: false,
                responseNumber: 0,
                responsesPreview: [],
                userVoteDirection: VoteDirection.UP
            }
        ],
        commentsAmount: 2,
        routeCode: "TB201301",
        content: "Amet incididunt laboris adipisicing aliqua eiusmod deserunt aliquip esse culpa exercitation velit. Aute mollit mollit voluptate deserunt aliqua. Ullamco dolore culpa nulla commodo veniam anim amet. Ea ex in sunt do laboris nisi sunt. Lorem aliqua tempor aute voluptate in. Sit sint ut voluptate laborum et est ex ad magna dolore consectetur.",
        attachedFiles: [{externalId: "1234568", fileType: FileType.IMAGE}],
        type: UserContentType.POST,
        userVoteDirection: VoteDirection.DOWN
    },
]