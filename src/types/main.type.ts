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
    category: string;
    src: string[];
    alt: string;
    description: string;
    links?: Link[];
}
