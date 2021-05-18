import { analyzeAndValidateNgModules } from "@angular/compiler";
import { FileType } from "src/app/common/data/file-data";
import { PinType } from "src/app/common/data/pinType";
import { VoteDirection } from "src/app/common/data/vote-direction";
import { PinData } from "src/app/common/data/pin-data";
import { JAMBURA, PATATA, JANGULA } from "src/app/common/mock/mocked-short-users";

export const MOCKED_PIN_DETAILS: PinData[] = [
    {
        id: 1,
        creator: JAMBURA,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isRemoved: false,
        isRelevant: true,
        rating: {totalRating: 5},
        commentsNumber: 2,
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
        routeCode: "TB201301",
        title: "Title 1",
        text: `Adipisicing commodo deserunt adipisicing culpa esse amet proident. Eu consectetur eu Lorem aliqua reprehenderit adipisicing amet nulla cillum aute Lorem quis quis. Officia consequat voluptate consectetur qui do. Nostrud anim ut dolore ex laboris dolore aliquip nulla quis ad.

        Eiusmod mollit elit ipsum consectetur culpa aliqua ut minim nisi id. Lorem dolor voluptate occaecat nulla sunt ad. Ut laboris dolor culpa ad culpa Lorem deserunt ipsum quis consectetur. Cupidatat labore ullamco cillum incididunt aliquip.
        
        Enim amet commodo magna laborum. Eiusmod ex mollit tempor nostrud id id. Occaecat id officia ullamco enim proident non ipsum. Aliqua eiusmod fugiat magna duis ea sit veniam est et aute elit dolore ipsum. Elit minim ullamco labore culpa excepteur culpa fugiat culpa elit labore. Minim aliqua sit reprehenderit non magna proident officia.`,
        attachedFile: {externalId: "123456", fileType: FileType.IMAGE},
        type: PinType.TIP,
        location: {lat: 41.81309452631177, lng: 44.84830571006798},
        userVoteDirection: VoteDirection.UP
    },
    {
        id: 2,
        creator: PATATA,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isRemoved: false,
        isRelevant: true,
        rating: {totalRating: 1},
        commentsNumber: 0,
        commentsPreview: [],
        routeCode: "TB201301",
        title: "Title 2",
        text: "Deserunt veniam ad non exercitation nulla sint et sit proident cillum amet. Incididunt occaecat laborum quis adipisicing irure pariatur aliquip culpa excepteur laborum proident. Nisi amet consectetur in laborum ullamco anim eu reprehenderit. Excepteur dolore dolor commodo consequat id irure. Nulla et qui culpa ullamco ex laboris sunt Lorem dolor anim anim et incididunt. Fugiat aliqua voluptate do dolore dolore cillum reprehenderit mollit culpa nisi culpa do magna commodo.",
        attachedFile: undefined,
        type: PinType.DANGER,
        location: {lat: 41.80877688066833, lng: 44.858985100557675},
        userVoteDirection: VoteDirection.DOWN
    },
    {
        id: 3,
        creator: JANGULA,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isRemoved: false,
        isRelevant: true,
        rating: {totalRating: -4},
        commentsNumber: 0,
        commentsPreview: [],
        routeCode: "TB201301",
        title: "Title 3",
        text: "Proident adipisicing dolore velit non ex voluptate officia anim nulla dolor laborum magna nulla. Minim dolor culpa eu aute tempor eiusmod mollit consequat ea. Amet consequat sunt ex eiusmod aute magna officia commodo incididunt. Dolor labore minim sit dolore fugiat consequat. Irure officia reprehenderit pariatur mollit incididunt dolor nisi ut exercitation. Aliqua dolore excepteur qui esse anim.",
        attachedFile: {externalId: "1234567", fileType: FileType.IMAGE},
        type: PinType.WARNING,
        location: {lat: 41.801802130108065, lng: 44.87436234552735},
    },
]
