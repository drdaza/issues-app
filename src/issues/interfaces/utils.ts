export interface Button {
    icon: string,
    color?: string,
    size?: 'xs'|'sm'|'md'|'lg'|'xl',
    action: () => void
}

// export enum Colors {
//     xs = 'xs', 
//     sm = 'sm',
//     md = 'md'
// } 