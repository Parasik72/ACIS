export interface IPositionAttribute {
    PositionId: number;
    AttributeId: number;
}

export interface IUpdatePositionAttribute {
    PositionId: number;
    AttributeId: number;
    BeforePositionId: number;
    BeforeAttributeId: number;
}

export const PositionAttributeObj: IPositionAttribute = {
    AttributeId: 0,
    PositionId: 0
}