import { PinType } from "src/app/common/data/pinType";
import { PinData } from "./pin-data";

export const MOCKED_PIN_DETAILS: PinData[] = [
    {
        id: 1,
        creator: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isRemoved: false,
        isRelevant: true,
        rating: {totalRating: 5},
        commentsNumber: 0,
        commentsPreview: [],
        routeCode: "123",
        title: "Title 1",
        text: "Adipisicing fugiat ut tempor mollit exercitation. Irure ipsum minim enim quis cupidatat. Sunt est pariatur adipisicing nulla dolore deserunt magna. Ipsum fugiat occaecat velit aliquip nisi in ea et in ex anim enim. Do adipisicing ipsum nostrud anim id excepteur occaecat est. Voluptate culpa voluptate adipisicing ut Lorem reprehenderit veniam incididunt.",
        attachedFile: undefined,
        type: PinType.TIP,
        location: {lat: 1, lng: 2}
    },
    {
        id: 2,
        creator: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isRemoved: false,
        isRelevant: true,
        rating: {totalRating: 1},
        commentsNumber: 0,
        commentsPreview: [],
        routeCode: "123",
        title: "Title 2",
        text: "Deserunt veniam ad non exercitation nulla sint et sit proident cillum amet. Incididunt occaecat laborum quis adipisicing irure pariatur aliquip culpa excepteur laborum proident. Nisi amet consectetur in laborum ullamco anim eu reprehenderit. Excepteur dolore dolor commodo consequat id irure. Nulla et qui culpa ullamco ex laboris sunt Lorem dolor anim anim et incididunt. Fugiat aliqua voluptate do dolore dolore cillum reprehenderit mollit culpa nisi culpa do magna commodo.",
        attachedFile: undefined,
        type: PinType.DANGER,
        location: {lat: 1, lng: 3}
    },
    {
        id: 3,
        creator: {},
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
        isRemoved: false,
        isRelevant: true,
        rating: {totalRating: -4},
        commentsNumber: 0,
        commentsPreview: [],
        routeCode: "123",
        title: "Title 3",
        text: "Proident adipisicing dolore velit non ex voluptate officia anim nulla dolor laborum magna nulla. Minim dolor culpa eu aute tempor eiusmod mollit consequat ea. Amet consequat sunt ex eiusmod aute magna officia commodo incididunt. Dolor labore minim sit dolore fugiat consequat. Irure officia reprehenderit pariatur mollit incididunt dolor nisi ut exercitation. Aliqua dolore excepteur qui esse anim.",
        attachedFile: undefined,
        type: PinType.WARNING,
        location: {lat: 2, lng: 2}
    },
]