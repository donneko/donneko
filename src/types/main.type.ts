export interface Link {
    href: string;
    label: string;
    external: boolean;
}

export interface LinkTable extends Link {
    description: string;
}

export interface Project {
    title: string;
    hasScreenshot: boolean;
    src: string;
    alt: string;
    description: string;
    links?: Link[];
}
