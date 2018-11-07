import React from 'react';
import styled from 'styled-components';
import theme from '../theme/default';
import _ from 'lodash' ;

type Props = {
    flex?: number,
    contentsOverlaps?: boolean,
    horizontal?: boolean,
    vertical?: boolean,
    spaceBetween?: boolean,
    spaceAround?: boolean,
    start?: boolean,
    end?: boolean,
    center?: boolean,
    stretch?: boolean,
    scroll?: boolean,
    withHorizontalMargin?: boolean,

    alignStart?: boolean,
    alignEnd?: boolean,
    alignCenter?: boolean,
    alignStretch?: boolean,
    alignBaseline?: boolean,

    selfStart?: boolean,
    selfEnd?: boolean,
    selfCenter?: boolean,
    selfStretch?: boolean,
    selfBaseline?: boolean,

    wrap?: boolean,
    noWrap?: boolean,

    minWidth?: string,
    minHeight?: string,
    width?: string,
    height?: string,

    mtXs?: boolean,
    mtSm?: boolean,
    mtMd?: boolean,
    mtLg?: boolean,
    mtXl?: boolean,
    mtXXl?: boolean,
    mtXXXl?: boolean,

    mrXs?: boolean,
    mrSm?: boolean,
    mrMd?: boolean,
    mrLg?: boolean,
    mrXl?: boolean,
    mrXXl?: boolean,
    mrXXXl?: boolean,

    mbXs?: boolean,
    mbSm?: boolean,
    mbMd?: boolean,
    mbLg?: boolean,
    mbXl?: boolean,
    mbXXl?: boolean,
    mbXXXl?: boolean,

    mlXs?: boolean,
    mlSm?: boolean,
    mlMd?: boolean,
    mlLg?: boolean,
    mlXl?: boolean,
    mlXXl?: boolean,
    mlXXXl?: boolean,

    ptXs?: boolean,
    ptSm?: boolean,
    ptMd?: boolean,
    ptLg?: boolean,
    ptXl?: boolean,
    ptXXl?: boolean,
    ptXXXl?: boolean,

    prXs?: boolean,
    prSm?: boolean,
    prMd?: boolean,
    prLg?: boolean,
    prXl?: boolean,
    prXXl?: boolean,
    prXXXl?: boolean,

    pbXs?: boolean,
    pbSm?: boolean,
    pbMd?: boolean,
    pbLg?: boolean,
    pbXl?: boolean,
    pbXXl?: boolean,
    pbXXXl?: boolean,

    plXs?: boolean,
    plSm?: boolean,
    plMd?: boolean,
    plLg?: boolean,
    plXl?: boolean,
    plXXl?: boolean,
    plXXXl?: boolean,

    pXs?: boolean,
    pSm?: boolean,
    pMd?: boolean,
    pLg?: boolean,
    pXl?: boolean,
    pXXl?: boolean,
    pXXXl?: boolean,

    mXs?: boolean,
    mSm?: boolean,
    mMd?: boolean,
    mLg?: boolean,
    mXl?: boolean,
    mXXl?: boolean,
    mXXXl?: boolean,

    withBackground?: Boolean | string,
    bordered?: Boolean

}

const calJustifyContent = (props: Props) => {
    if (props.spaceBetween) {
        return 'space-between'
    } else if (props.spaceAround) {
        return 'space-around'
    } else if (props.end) {
        return 'flex-end'
    } else if (props.center) {
        return 'center'
    } else if (props.stretch) {
        return 'stretch'
    } else {
        return 'flex-start'
    }
}

const calAlignItems = (props: Props) => {
    if (props.alignEnd) {
        return 'flex-end'
    } else if (props.alignCenter) {
        return 'center'
    } else if (props.alignStretch) {
        return 'stretch'
    } else if (props.alignBaseline) {
        return 'baseline'
    } else if (props.selfStart) {
        return 'flex-start'
    } else {
        return 'auto'
    }
}

const calAlignSelf = (props: Props) => {
    if (props.selfEnd) {
        return 'flex-end'
    } else if (props.selfCenter) {
        return 'center'
    } else if (props.selfStretch) {
        return 'stretch'
    } else if (props.selfBaseline) {
        return 'baseline'
    } else {
        return 'auto'
    }
}

const calWrap = (props: Props) => {
    if (props.noWrap) {
        return 'nowrap'
    } else {
        return 'wrap'
    }
}

const possibleSize = ['Xs', 'Sm', 'Md', 'Lg', 'Xl', 'XXl', 'XXXl']
const calSide = (props, propsPrefix, cssAttr) => {
    return possibleSize.map(size => props[propsPrefix + size] ? `${cssAttr}: ${theme.dimens[size.toLowerCase()]};` : undefined)
        .filter(p => p)
        .join('\n')
}

const calMarginPadding = (props: Props) => {
    const mpStyle = `
        ${calSide(props, 'm', 'margin')}
        ${calSide(props, 'p', 'padding')}
        ${calSide(props, 'mt', 'margin-top')}
        ${calSide(props, 'mr', 'margin-right')}
        ${calSide(props, 'mb', 'margin-bottom')}
        ${calSide(props, 'ml', 'margin-left')}
        ${calSide(props, 'pt', 'padding-top')}
        ${calSide(props, 'pr', 'padding-right')}
        ${calSide(props, 'pb', 'padding-bottom')}
        ${calSide(props, 'pl', 'padding-left')}
    `
    return mpStyle
}

const StyledBox = styled.div`
    ${props => props.contentsOverlaps ? 'position: relative;' : ''}
    display: ${props => props.contentsOverlaps ? 'block' : 'flex'};
    flex-direction: ${(props: Props) => props.horizontal ? 'row' : 'column'};
    flex: ${(props: Props) => props.flex};
    justify-content: ${calJustifyContent};
    align-items: ${calAlignItems};
    align-self: ${calAlignSelf};
    flex-wrap: ${calWrap};
    ${(props: Props) => props.minWidth && `min-width: ${props.minWidth};`}
    ${(props: Props) => props.minHeight && `min-height: ${props.minHeight};`}
    ${(props: Props) => props.width && `width: ${props.width};`}
    ${(props: Props) => props.height && `height: ${props.height};`}
    ${(props: Props) => props.withBackground && `background-color: ${typeof props.withBackground === 'boolean' ? theme.colors.foreground : props.withBackground};`}
    ${(props: Props) => props.bordered && `border: 1px solid ${theme.colors.border};`}
    ${calMarginPadding};
`;

export default function Box(props: Props) {
    return (
        <StyledBox {...props} />
    )
}

